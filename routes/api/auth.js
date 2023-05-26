const express = require("express")

const {register, login, getCurrent, logout} = require("../../controllers/auth")

const router = express.Router();

const { validateBody, authentificate } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), register)

router.post("/login",validateBody(schemas.registerSchema), login)

router.get("/current", authentificate, getCurrent)

router.post("/logout", authentificate, logout)


module.exports = router;
