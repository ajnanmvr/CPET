const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor({ email, url, registrationId, name, res, subject }) {
    this.email = email;
    this.url = url;
    this.from = `CPET Darul Huda`;
    this.registrationId = registrationId;
    this.subject = subject;
    this.res = res;
    this.name = name;
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nehyanjanish@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
    port: 465,
    secure: true,
  });

  async send(template) {
    //1) render HTML based on pug
    try {
      const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
        name: this.name,
        subject: this.subject,
        registrationId: this.registrationId,
        url: this.url,
      });
      // 2) define Email options
      const mailOptions = {
        from: "cpet.dhiu.in",
        to: this.email,
        subject: this.subject,
        html,
        text: htmlToText.fromString(html),
      };
      // 3) create a trasport and send
      let data = await this.transporter.sendMail(mailOptions); //sendMail is build in function
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async sendWelcome() {
    await this.send("welcome", "welcome to natours family");
  }

  async sendPasswordReset() {
    await this.send("passwordReset");
  }
};
