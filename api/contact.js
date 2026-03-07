require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

// 1. The Transporter (Logs into your Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// 2. The Route (Catches the data from the frontend)
app.post('/api/contact', async (req, res) => {
    const { name, email, project } = req.body;

    // 3. The Email Layout (Using your premium HTML design)
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'david.digitalarchitect@gmail.com', // Hardcoded to guarantee delivery!
        subject: `New Digital Estate Lead: ${name}`,
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #9e7d3e; margin-bottom: 5px;">New Inquiry Captured</h2>
            <p style="color: #555; margin-top: 0;">You have a new lead from your portfolio.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Requested Service:</strong> ${project}</p>
        </div>
        `
    };

    // 4. Send the Email
    try {
        console.log("Attempting to route the new lead...");
        await transporter.sendMail(mailOptions);
        console.log("SUCCESS: Lead captured and email sent!");
        res.status(200).send('Inquiry Secured');
    } catch (error) {
        console.error('CRITICAL EMAIL ERROR:', error);
        res.status(500).send('Routing Failed');
    }
});

// 5. Start the Local Engine
const PORT = process.env.PORT || 5001;
app.listen(PORT, '127.0.0.1', () => {
    console.log(`🚀 Digital Estate Backend listening instantly on http://127.0.0.1:${PORT}`);
});

module.exports = app;