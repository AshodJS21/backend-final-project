const { Router } = require("express");
const Auth = require("../middlewares/auth");
const AuthController = require("../controllers/AuthController");
const async = require("../utils/async");
const validator = require("../validator");

const router = new Router();

router.post("/auth", validator.login, async(AuthController.authenticate));

module.exports = router;
