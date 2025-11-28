import { NextRequest, NextResponse } from 'next/server';
import { getDestinationBySlug } from '@/lib/firebase/firestore';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const destination = await getDestinationBySlug(slug);
    
    if (!destination) {
      return NextResponse.json(
        { success: false, error: 'Destination not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: destination });
  } catch (error) {
    console.error('Error fetching destination:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch destination' },
      { status: 500 }
    );
  }
}
