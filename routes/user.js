const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();
const passport = require("passport");
const { savedRedirectUrl } = require("../loginmiddleware.js");

const userController = require("../controllers/user.js");

router.route("/signup")
.get(userController.renderSignup)//GET SIGNUPFORM
.post(
  wrapAsync(userController.performSignup)
);//POST signup

router.route("/login")
.get(userController.renderLogin)// GET LOGINFORM
.post(
  savedRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.performLogin
);//POST LOGIN

router.get("/logout",userController.performLogout)

module.exports = router;
