import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import router from "./routes/index";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: process.env.COOKIE_KEY,
}));
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Welcome to Annoymous reporting system.");
});

app.listen(port, () => {
  console.log(`Server Running on: ${port}`);
});

export default app;
