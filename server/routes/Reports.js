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
      r.report_name,
      rt.type AS report_type,
      a.agency_name,
      r.expected_frequency,
      r.submission_date,
      p.Full_Name AS personnel_name
    FROM reports r
    JOIN report_type rt ON r.report_type_ID = rt.report_type_ID
    JOIN personnel p ON r.personnel_ID = p.personnel_ID
    JOIN agency a ON r.agency_ID = a.agency_ID
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
  const sql = `
    SELECT
      lor.list_report_ID,
      lor.report_ID,
      lor.status,
      lor.date_submitted,
      lor.file
    FROM list_of_reports lor
    WHERE lor.report_ID = ?;
  `;
  db.query(sql, [reportId], (err, data) => {
    if (err) {
      console.error("Error fetching report:", err);
      return res
        .status(500)
        .json({ Status: "Error", Message: "Failed to fetch report" });
    }

    if (data.length === 0) {
      return res
        .status(404)
        .json({ Status: "Error", Message: "Report not found" });
    }

    return res.status(200).json(data); // Assuming only one report is expected
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
    reportName,
    reportType,
    agencyID,
    expected_frequency,
    submission_date,
    personnelID,
  } = req.body;

  try {

    const nextReportID = await getNextReportID();
    const reportInsertQuery =
      "INSERT INTO reports (report_ID, report_name, report_type_ID, agency_ID, expected_frequency, submission_date, personnel_ID) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const reportInsertValues = [
      nextReportID,
      reportName,
      reportType,
      agencyID,
      expected_frequency,
      submission_date,
      personnelID,
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

//last line sa admin:reports

export default router;
