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
const uploadsPath = join(__dirname, "..", "listofreports-uploads");

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

//  sa communication table to see the file
router.use('/listofreportfiles', express.static(join(__dirname, 'listofreports-uploads')));

router.get("/listofreportfiles/:filename", (req, res) => {
  const { filename } = req.params;
  res.sendFile(join(uploadsPath, filename));
});


// READ
router.get("/getReports", (req, res) => {
  const sql = `
    SELECT
      r.report_ID,
      r.type_of_report,
      r.agency,
      r.expected_frequency,
      r.submission_date
    FROM reports r
    ORDER BY r.report_ID DESC;
  `;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching report records:", err);
      return res
        .status(500)
        .json({ Status: "Error", Message: "Failed to fetch report records" });
    }

    return res.status(200).json(data);
  });
});

// READ or .get with ID
router.get("/getReports/:id", (req, res) => {
  const reportId = req.params.id;
  
  // Query to fetch data from list_of_reports
  const sqlListOfReports = `
    SELECT
      lor.list_report_ID,
      lor.report_ID,
      lor.remarks,
      lor.date_submitted,
      lor.file,
      p.Full_Name AS personnel_name,
      r.type_of_report AS type_of_report
    FROM list_of_reports lor  
    JOIN personnel p ON lor.personnel_ID = p.personnel_ID
    JOIN reports r ON lor.report_ID = r.report_ID
    WHERE lor.report_ID = ?;
  `;
  
  // Query to fetch data from reports if no records found in list_of_reports
  const sqlReports = `
    SELECT
      r.report_ID,
      r.type_of_report AS type_of_report
    FROM reports r
    WHERE r.report_ID = ?;
  `;

  db.query(sqlListOfReports, [reportId], (err, data) => {
    if (err) {
      console.error("Error fetching report:", err);
      return res.status(500).json({ Status: "Error", Message: "Failed to fetch report" });
    }

    if (data.length === 0) {
      // If no records found in list_of_reports, fetch from reports table
      db.query(sqlReports, [reportId], (err, reportData) => {
        if (err) {
          console.error("Error fetching report:", err);
          return res.status(500).json({ Status: "Error", Message: "Failed to fetch report" });
        }

        if (reportData.length === 0) {
          return res.status(404).json({ Status: "Error", Message: "Report not found" });
        }

        return res.status(200).json(reportData[0]); // Return only the basic report information
      });
    } else {
      return res.status(200).json(data); // Return data from list_of_reports
    }
  });
});




//CREATE

const getNextReportID = async () => {
  return new Promise((resolve, reject) => {
    const getMaxReportIDQuery =
      "SELECT MAX(report_ID) AS maxReportID FROM reports";
    db.query(getMaxReportIDQuery, (err, result) => {
      if (err) {
        console.error("Error in getMaxReportIDQuery:", err);
        reject(err);
      } else {
        const maxReportID = result[0].maxReportID || 0;
        const nextReportID = maxReportID + 1;
        console.log("nextReportID:", nextReportID);
        resolve(nextReportID);
      }
    });
  });
};

router.post("/addReport", async (req, res) => {
  const {
    // reportID,
    typeOfReport,
    agency,
    expected_frequency,
    submission_date,
  } = req.body;

  try {

    const nextReportID = await getNextReportID();
    const reportInsertQuery =
      "INSERT INTO reports (report_ID, type_of_report, agency, expected_frequency, submission_date) VALUES ( ?, ?, ?, ?, ?)";
    const reportInsertValues = [
      nextReportID,
      typeOfReport,
      agency,
      expected_frequency,
      submission_date,
    ];

    const result = await new Promise((resolve, reject) => {
      db.query(reportInsertQuery, reportInsertValues, (err, result) => {
        if (err) {
          console.error("Error in reportInsertQuery:", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    console.log("Report added to the database");
    return res.json({
      Status: "Success",
      Message: "Report added to the database",
    });
  } catch (error) {
    console.error("Error adding report:", error);
    return res.status(500).json({
      Status: "Error",
      Message: "Error adding report to the database",
    });
  }
});


//CREATE SA LIST OF REPORT

//CREATE
const getNextListOfReportID = async () => {
  return new Promise((resolve, reject) => {
    const getMaxListOfReportIDQuery =
      "SELECT MAX(list_report_ID) AS maxListOfReportID FROM list_of_reports";
    db.query(getMaxListOfReportIDQuery, (err, result) => {
      if (err) {
        console.error("Error in getMaxListOfReportIDQuery:", err);
        reject(err);
      } else {
        const maxListOfReportID = result[0].maxListOfReportID || 0;
        const nextListOfReportID = maxListOfReportID + 1;
        console.log("nextCOAReportID:", nextListOfReportID);
        resolve(nextListOfReportID);
      }
    });
  });
};

router.post("/addListOfReport", upload.single("file"), async (req, res) => {
  const {
    // listreportID,
    reportID,
    remarks,
    dateSubmitted,
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

    const nextListOfReportID = await getNextListOfReportID();

    const ListOfReportInsertQuery =
      "INSERT INTO list_of_reports (list_report_ID, report_ID, remarks, date_submitted, personnel_ID, file ) VALUES (?, ?, ?, ?, ?, ?)";
    const ListOfReportInsertValues = [
      nextListOfReportID,
      reportID,
      remarks,
      dateSubmitted,
      personnelID, 
      file.filename,
    ];

    console.log("ListOfReportInsertQuery:", ListOfReportInsertQuery);
    console.log("ListOfReportInsertValues:", ListOfReportInsertValues);
    const result = await new Promise((resolve, reject) => {
      db.query(
        ListOfReportInsertQuery,
        ListOfReportInsertValues,
        (err, result) => {
          if (err) {
            console.error("Error in ListOfReportInsertQuery:", err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    console.log("Record added to the database");
    return res.json({
      Status: "Success",
      Message: "Record added to the database",
    });
  } catch (error) {
    console.error("Error adding the Record:", error);
    return res.status(500).json({
      Status: "Error",
      Message: "Error adding Record to the database",
    });
  }
});


//last line sa admin:reports

export default router;
