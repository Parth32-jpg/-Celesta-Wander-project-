const express = require("express");
const router = express.Router();

router.get("/:id" , (req,res) => {
    res.send("Get user id");
})

router.get("/" , (req,res) => {
    res.send("GET user route");
})

module.exports = router;