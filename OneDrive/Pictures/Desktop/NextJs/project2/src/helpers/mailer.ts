import nodemailer from 'nodemailer';

const sendEmail = async (email: string, emailType: string, userId: string)=> {
    try {
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        let mailDetails = {
            from: 'amit.mamgai2002@gmail.com',
            to: email,
            subject: emailType==='VERIFY'?"Verify your email":"Reset Your Password",
            html: userId,
        };

        let info = await mailTransporter.sendMail(mailDetails);
        console.log('Email sent successfully:', info.response);
    } catch (err) {
        console.error('Error occurs:', err);
    }
};

export default sendEmail;


