import express from "express";
import { signin, signup } from "../controllers/auth.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const router = express.Router();

//CREATE A USER
router.post("/signup", signup);

//SIGN IN
router.post("/signin", signin);

//GOOGLE AUTH
//router.post("/google", googleAuth)

//LOT CREATION
//router.post("/lots", lots)

router.post("/verify", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("Wrong credentials!");
    const userr = await OTPCodes.findOne({ code: req.body.code });
    !userr && res.status(400).json("Wrong otp!");
    const userrr = await OTPCodes.findOne({ email: req.body.email });
    if (user.email === userrr.email) {
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } else {
      res.status(500).json(others);
    }
  } catch (err) {
    res.status(500).json("wrong credentials");
  }
});

////////////////////////////////////////////////////////////////

//////////////////////////////send otp

router.post("/sendotp", async (req, res) => {
  const email = req.body.email;

  // Check if email exists

  // Delete previous OTP codes;

  //
  const user = email;
  const buddy = req.body.buddy;

  const generatedOTP = Math.floor(1000 + Math.random() * 9000);
  try {
    sendEmail(user,buddy);
  } catch (error) {
    console.log(error);
  }

  return res.status(200).send({ message: "OTP Sent" });
});

////////////// send email

function sendEmail(receiver) {
 
  const yourEmail = process.env.email;
  const yourPassword = process.env.password;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: yourEmail,
      pass: yourPassword,
    },
  });
  const mailOptions = {
    from: yourEmail,
    to: receiver,
    subject: "Verification Code",
    text: `Dear User, your verification code is ${receiver}.`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
}

export default router;
