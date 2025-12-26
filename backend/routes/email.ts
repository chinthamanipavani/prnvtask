import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.post("/", async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // ✅ Create transporter using env variables
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // from .env
        pass: process.env.EMAIL_PASS, // from .env
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
    });

    res.json({ message: "Email sent successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Email sending failed", error: error.message });
  }
});

export default router;
