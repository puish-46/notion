import express from 'express';
import { connect } from 'mongoose'
import { config } from 'dotenv';
import cookieParser from "cookie-parser";
import { commonAPP } from './API/commonAPI.js';

config({ path: "../.env" })
const app = express();
const PORT = 3000;
app.use(express.json())
app.use("/auth", commonAPP)


//add cookie parser middleware
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('active!');
});
const db_address = process.env.DB_URL
const port = process.env.PORT
const NODE_ENV = process.env.NODE_ENV || "Lol"
try {
  await connect(db_address);
  console.log(`The DataBase is connected!`);
  if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => console.log(`server listning at port : ${port} ...`));
  }
} catch (err) {
  console.log("con refused :", err);
}

app.use((request, response, next) => {
  console.log("ERROR : INVALID URL");
  return response.status(404).json({ message: "Invalid URL" });
});

app.use((err, req, res, next) => {
  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Error cause:", err.cause);
  console.log("Full error:", JSON.stringify(err, null, 2));
  //ValidationError
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  //CastError
  if (err.name === "CastError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;
  // check mongoose error!
  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }
  res.status(500).json({ message: "error occurred", error: "Server side error" });
});

