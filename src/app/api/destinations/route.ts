import { NextRequest, NextResponse } from 'next/server';
import { getDestinations, createDestination } from '@/lib/firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const homepage = searchParams.get('homepage') === 'true';
    
    let destinations = await getDestinations(featured);
    
    // Filter for homepage if requested
    if (homepage) {
      destinations = destinations.filter(dest => dest.showOnHomepage !== false);
    }
    
    return NextResponse.json({ success: true, data: destinations });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.slug || !data.price) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const id = await createDestination(data);
    return NextResponse.json({ success: true, data: { id } }, { status: 201 });
  } catch (error) {
    console.error('Error creating destination:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create destination' },
      { status: 500 }
    );
  }
}