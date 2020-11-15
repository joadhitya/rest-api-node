var express = require("express");
var auth = require("./auth");
const verification = require("./verification");
var router = express.Router();
// Route Registration
router.post("/api/v1/register", auth.register);
router.post("/api/v1/login", auth.login);

// AUTHORIZATION ROUTE
router.get("/api/v1/secretPage", verification(2), auth.secretPage);
router.get("/api/v1/admin/mahasiswa", verification(2), auth.adminStudents)

module.exports = router;
