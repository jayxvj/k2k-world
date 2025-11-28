import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface CustomRequestEmailData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDates: { start: string; end: string };
  groupSize: number;
  budget: string;
  preferences: string;
  message: string;
}

interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendCustomRequestEmail(data: CustomRequestEmailData) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #667eea; }
        .value { margin-top: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌍 New Custom Trip Request</h1>
          <p>K to K World - Travel & Tourism</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Customer Name:</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${data.email}</div>
          </div>
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value">${data.phone}</div>
          </div>
          <div class="field">
            <div class="label">Destination:</div>
            <div class="value">${data.destination}</div>
          </div>
          <div class="field">
            <div class="label">Travel Dates:</div>
            <div class="value">${data.travelDates.start} to ${data.travelDates.end}</div>
          </div>
          <div class="field">
            <div class="label">Group Size:</div>
            <div class="value">${data.groupSize} people</div>
          </div>
          <div class="field">
            <div class="label">Budget:</div>
            <div class="value">${data.budget}</div>
          </div>
          <div class="field">
            <div class="label">Preferences:</div>
            <div class="value">${data.preferences}</div>
          </div>
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${data.message}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send to company emails
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'jayeshvjadhav23@gmail.com, ktoktourism@gmail.com',
    subject: `New Custom Trip Request - ${data.destination}`,
    html: htmlContent,
  });

  // Send confirmation to customer
  const customerHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Request Received!</h1>
          <p>K to K World - Travel & Tourism</p>
        </div>
        <div class="content">
          <h2>Dear ${data.name},</h2>
          <p>Thank you for your interest in <strong>${data.destination}</strong>!</p>
          <p>We have received your custom trip request and our team will get back to you within 24 hours with a personalized itinerary and quote.</p>
          <p><strong>Your Request Details:</strong></p>
          <ul>
            <li>Destination: ${data.destination}</li>
            <li>Travel Dates: ${data.travelDates.start} to ${data.travelDates.end}</li>
            <li>Group Size: ${data.groupSize} people</li>
            <li>Budget: ${data.budget}</li>
          </ul>
          <p>If you have any urgent questions, feel free to reach out to us at:</p>
          <p>📧 ktoktourism@gmail.com</p>
          <p>Best regards,<br><strong>K to K World Team</strong></p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: 'Your Custom Trip Request - K to K World',
    html: customerHtml,
  });
}

export async function sendContactEmail(data: ContactEmailData) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #667eea; }
        .value { margin-top: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 New Contact Message</h1>
          <p>K to K World - Travel & Tourism</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${data.email}</div>
          </div>
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value">${data.phone}</div>
          </div>
          <div class="field">
            <div class="label">Subject:</div>
            <div class="value">${data.subject}</div>
          </div>
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${data.message}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send to company emails
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'jayeshvjadhav23@gmail.com, ktoktourism@gmail.com',
    subject: `Contact Form: ${data.subject}`,
    html: htmlContent,
  });

  // Send confirmation to customer
  const customerHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Message Received!</h1>
          <p>K to K World - Travel & Tourism</p>
        </div>
        <div class="content">
          <h2>Dear ${data.name},</h2>
          <p>Thank you for contacting K to K World!</p>
          <p>We have received your message regarding <strong>"${data.subject}"</strong> and will respond to you as soon as possible.</p>
          <p>Our team typically responds within 24 hours during business days.</p>
          <p>If you need immediate assistance, please call us or send an email to:</p>
          <p>📧 ktoktourism@gmail.com</p>
          <p>Best regards,<br><strong>K to K World Team</strong></p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: 'We received your message - K to K World',
    html: customerHtml,
  });
}
