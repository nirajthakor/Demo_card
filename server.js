import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

const app = express();

// Router
import mainRouter from "./routers/main.js"

mongoose.set("strictQuery", false);

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("uploads"));
app.use(express.static("public"));

// set template engine
app.set("view engine", "ejs");

app.use("/",mainRouter)

const port = process.env.PORT || 3000;
const start = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database Connected...");
    })
    .catch((err) => {
      console.log("Error", err);
    });
  app.listen(port, () => {
    console.log(`server stared on http://localhost:${port}`);
  });
};
start();
