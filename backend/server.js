const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors()); 

// The Contact API Endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, project } = req.body;

    if (!name || !email || !project) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL, 
            subject: `New Digital Estate Lead: ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #9e7d3e; margin-bottom: 5px;">New Inquiry Captured</h2>
                    <p style="color: #555; margin-top: 0;">You have a new lead from your portfolio.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Requested Service:</strong> ${project}</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Lead captured successfully.' });

    } catch (error) {
        console.error('Email Error:', error);
        res.status(500).json({ message: 'Server error. Failed to send email.' });
    }
});

const PORT = 5001; // Changed from 5000 to avoid system conflicts

// ... (keep your middleware and routes exactly the same) ...

// Force it to listen specifically on 127.0.0.1 and Port 5001
app.listen(PORT, '127.0.0.1', () => {
    console.log(`🚀 Digital Estate Backend listening instantly on http://127.0.0.1:${PORT}`);
});

module.exports = app;