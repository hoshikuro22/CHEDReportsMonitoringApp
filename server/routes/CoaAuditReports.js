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
router.use('/coaauditreportfiles', express.static(join(__dirname, 'coaauditreports-uploads')));

router.get("/coaauditreportfiles/:filename", (req, res) => {
  const { filename } = req.params;
  res.sendFile(join(uploadsPath, filename));
});


// READ
router.get("/getCOAAuditReports", (req, res) => {
  const sql = `
      SELECT
        c.coa_report_ID,
        c.reference,
        c.date_created,
        c.details,
        c.date_received,
        c.compliance_status,
        c.file,
        c.remarks,
        p.Full_Name AS personnel_name
      FROM coa_audit_reports c
      JOIN personnel p ON c.personnel_ID = p.personnel_ID
      ORDER BY c.coa_report_ID DESC;
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

//CREATE

router.post("/addCOAAuditReport", upload.single("file"), async (req, res) => {
  const {
    coareportID,
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
    const COAAuditReportInsertQuery =
      "INSERT INTO coa_audit_reports (coa_report_ID, reference, date_created, details, date_received, compliance_status, remarks, personnel_ID, file ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? )";
    const COAAuditReportInsertValues = [
      coareportID,
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
    console.log("documentInsertValues:", COAAuditReportInsertValues);
    const result = await new Promise((resolve, reject) => {
      db.query(
        COAAuditReportInsertQuery,
        COAAuditReportInsertValues,
        (err, result) => {
          if (err) {
            console.error("Error in COAAuditReportInsertQuery:", err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    console.log("COA Audit Report added to the database");
    return res.json({
      Status: "Success",
      Message: "COA Audit Report added to the database",
    });
  } catch (error) {
    console.error("Error adding COA Audit Report:", error);
    return res.status(500).json({
      Status: "Error",
      Message: "Error adding COA Audit Report to the database",
    });
  }
});

//last line sa admin: coa audit reports

export default router;
