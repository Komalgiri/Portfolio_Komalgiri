import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'contacts.json');

const MAIL_TO = process.env.MAIL_TO || 'komalgiri789@gmail.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Ensure data file exists on startup
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

function readContacts() {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeContacts(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

async function sendEmailWithResend({ name, email, subject, message, receivedAt }) {
    if (!RESEND_API_KEY || !RESEND_FROM) {
        throw new Error('Email is not configured. Set RESEND_API_KEY and RESEND_FROM in environment variables.');
    }

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: RESEND_FROM,
            to: [MAIL_TO],
            reply_to: email,
            subject: `[Portfolio] ${subject || 'New Contact Form Message'}`,
            text: [
                'New message from your portfolio contact form',
                `Name: ${name}`,
                `Email: ${email}`,
                `Subject: ${subject || '(no subject)'}`,
                `Received: ${receivedAt}`,
                '',
                'Message:',
                message,
            ].join('\n'),
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Resend API failed (${response.status}): ${errorText}`);
    }
}

// POST /api/contact — submit a new message
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: 'Name is required.' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'A valid email is required.' });
    }
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    const contacts = readContacts();
    const newContact = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        subject: subject ? subject.trim() : '(no subject)',
        message: message.trim(),
        receivedAt: new Date().toISOString(),
    };

    contacts.push(newContact);
    writeContacts(contacts);

    try {
        await sendEmailWithResend({
            name: name.trim(),
            email: email.trim(),
            subject: subject ? subject.trim() : '',
            message: message.trim(),
            receivedAt: newContact.receivedAt,
        });

        console.log(`[${newContact.receivedAt}] New message emailed from ${newContact.name} <${newContact.email}>`);
        return res.status(201).json({ success: true, message: "Message received and delivered to email." });
    } catch (error) {
        console.error('Email delivery failed:', error);
        return res.status(500).json({
            error: 'Message was saved, but email delivery failed. Check SMTP credentials.',
        });
    }
});

// GET /api/contacts — view all submitted messages
app.get('/api/contacts', (req, res) => {
    const contacts = readContacts();
    return res.json(contacts);
});

// DELETE /api/contacts/:id — remove a single submission
app.delete('/api/contacts/:id', (req, res) => {
    const id = Number(req.params.id);
    const contacts = readContacts();
    const filtered = contacts.filter((c) => c.id !== id);
    if (filtered.length === contacts.length) {
        return res.status(404).json({ error: 'Submission not found.' });
    }
    writeContacts(filtered);
    return res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`API server running → http://localhost:${PORT}`);
    console.log(`  POST /api/contact    — submit a message`);
    console.log(`  GET  /api/contacts   — view all submissions`);
});
