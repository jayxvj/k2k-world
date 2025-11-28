import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.phone || !data.numberOfPeople || !data.startDate || !data.destination) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email to customer
    const customerEmailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #9333ea 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #9333ea; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Booking Request Received!</h1>
            </div>
            <div class="content">
              <p>Dear ${data.name},</p>
              <p>Thank you for your interest in booking a trip with <strong>K to K World</strong>!</p>
              <p>We have received your booking request and our team will contact you soon to confirm the details.</p>
              
              <div class="info-box">
                <h3>Your Booking Details:</h3>
                <p><strong>Destination:</strong> ${data.destination}</p>
                <p><strong>Start Date:</strong> ${new Date(data.startDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>Number of People:</strong> ${data.numberOfPeople}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
              </div>
              
              <p>Our travel experts will reach out to you within 24 hours to discuss your itinerary and finalize the booking.</p>
              <p>If you have any urgent questions, please contact us at:</p>
              <p>📧 Email: ktoktourism@gmail.com<br>📞 Phone: +91-XXXXXXXXXX</p>
              
              <div class="footer">
                <p>Thank you for choosing K to K World!</p>
                <p>Creating unforgettable journeys across India</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email to admin
    const adminEmailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #dc2626; }
            .label { font-weight: bold; color: #dc2626; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 New Booking Request</h1>
            </div>
            <div class="content">
              <p>A new booking request has been received!</p>
              
              <div class="info-box">
                <h3>Customer Details:</h3>
                <p><span class="label">Name:</span> ${data.name}</p>
                <p><span class="label">Phone:</span> ${data.phone}</p>
                <p><span class="label">Destination:</span> ${data.destination}</p>
                <p><span class="label">Start Date:</span> ${new Date(data.startDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><span class="label">Number of People:</span> ${data.numberOfPeople}</p>
                ${data.message ? `<p><span class="label">Additional Message:</span><br>${data.message}</p>` : ''}
              </div>
              
              <p><strong>Action Required:</strong> Please contact the customer within 24 hours to confirm the booking details.</p>
              <p><em>Received on: ${new Date().toLocaleString('en-IN')}</em></p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to admin only (ktoktourism@gmail.com)
    await transporter.sendMail({
      from: `"K to K World Bookings" <${process.env.EMAIL_USER}>`,
      to: 'ktoktourism@gmail.com',
      subject: `New Booking Request - ${data.destination}`,
      html: adminEmailHTML,
      replyTo: data.phone,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Booking request sent successfully! We will contact you soon.' 
    });
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process booking request' },
      { status: 500 }
    );
  }
}