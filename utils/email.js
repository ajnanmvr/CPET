const nodemailer = require("nodemailer");
const hbs = require("hbs");
const htmlToText = require("html-to-text");
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Janish Nehyan ${process.env.EMAIL_FROM}`;
  }
  newTransport() {
    if (process.env.NODE_ENV === "production") {
      //sendGrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SEND_GRID_USERNAME,
          pass: process.env.SEND_GRID_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async send(template, subject) {
    //1) render HTML based on hbs
    const html = hbs.renderFile(`${__dirname}/../views/${template}.hbs`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    // 2) define Email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html,
      text: htmlToText.fromString(html),
    };
    // 3) create a trasport and send
    await this.newTransport().sendMail(mailOptions); //sendMail is build in function
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
