const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const URL=process.env.URL||"http://localhost:5000/"
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Logging middleware (debugging)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});
console.log(process.env.EMAIL_USER,process.env.EMAIL_PASSWORD)
// Contact form route
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: `Email: ${email}\nMessage: ${message}`,
    });

    res.status(200).json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
});
app.get("/", (req, res) => {
  res.send("Server is running. Use POST /api/contact to send messages.");
});
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});