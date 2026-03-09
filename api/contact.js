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

// 2. The Route 
app.post('/api/contact', async (req, res) => {
    // UPDATED: Destructuring to include 'message'
    const { name, email, project, message } = req.body;

    const clientVision = (message && message.trim() !== "") ? message : "No specific details shared.";

    // 3. The Email Layout (Premium Sync)
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'david.digitalarchitect@gmail.com', 
        subject: `✨ New Digital Estate Lead: ${name}`,
        html: `
        <div style="font-family: 'Helvetica', Arial, sans-serif; padding: 30px; border: 1px solid #b08436; max-width: 600px;">
            <h2 style="color: #b08436; margin-bottom: 5px; font-weight: 400;">Inquiry Secured</h2>
            <p style="color: #666; margin-top: 0; font-size: 0.9rem;">Captured via The Digital Estate Architecture.</p>
            
            <hr style="border: none; border-top: 1px solid #b08436; opacity: 0.3; margin: 20px 0;">
            
            <p style="margin-bottom: 10px;"><strong>Client:</strong> ${name}</p>
            <p style="margin-bottom: 10px;"><strong>Contact:</strong> ${email}</p>
            <p style="margin-bottom: 10px;"><strong>Asset Goal:</strong> ${project}</p>
            
            <div style="margin-top: 25px; padding: 20px; background-color: #fdfaf4; border-left: 3px solid #b08436;">
                <p style="margin: 0; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: #b08436;">Client Vision</p>
                <p style="margin-top: 10px; line-height: 1.6; color: #1a1a1a;">${clientVision}</p>
            </div>
            
            <p style="margin-top: 30px; font-size: 0.7rem; color: #999; text-align: center; text-transform: uppercase; letter-spacing: 2px;">
                © 2026 David Olawale | Professional Portfolio
            </p>
        </div>
        `
    };

    // 4. Send the Email
    try {
        console.log(`Routing lead for ${name}...`);
        await transporter.sendMail(mailOptions);
        console.log("SUCCESS: Message captured and email dropped!");
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