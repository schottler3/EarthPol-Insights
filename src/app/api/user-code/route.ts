import { NextResponse } from 'next/server';
import { adminDb } from '../firebase-admin';

export async function POST(request: Request) {
  try {
    const { uuid, locationUUID } = await request.json();
    
    if (!uuid || !locationUUID) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Generate a random code
    const code = Math.floor(Math.random() * 90000) + 10000;
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    
    // Store in Firestore with expiration
    await adminDb.collection('verifications').doc(uuid).set({
      code,
      timestamp,
      locationUUID,
      expiresAt: new Date(Date.now() + 60000).toISOString() // 1 minute expiration
    });
    
    return NextResponse.json({ code, timestamp });
  } catch (error) {
    console.error('Error generating verification code:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}