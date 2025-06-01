import { NextResponse } from "next/server";
import { adminDb } from "../firebase-admin";

export async function POST(request: Request) {
  try {
    // Check if request body exists
    const body = await request.json().catch(() => ({}));
    const { locationUUID } = body;
    
    if (!locationUUID) {
      return NextResponse.json({ error: 'Missing locationUUID' }, { status: 400 });
    }

    const locationRef = adminDb.collection('discord').doc(locationUUID);
    const docSnapshot = await locationRef.get();
    
    if (!docSnapshot.exists) {
      return NextResponse.json({ discord: null }, { status: 200 }); // Return null instead of 404
    }
    
    const data = docSnapshot.data();
    return NextResponse.json({ discord: data?.discord });
  } catch(e) {
    // Use a safer error logging approach
    console.error('Error retrieving discord link:', e instanceof Error ? e.message : 'Unknown error');
    return NextResponse.json({ error: 'Failed to retrieve discord link' }, { status: 500 });
  }
}