import express from "express";
import mysql from "mysql";


const router = express.Router();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chedreportssystem",
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
        return res.status(500).json({ Status: "Error", Message: "Failed to fetch COA audit reports" });
      }
  
      return res.status(200).json(data);
    });
  });



  //last line sa admin: coa audit reports

export default router;