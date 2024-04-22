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
router.get("/getReports", (req, res) => {
  const sql = `
    SELECT
      r.report_ID,
      rt.type AS report_type,
      r.report_description,
      r.remarks,
      r.date_submitted,
      r.expected_frequency,
      s.status,
      p.Full_Name AS personnel_name,
      a.agency_name
    FROM reports r
    JOIN report_type rt ON r.report_type_ID = rt.report_type_ID
    JOIN status s ON r.status_ID = s.status_ID
    JOIN personnel p ON r.personnel_ID = p.personnel_ID
    JOIN agency a ON r.agency_ID = a.agency_ID
    ORDER BY r.report_ID DESC;
  `;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching report records:", err);
      return res.status(500).json({ Status: "Error", Message: "Failed to fetch report records" });
    }

    return res.status(200).json(data);
  });
});



  //last line sa admin:reports

export default router;