const express = require("express");
const router = express.Router();

const { UserRegister, useremailvalidate, forgetpasswordemail, updatepassword } = require("../controller/registerControllers");

router.post("/register", UserRegister);
router.post("/emailvalidation", useremailvalidate);
router.post("/forgotpassword", forgetpasswordemail);
router.post("/updatepassword", updatepassword);





module.exports = router;
