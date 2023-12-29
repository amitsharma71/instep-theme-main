const nodemailer = require("nodemailer");

const sendMail = async (email, mailSubject, content) => {
    try {
        const transporter = nodemailer.createTransport({
            service:'gmail',
            port: 587, // or the appropriate port for your email provider
            secure: false,
            requireTLS: true,
            auth: {
                user: "noutiyalgopal@gmail.com",
                pass: "wcvj rpet sist yrrh"
            }
        });

        const mailOptions = {
            from: "noutiyalgopal@gmail.com",
            to: email,
            subject: mailSubject,
            html: content
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Mail sent successfully:', info.response);
        return info;
    } catch (error) {
        console.error('Error sending mail:', error);
        throw error;
    }
};

module.exports = sendMail;
