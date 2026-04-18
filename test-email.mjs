import nodemailer from "nodemailer";

async function test() {
    console.log("Using pass:", process.env.EMAIL_PASS ? "Set (length: " + process.env.EMAIL_PASS.length + ")" : "Not Set");

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "ashrafulislamtusar2021@gmail.com",
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: '"Safe-Entry Security" <ashrafulislamtusar2021@gmail.com>',
            to: "ashrafulislamtusar2021@gmail.com",
            subject: "Test Email",
            html: "<b>Testing</b>"
        });
        console.log("Success:", info.messageId);
    } catch (err) {
        console.error("Error:", err);
    }
}

test();
