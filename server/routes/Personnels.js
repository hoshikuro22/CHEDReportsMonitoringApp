import express from "express";
import mysql from "mysql";
import bcrypt from "bcrypt"

const saltRounds = 10;


const router = express.Router();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chedreportssystem",
});

 //CREATE
 const getNextPersonnelId = async () => {
  return new Promise((resolve, reject) => {
    const getMaxPersonnelIdQuery =
      "SELECT MAX(personnel_ID) AS maxPersonnelId FROM personnel";
    db.query(getMaxPersonnelIdQuery, (err, result) => {
      if (err) {
        console.error("Error in getMaxPersonnelIdQuery:", err);
        reject(err);  
      } else {
        const maxPersonnelId = result[0].maxPersonnelId || 0;
        const nextPersonnelId = maxPersonnelId + 1;
        console.log("nextCOAHistoryId:", nextPersonnelId);
        resolve(nextPersonnelId);
      }
    });
  });
};


router.post("/addPersonnel", async (req, res) => {
  const { personnelType, fullName, Position, Username, Password } = req.body;

  try {
    const personnelID = await getNextPersonnelId();

    // Check if the username already exists in the database
    const checkUsernameSql = "SELECT COUNT(*) AS usernameCount FROM personnel WHERE Username = ?";
    db.query(checkUsernameSql, [Username], (err, result) => {
      if (err) {
        console.error("Error checking username:", err);
        return res.json({
          Status: "Error",
          Message: "Error checking username"
        });
      }

      if (result[0].usernameCount > 0) {
        return res.json({
          Status: "Error",
          Message: "Username already exists"
        });
      } else {
        // Hash the password
        bcrypt.hash(Password, saltRounds, (err, hash) => {
          if (err) {
            console.error("Error hashing password:", err);
            return res.json({
              Status: "Error",
              Message: "Error hashing password"
            });
          }

          // Insert the new personnel with the hashed password
          const sql = 
            "INSERT INTO personnel (personnel_ID, personnel_type_ID, Full_Name, Position, Username, Password) VALUES (?, ?, ?, ?, ?, ?)";
          const values = [personnelID, personnelType, fullName, Position, Username, hash];

          db.query(sql, values, (err, result) => {
            if (err) {
              console.error("Error adding personnel to the database:", err);
              return res.json({
                Status: "Error",
                Message: "Error adding personnel to the database",
              });
            }

            console.log("Personnel added to the database");
            return res.json({
              Status: "Success",
              Message: "Personnel added to the database",
            });
          });
        });
      }
    });
  } catch (err) {
    console.error("Error getting next personnel ID:", err);
    return res.json({
      Status: "Error",
      Message: "Error getting next personnel ID",
    });
  }
});


  // READ
  router.get("/getPersonnels", (req, res) => {
    const sql = `
      SELECT
        CAST(p.Personnel_ID AS SIGNED) as Personnel_ID,
        p.personnel_ID,
        p.personnel_type_ID,
        p.Full_Name,
        p.Position,
        p.Username,
        p.Password
         FROM personnel p
      ORDER BY Personnel_ID ASC;
    `;

    db.query(sql, (err, data) => {
      if (err) {
        console.error("Error fetching personnels", err);
        return res
          .status(500)
          .json({ Status: "Error", Message: "Failed to fetch personnels" });
      }

      return res.status(200).json(data);
    });
  });


//last line sa admin:activity log

export default router;