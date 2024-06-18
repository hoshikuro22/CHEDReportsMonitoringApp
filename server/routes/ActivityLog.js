import express from "express";
import mysql from "mysql";

const router = express.Router();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chedreportssystem",
});

router.get('/getActivityLog', (req, res) => {
  const sql = `
    SELECT
      activity_ID AS ActivityID,
      coa_report_id AS COA_ID,
      dateandtime AS DateAndTime,
      activity AS Activity,
      user_account AS UserAccount
    FROM
      activity_log
    ORDER BY ActivityID DESC;
  `;

  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching activity log:', err);
      return res.status(500).json({ Status: 'Error', Message: 'Failed to fetch activity log' });
    }

    return res.status(200).json(data);
  });
});

  

//last line sa admin:reports

export default router;