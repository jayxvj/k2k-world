import { NextRequest, NextResponse } from 'next/server';
import { getContacts, createContact } from '@/lib/firebase/firestore';
import { sendContactEmail } from '@/lib/email';

export async function GET() {
  try {
    const contacts = await getContacts();
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create contact in database
    const id = await createContact(data);
    
    // Send email notifications immediately
    try {
      await sendContactEmail(data);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Continue even if email fails
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully! We will get back to you soon.',
      data: { id } 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
