const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const { dirname } = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cpetdarulhuda@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
  port: 465,
  secure: true,
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      partialsDir: dirname(require.main.filename) + "/views",
      defaultLayout: false,
    },
    viewPath: "./views",
    extName: ".hbs",
  })
);
module.exports = class Email {
  constructor({ email, url, registrationId, name, res, subject, title }) {
    this.email = email;
    this.url = url;
    this.from = `CPET Darul Huda`;
    this.subject = subject;
    this.res = res;
    this.title = title;
    this.name = name;
  }

  async send(template) {
    //1) render HTML based on pug
    try {
      const mailOptions = {
        from: "cpet.dhiu.in",
        to: this.email,
        subject: "subject",
        template: template,
        context: {
          name: this.name,
          subject: this.subject,
          registrationId: this.registrationId,
          url: this.url,
          title: this.title,
        },
      };
      // 3) create a trasport and send
      let data = await transporter.sendMail(mailOptions); //sendMail is build in function
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async sendWelcome() {
    await this.send("welcome", "welcome to natours family");
  }
};
