var express = require("express");
var auth = require("./auth");
const verification = require("./verification");
var router = express.Router();
// Route Registration
router.post("/api/v1/register", auth.register);
router.post("/api/v1/login", auth.login);

// AUTHORIZATION ROUTE
router.get("/api/v1/secretPage", verification(), auth.secretPage);

module.exports = router;
