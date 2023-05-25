const bcrypt = require("bcrypt")
require("dotenv")
const jwt = require("jsonwebtoken")

const {User} = require("../models/user")

const { HttpError, ctrlWrapper } = require("../helpers");

const {SECRET_KEY} = process.env

const register = async(req, res) => {
const{email, password} = req.body;
const user = await User.findOne({email});

if(user) {
    throw HttpError(409, "Conflict. Email is already used")
}

const hashPassword = await bcrypt.hash(password, 10)

const newUser = await User.create({...req.body, password: hashPassword});

res.json({
    name: newUser.name,
    email: newUser.email,
})

}


const login = async(req, res) => {
const {email, password} = req.body;

const user = await User.findOne({email});
if(!user) {
    throw HttpError(401, "Email or password invalid");
}

const comparePassword = await bcrypt.compare(password, user.password)
if(!comparePassword) {
    throw HttpError(401, "Email or password invalid");
}

const payload = {
    id: user._id,
}

const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "20d" })

res.json({
    token
})
}

module.exports = {
register:ctrlWrapper(register),
login:ctrlWrapper(login),
}