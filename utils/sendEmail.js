const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor({email, url, registrationId, name}) {
    this.email = email;
    this.url = url;
    this.from = `CPET Darul Huda`;
    this.registrationId = registrationId;
    this.name = name;
  }
  
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nehyanjanish@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  async send(template, subject) {
    //1) render HTML based on pug
    try {
      const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
        name: this.name,
        subject,
        registrationId: this.registrationId,
      });
      // 2) define Email options
      const mailOptions = {
        from: this.name,
        to: this.email,
        subject: subject,
        html,
        text: htmlToText.fromString(html),
      };
      // 3) create a trasport and send
      this.transporter.sendMail(mailOptions); //sendMail is build in function
    } catch (error) {
      console.log(error);
    }
  }
  async sendWelcome() {
    await this.send("welcome", "welcome to natours family");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for 10 minutes)"
    );
  }
};
