const User = require("../models/RegisterSchema");
const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();
const sendMail = require("../midellwear/mailsend");

const UserRegister = expressAsyncHandler(async (req, res) => {
  const { email, password, lastname, firstname, number } = req.body;
  const randomtoken = Math.floor(100000 + Math.random() * 900000);
  const role = "user";
  const data = new User({
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
    number: number,
    verificationOTP: randomtoken,
    role: role,
  });

  try {
    const useremail = await User.findOne({ email: email });

    let mailsubject = "Mail verification";

    const content = `<p>Hi ${email} please <a href="http://localhost:5000/mail-verification?token=${randomtoken}">verify</a> otp${randomtoken} email</p>`;
    await sendMail(email, mailsubject, content);

    if (useremail) {
      res
        .status(200)
        .send({ success: false, msg: "this email is already exists" });
    } else {
      await data.save();
      res
        .status(200)
        .send({ success: true, data: data, msg: "otp is send to email" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
const useremailvalidate = async (req, res) => {
  const { email, enteredOTP } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare the entered OTP with the one stored in the database
    if (enteredOTP === user.verificationOTP) {
      // OTPs match - Proceed with user registration
      user.isVerified = true; // Set a flag or update a field to mark user as verified
      await user.save();

      return res
        .status(200)
        .json({
          success: true,
          message: "OTP matched. User registered successfully.",
        });
    } else {
      // Incorrect OTP
      return res
        .status(400)
        .json({
          success: false,
          message: "Incorrect OTP. Registration failed.",
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error verifying OTP",
        error: error.message,
      });
  }
};
const forgetpasswordemail = async (req, res) => {
  try {
    const randomToken = Math.floor(100000 + Math.random() * 900000);
    const { email } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser) {
      const update = await User.findByIdAndUpdate(findUser._id, {
        verificationOTP: randomToken,
      });

      if (update) {
        let mailSubject = "Mail Verification";
        const content = `<p>Hi ${email} please <a href="http://localhost:5000/mail-verification?token=${randomToken}">verify</a> otp${randomToken} email</p>`;

        await sendMail(email, mailSubject, content);
        res.status(200).send({ email, success: true });
      } else {
        res
          .status(500)
          .send({ success: false, message: "Failed to update user OTP" });
      }
    } else {
      res
        .status(404)
        .send({
          success: false,
          message: `User not found with email ${email}`,
        });
    }
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};
const updatepassword = async (req, res) => {
  try {
    const { password, otp, email } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser) {
      if (findUser.verificationOTP === otp) {
        findUser.password = password; // Update the password
        await findUser.save();

        res
          .status(200)
          .send({ success: true, msg: "Password updated successfully" });
      } else {
        res.status(400).send({ success: false, msg: "Invalid OTP" });
      }
    } else {
      res
        .status(404)
        .send({ success: false, msg: `User not found with email ${email}` });
    }
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};



module.exports = {
  UserRegister,
  useremailvalidate,
  forgetpasswordemail,
  updatepassword,
};
