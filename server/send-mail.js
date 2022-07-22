const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();
const hbs = require('nodemailer-express-handlebars')

const sendEmail = async (mailObj) => {
    const { from, to, subject, text, template, context } = mailObj;

    try {
        let transporter = nodemailer.createTransport({
            name: process.env.SMTP_HOST,
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            // secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        transporter.use(
            "compile",
            hbs({
                viewEngine: {
                    extname: '.handlebars',
                    layoutsDir: 'views/layouts/',
                    defaultLayout: 'main',
                },
                viewPath: 'views',
                extName: '.handlebars',
            }
        ));


        let info = await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: text,
            template: template,
            context: context
        });

        console.log(`Message sent: ${info.messageId}`);
        return `Message sent: ${info.messageId}`;
    } catch (error) {
        console.error(error);
        throw new Error(
            `Something went wrong in the sendmail method. Error: ${error.message}`
        );
    }
}


module.exports = sendEmail;
