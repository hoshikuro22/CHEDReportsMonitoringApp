import express from "express";
import mysql from "mysql";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// diri masulod na folder ang file
const uploadsPath = join(__dirname, "..", "coaauditreports-uploads");
const uploadsHistoryPath = path.join(
  __dirname,
  "..",
  "coaauditreports-uploads-history"
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath);
  },
  // for the file name

  filename: (req, file, cb) => {
    const now = new Date();
    const dateString = now.toISOString().split("T")[0]; // This will format the date as 'YYYY-MM-DD'
    const newFilename = dateString + "-" + file.originalname;
    cb(null, newFilename);
    console.log(newFilename); // Logging the new filename
  },
});

const upload = multer({ storage });

const router = express.Router();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chedreportssystem",
});

//  sa COA Audit Report Files table to see the file
router.use(
  "/coaauditreportfiles",
  express.static(join(__dirname, "coaauditreports-uploads"))
);

router.get("/coaauditreportfiles/:filename", (req, res) => {
  const { filename } = req.params;
  res.sendFile(join(uploadsPath, filename));
});

//  sa COA Audit Report Files (HISTORY) table to see the file
router.use(
  "/coaauditreporthistoryfiles",
  express.static(join(__dirname, "coaauditreports-uploads-history"))
);

router.get("/coaauditreporthistoryfiles/:filename", (req, res) => {
  const { filename } = req.params;
  res.sendFile(join(uploadsHistoryPath, filename));
});

// READ
router.get("/getCOAAuditReports", (req, res) => {
  const sql = `
      SELECT
        c.coa_report_id,
        c.reference,
        c.date_created,
        c.details,
        c.date_received,
        c.compliance_status,
        c.file,
        c.remarks,
        c.personnel_ID,
        c.date_actioned,
        p.Full_Name AS personnel_name
      FROM coa_audit_reports c
      JOIN personnel p ON c.personnel_ID = p.personnel_ID
      ORDER BY c.coa_report_id DESC;
    `;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching COA audit reports:", err);
      return res.status(500).json({
        Status: "Error",
        Message: "Failed to fetch COA audit reports",
      });
    }

    return res.status(200).json(data);
  });
});

router.get("/getCOAAuditReportHistory/:coa_report_id", (req, res) => {
  const coa_report_id = req.params.coa_report_id;
  const sql = `
    SELECT
      h.coa_report_history_id,
      h.coa_report_id,
      h.reference,
      h.date_created,
      h.details,
      h.date_received,
      h.compliance_status,
      h.file,
      h.remarks,
      h.personnel_ID,
      h.date_actioned,
      p.Full_Name AS personnel_name
    FROM coa_audit_reports_history h
    JOIN personnel p ON h.personnel_ID = p.personnel_ID
    WHERE h.coa_report_id = ?
    ORDER BY h.coa_report_history_id DESC;
  `;

  db.query(sql, [coa_report_id], (err, data) => {
    if (err) {
      console.error("Error fetching COA audit report history:", err);
      return res.status(500).json({
        status: "Error",
        message: "Failed to fetch COA audit report history",
      });
    }
    return res.status(200).json(data);
  });
});

//CREATE
// Function to get the user account from the user table based on User_ID
const getUserAccount = async (userID) => {
  return new Promise((resolve, reject) => {
    const getUserAccountQuery =
      "SELECT Full_Name FROM personnel WHERE personnel_ID = ?";
    db.query(getUserAccountQuery, [userID], (err, userResult) => {
      if (err) {
        console.error("Error in getUserAccountQuery:", err);
        reject(err);
      } else {
        const { Full_Name } = userResult[0];
        const userAccount = `${Full_Name} `;
        resolve(userAccount);
      }
    });
  });
};

const getNextCOAReportID = async () => {
  return new Promise((resolve, reject) => {
    const getMaxCOAReportIDQuery =
      "SELECT MAX(coa_report_id) AS maxCOAReportID FROM coa_audit_reports";
    db.query(getMaxCOAReportIDQuery, (err, result) => {
      if (err) {
        console.error("Error in getMaxCOAReportIDQuery:", err);
        reject(err);
      } else {
        const maxCOAReportID = result[0].maxCOAReportID || 0;
        const nextCOAReportID = maxCOAReportID + 1;
        console.log("nextCOAReportID:", nextCOAReportID);
        resolve(nextCOAReportID);
      }
    });
  });
};

const getNextCOAHistoryId = async () => {
  return new Promise((resolve, reject) => {
    const getMaxCOAHistoryIdQuery =
      "SELECT MAX(coa_report_history_ID) AS maxCOAHistoryId FROM coa_audit_reports_history";
    db.query(getMaxCOAHistoryIdQuery, (err, result) => {
      if (err) {
        console.error("Error in getMaxCOAHistoryIdQuery:", err);
        reject(err);
      } else {
        const maxCOAHistoryId = result[0].maxCOAHistoryId || 0;
        const nextCOAHistoryId = maxCOAHistoryId + 1;
        console.log("nextCOAHistoryId:", nextCOAHistoryId);
        resolve(nextCOAHistoryId);
      }
    });
  });
};

const getNextActivityLogId = async () => {
  return new Promise((resolve, reject) => {
    const getMaxActivityLogIdQuery =
      "SELECT MAX(activity_ID) AS maxActivityLogId FROM Activity_Log";
    db.query(getMaxActivityLogIdQuery, (err, result) => {
      if (err) {
        console.error("Error in getMaxActivityLogIdQuery:", err);
        reject(err);
      } else {
        const maxActivityLogId = result[0].maxActivityLogId || 0;
        const nextActivityLogId = maxActivityLogId + 1;
        console.log("nextActivityLogId:", nextActivityLogId);
        resolve(nextActivityLogId);
      }
    });
  });
};

router.post("/addCOAAuditReport", upload.single("file"), async (req, res) => {
  const {
    reference,
    dateCreated,
    details,
    dateReceived,
    complianceStatus,
    remarks,
    personnelID,
  } = req.body;
  const file = req.file;

  if (!file) {
    return res.json({
      Status: "Error",
      Message: "File not provided or invalid",
    });
  }
  try {
    const nextCOAReportID = await getNextCOAReportID();
    const nextCOAHistoryId = await getNextCOAHistoryId();
    const userAccount = await getUserAccount(personnelID);

    const COAAuditReportInsertQuery =
      "INSERT INTO coa_audit_reports (coa_report_id, reference, date_created, details, date_received, compliance_status, remarks, personnel_ID, file ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? )";
    const COAAuditReportInsertValues = [
      nextCOAReportID,
      reference,
      dateCreated,
      details,
      dateReceived,
      complianceStatus,
      remarks,
      personnelID,
      file.filename,
    ];

    console.log("COAAuditReportInsertQuery:", COAAuditReportInsertQuery);
    console.log("COAAuditReportInsertValues:", COAAuditReportInsertValues);
    await new Promise((resolve, reject) => {
      db.query(
        COAAuditReportInsertQuery,
        COAAuditReportInsertValues,
        async (err, result) => {
          if (err) {
            console.error("Error in COAAuditReportInsertQuery:", err);
            reject(err);
          } else {
            // Insert into activity_log table
            const nextActivityLogId = await getNextActivityLogId();
            const activityDescription = `Added ${file.filename}`;
            const myDate = new Date();
            myDate.toLocaleString("en-US", {
              timeZone: "Asia/Manila",
            });
            console.log(myDate);
            const activityLogInsertQuery =
              "INSERT INTO activity_log (activity_ID, coa_report_id, dateandtime, activity, user_account) VALUES (?, ?, ?, ?, ?)";
            const activityLogInsertValues = [
              nextActivityLogId,
              nextCOAReportID,
              myDate,
              activityDescription,
              userAccount,
            ];

            await new Promise((resolve, reject) => {
              db.query(
                activityLogInsertQuery,
                activityLogInsertValues,
                (err, result) => {
                  if (err) {
                    console.error("Error in activityLogInsertQuery:", err);
                    reject(err);
                  } else {
                    resolve(result);
                  }
                }
              );
            });

            resolve(result);
          }
        }
      );
    });

    const COAAuditReportsHistoryInsertQuery =
      "INSERT INTO coa_audit_reports_history (coa_report_history_ID, coa_report_id, reference, date_created, details, date_received, compliance_status, file, remarks, personnel_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const COAAuditReportsHistoryInsertValues = [
      nextCOAHistoryId,
      nextCOAReportID,
      reference,
      dateCreated,
      details,
      dateReceived,
      complianceStatus,
      file.filename,
      remarks,
      personnelID,
    ];

    console.log(
      "COAAuditReportsHistoryInsertQuery:",
      COAAuditReportsHistoryInsertQuery
    );
    console.log(
      "COAAuditReportsHistoryInsertValues:",
      COAAuditReportsHistoryInsertValues
    );

    await new Promise((resolve, reject) => {
      db.query(
        COAAuditReportsHistoryInsertQuery,
        COAAuditReportsHistoryInsertValues,
        (err, result) => {
          if (err) {
            console.error("Error in COAAuditReportsHistoryInsertQuery:", err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    // Move the file to communication-uploads_history folder
    const historyFilePath = join(uploadsHistoryPath, file.filename);
    fs.copyFileSync(join(uploadsPath, file.filename), historyFilePath);

    console.log("COA Audit Report and History added to the database");
    return res.json({
      Status: "Success",
      Message: "COA Audit Report and History added to the database",
    });
  } catch (error) {
    console.error("Error adding COA Audit Report and History:", error);
    return res.status(500).json({
      Status: "Error",
      Message: "Error adding COA Audit Report and History to the database",
    });
  }
});

// UPDATE
// Function to move the file to the "coaauditrreports-uploads-history" folder
const moveFileToHistoryFolder = (filename, callback) => {
  const sourcePath = join(uploadsPath, filename);
  const destinationPath = join(uploadsHistoryPath, filename);

  fs.rename(sourcePath, destinationPath, (err) => {
    if (err) {
      console.error(err);
      return callback(err);
    }

    console.log(
      "File moved to coaauditreports-uploads-history folder" + filename
    );
    callback(null);
  });
};

// Function to insert a record into the "coa_audit_reports_history" table
const insertCOAHistory = (coaID, callback) => {
  const insertCOAHistorySQL = `
    INSERT INTO coa_audit_reports_history (coa_report_history_id, coa_report_id, reference, date_created, details, date_received, compliance_status, file, remarks, personnel_ID, date_actioned )
    SELECT ?, coa_report_id, reference, date_created, details, date_received, compliance_status, file, remarks, personnel_ID, date_actioned 
    FROM coa_audit_reports
    WHERE coa_report_id = ?`;

  const getCOAHistoryIDSQL = `
    SELECT MAX(coa_report_history_ID) AS maxCOAHistoryID
    FROM coa_audit_reports_history`;

  db.query(getCOAHistoryIDSQL, (err, result) => {
    if (err) {
      console.error(err);
      return callback(err);
    }

    const maxCOAHistoryID = result[0].maxCOAHistoryID;

    // Check if coa_report_history_id is 0, set it to 1. Otherwise, increment by 1
    const nextCOAHistoryID = maxCOAHistoryID === 0 ? 1 : maxCOAHistoryID + 1;

    // Update the coa_report_history table with the correct coa_report_history_id
    db.query(insertCOAHistorySQL, [nextCOAHistoryID, coaID], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }

      console.log("Record added to coa_report_history table");
      callback(null, result);
    });
  });
};

router.put("/updateCOAReportFile/:id", upload.single("file"), (req, res) => {
  const { id } = req.params;
  const {
    reference,
    date_created,
    details,
    date_received,
    compliance_status,
    remarks,
    personnel_ID,
  } = req.body;

  const newFile = req.file ? req.file.filename : null;
  console.log("New file uploaded:", newFile);

  const myEditDate = new Date();
  myEditDate.toLocaleString("en-US", {
    timeZone: "Asia/Manila",
  });
  if (!id) {
    return res
      .status(400)
      .json({
        Status: "Error",
        Message: "Invalid COA AUDIT REPORT id provided",
      });
  }

  // Get the current file name from the database
  const getCurrentFileSQL =
    "SELECT file FROM coa_audit_reports WHERE coa_report_id = ?";
  db.query(getCurrentFileSQL, [id], (err, result) => {
    if (err) {
      console.error("Error retrieving current file from the database:", err);
      return res.status(500).json({
        Status: "Error",
        Message: "Error retrieving current file from the database",
      });
    }

    const currentFile = result[0] ? result[0].file : null;

    if (currentFile) {
      // If a new file is uploaded, move the old file to the history folder
      moveFileToHistoryFolder(currentFile, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            Status: "Error",
            Message: "Error moving file to history folder",
          });
        }

        // Continue with the COA AUDIT REPORT update process
        updateCOAFile();
      });
    } else {
      // If no new file is uploaded, or if it's the same as the old file, continue with the update process
      updateCOAFile();
    }

    function updateCOAFile() {
      const updateCOAFileSQL = `
        UPDATE coa_audit_reports
        SET
        reference = ?,
        date_created = ?,
        details = ?,
        date_received = ?,
        compliance_status = ?,
        remarks = ?,
        personnel_ID = ?,
        date_actioned = ?,
        file = ?
        WHERE coa_report_id = ?`;
      const fileToUpdate = newFile ? newFile : currentFile;

      db.query(
        updateCOAFileSQL,
        [
          reference,
          date_created,
          details,
          date_received,
          compliance_status,
          remarks,
          personnel_ID,
          myEditDate,
          fileToUpdate,
          id,
        ],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              Status: "Error",
              Message: "Error updating COA AUDIT REPORT in the database",
            });
          }

          if (result.affectedRows === 0) {
            return res
              .status(404)
              .json({ Status: "Error", Message: "COA AUDIT REPORT not found" });
          }

          // Insert a record into the "coa_report_history" table
          insertCOAHistory(id, (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({
                Status: "Error",
                Message: "Error adding record to coa_report_history table",
              });
            }

            console.log("COA updated in the database");
            return res.status(200).json({
              Status: "Success",
              Message: "COA updated in the database",
            });
          });
        }
      );
    }
  });
});
//last line sa admin: coa audit reports

export default router;
