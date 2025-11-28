import { NextRequest, NextResponse } from 'next/server';
import { getDestinationById, updateDestination, deleteDestination } from '@/lib/firebase/firestore';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const destination = await getDestinationById(id);
    
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    await updateDestination(id, data);
    return NextResponse.json({ success: true, message: 'Destination updated' });
  } catch (error) {
    console.error('Error updating destination:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update destination' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteDestination(id);
    return NextResponse.json({ success: true, message: 'Destination deleted' });
  } catch (error) {
    console.error('Error deleting destination:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete destination' },
      { status: 500 }
    );
  }
}
