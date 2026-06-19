/**
 * Portfolio contact form — Google Apps Script
 * Uses whichever sheet tab is open (no tab name required).
 */

const SECRET = 'Portfolio_Komal_2026_x7Kp2mNq';
const NOTIFY_EMAIL = 'komalgiri789@gmail.com';

function getContactSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const active = spreadsheet.getActiveSheet();
  if (active) return active;
  const sheets = spreadsheet.getSheets();
  if (sheets.length > 0) return sheets[0];
  throw new Error('No sheets in this spreadsheet.');
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (!data.secret || data.secret !== SECRET) {
      return jsonResponse({ error: 'Unauthorized.' }, 401);
    }

    const name = String(data.name || '').trim();
    const email = String(data.email || '').trim();
    const phone = String(data.phone || '').trim();
    const message = String(data.message || '').trim();

    if (!name) return jsonResponse({ error: 'Name is required.' }, 400);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ error: 'A valid email is required.' }, 400);
    }
    if (!message) return jsonResponse({ error: 'Message is required.' }, 400);

    const timestamp = new Date().toISOString();
    const sheet = getContactSheet();

    sheet.appendRow([timestamp, name, email, phone, message]);

    let emailSent = false;
    try {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: email,
        subject: '[Portfolio] New message from ' + name,
        body: [
          'New portfolio contact form submission',
          '',
          'Name: ' + name,
          'Email: ' + email,
          'Phone: ' + (phone || '(not provided)'),
          'Received: ' + timestamp,
          '',
          'Message:',
          message,
        ].join('\n'),
      });
      emailSent = true;
    } catch (mailErr) {
      console.error('MailApp failed:', mailErr);
    }

    return jsonResponse({
      success: true,
      message: emailSent
        ? 'Message received. I will get back to you soon.'
        : 'Message saved. Email notification could not be sent — check Apps Script quota.',
    });
  } catch (err) {
    return jsonResponse({ error: String(err) }, 500);
  }
}

function jsonResponse(body, statusCode) {
  if (statusCode && statusCode >= 400) {
    return ContentService.createTextOutput(
      JSON.stringify({ ...body, status: statusCode }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
