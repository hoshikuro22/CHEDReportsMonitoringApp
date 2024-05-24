import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import reportsRoutes from "./routes/Reports.js";
import coaauditreportsRoutes from "./routes/CoaAuditReports.js"

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chedreportssystem",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
setInterval(() => {
  db.query('SELECT 1', (err) => {
    console.log("3 Minutes anti-afk")
    if (err) {
      console.error('Keep-alive query error:', err);
    }
  });
}, 180000);

/////////////////////
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "You need to log in to access" });
  } else {
    jwt.verify(token, "secretkey", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Authentication Error" });
      } else {
        // console.log(decoded); // Check the structure of 'decoded' here
        req.Full_Name = decoded.user.Full_Name;
        req.personnel_ID = decoded.user.personnel_ID;
        req.Password = decoded.user.Password;
        req.Username = decoded.user.Username;
        // req.Contact_Number = decoded.user.Contact_Number;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
    return res.json({
      Status: "Logged in",
      Full_Name: req.Full_Name,
      personnel_ID: req.personnel_ID,
      Password: req.Password,
      Username: req.Username,
    });
  });

app.post("/login", (req, res) => {
    const sql = "SELECT * FROM personnel WHERE Username = ? ";
    db.query(sql, [req.body.Username], (err, data) => {
      if (err) return res.json({ Error: "Server Side Error" });
      if (data.length > 0) {
        bcrypt.compare(
          req.body.Password.toString(),
          data[0].Password,
          (err, response) => {
            if (err) return res.json({ Error: "Password compare error" });
            if (response) {
              const user = data[0];
              //  console.log("this is the user:"+ user); // Check the structure of 'user' here
              const token = jwt.sign({ user }, "secretkey", { expiresIn: "1d" });
              res
                .cookie("token", token, {
                  httpOnly: true,
                  // secure: true,
                  sameSite: false,
                  credentials: "include",
                })
                .json({
                  Status: "Success",
                  userType: user.User_type_ID,
                  First_Name: user.First_Name,
                  Last_Name: user.Last_Name,
                  Username: user.Username,
                });
            } else {
              return res.json({ Error: "Password not matched" });
            }
          }
        );
      } else {
        return res.json({ Message: "No Username existed" });
      }
    });
  });

  app.use("/", reportsRoutes);
  app.use("/", coaauditreportsRoutes);



app.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({ Status: "Success" });
  });
  
  app.listen(8082, () => {
    console.log("Server running!");
  });