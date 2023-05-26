const express = require("express")

const {register, login, getCurrent, logout, updateAvatar} = require("../../controllers/auth")

const router = express.Router();

const { validateBody, authentificate, upload} = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), register)

router.post("/login",validateBody(schemas.registerSchema), login)

router.get("/current", authentificate, getCurrent)

router.post("/logout", authentificate, logout)

router.patch('/avatars', authentificate, upload.single("avatar"), updateAvatar)


module.exports = router;
