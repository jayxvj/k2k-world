import { NextRequest, NextResponse } from 'next/server';
import { getCustomRequests, createCustomRequest } from '@/lib/firebase/firestore';
import { sendCustomRequestEmail } from '@/lib/email';

export async function GET() {
  try {
    const requests = await getCustomRequests();
    return NextResponse.json({ success: true, data: requests });
  } catch (error) {
    console.error('Error fetching custom requests:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch custom requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.destination) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    let firestoreSuccess = false;
    let emailSuccess = false;
    let firestoreError = null;
    let emailError = null;
    
    // Try to create request in database
    try {
      await createCustomRequest(data);
      firestoreSuccess = true;
      console.log('✅ Custom request saved to Firestore');
    } catch (error: any) {
      firestoreError = error.message || 'Database error';
      console.error('❌ Firestore Error:', error);
      
      // Check for specific Firebase errors
      if (error.message?.includes('PERMISSION_DENIED') || error.message?.includes('not been used')) {
        firestoreError = 'Firebase Firestore API is not enabled. Please enable it in Firebase Console.';
      }
    }
    
    // Try to send email notifications (regardless of database status)
    try {
      await sendCustomRequestEmail(data);
      emailSuccess = true;
      console.log('✅ Confirmation email sent successfully');
    } catch (error: any) {
      emailError = error.message || 'Email error';
      console.error('❌ Email Error:', error);
      
      // Check for specific email errors
      if (error.message?.includes('Invalid login') || error.message?.includes('authentication')) {
        emailError = 'Email service is not configured. Please check EMAIL_USER and EMAIL_PASSWORD in .env.local';
      }
    }
    
    // Determine response based on what succeeded
    if (emailSuccess) {
      // If email sent successfully, we can proceed (even if database failed)
      return NextResponse.json({ 
        success: true, 
        message: 'Request submitted successfully! Check your email for confirmation.',
        warnings: firestoreSuccess ? [] : ['Database save failed, but email was sent']
      }, { status: 201 });
    } else if (firestoreSuccess) {
      // If database succeeded but email failed
      return NextResponse.json({ 
        success: true, 
        message: 'Request submitted successfully! However, confirmation email could not be sent.',
        warnings: ['Email notification failed: ' + emailError]
      }, { status: 201 });
    } else {
      // Both failed - return error
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to submit request. Please try again or contact us directly.',
          details: {
            database: firestoreError,
            email: emailError
          }
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('❌ Unexpected error in custom request:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}