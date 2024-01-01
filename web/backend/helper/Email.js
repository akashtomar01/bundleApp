import nodemailer from "nodemailer";
import ejs from 'ejs';
import path from "path";
import { fileURLToPath } from "url";
// import dotenv from "dotenv";

// dotenv.config();

const contactEmail = (req, res) => {
  try {
    const shop = res.locals.shopify.session.shop;
    const { uname, umail, message, storePassword } = req.body;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dirPath = path.join(__dirname, "./templates");

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "shopifyapp.shinedezign@gmail.com",
        pass: "gdnetbnzmlsoehti",
      },
    });

    const emailData = {
      logoURL: "https://cdn.shopify.com/s/files/1/0801/7264/6691/files/MicrosoftTeams-image_12.png?v=1691413762",
      emailTo: "vikas@shinedezign.com",
      emailSub:`Smart Bundle Support Request by ${uname} - [${shop}]`,
      userEmail: umail,
      userName: uname,
      storeName: shop,
      message: message,
      storePassword: storePassword == undefined ? false : storePassword,
    };

    const sendEmail = (emailOptions) => {
      ejs.renderFile(dirPath + "/mailTemplate.ejs", { emailOptions }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let mailOptions = {
            from:`Smart Bundle Discounts  ${emailOptions.userEmail}`,
            to: emailOptions.emailTo,
            cc:['vipin.garg@shinedezign.com'],
            subject: emailOptions.emailSub,
            replyTo: umail,
            html: data,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(502).json({ msg: "Mail Not sent! Try Again" });
            }
            res.status(201).json({ msg: "Email has been sent successfully!" });
          });
        }
      });
    };
    sendEmail(emailData);
  } catch (err) {
    res.status(502).json({ msg: "Something went Wrong",err:err.message});
  }
}


export default contactEmail