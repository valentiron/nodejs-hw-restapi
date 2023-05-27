const nodemailer = require("nodemailer");

const { USER_EMAIL, USER_PASS } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: USER_EMAIL,
    pass: USER_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "valikgera2002@meta.ua" };

  await transport.sendMail(email);
};

module.exports = sendEmail;
