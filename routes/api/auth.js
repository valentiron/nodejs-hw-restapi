const express = require("express")

const {register, login} = require("../../controllers/auth")

const router = express.Router();

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), register)


router.post("/login",validateBody(schemas.registerSchema), login)



module.exports = router;
