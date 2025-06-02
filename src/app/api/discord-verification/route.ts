import { NextResponse } from 'next/server';
import { adminDb } from '../firebase-admin';
import { verifyUserFromChat, verifyUserOwnership } from '../../lib/verification';

export async function POST(request: Request) {
  try {
    const { uuid, locationUUID, code, timestamp, discordLink } = await request.json();
    
    // Validate inputs
    if (!uuid || !locationUUID || !code || !timestamp || !discordLink) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Check if there's a valid verification session
    const verificationRef = adminDb.collection('verifications').doc(uuid);
    const verificationDoc = await verificationRef.get();
    
    if (!verificationDoc.exists) {
      return NextResponse.json({ error: 'No verification session found' }, { status: 403 });
    }
    
    const verificationData = verificationDoc.data();
    if (!verificationData) {
      return NextResponse.json({ error: 'Verification data is missing' }, { status: 403 });
    }
    
    // Verify the code and timestamp match what was generated

    if (
      verificationData.code !== code || 
      verificationData.timestamp !== timestamp ||
      verificationData.locationUUID !== locationUUID ||
      new Date() > new Date(verificationData.expiresAt)
    ) {
      return NextResponse.json({ error: 'Invalid or expired verification code' }, { status: 403 });
    }
    
    // 1. First verify the user's game identity with the code
    const isVerified = await verifyUserFromChat(uuid, code, timestamp);
    if (!isVerified) {
      return NextResponse.json({ error: 'User verification failed' }, { status: 403 });
    }
    
    // 2. Then verify ownership of the location
    const isOwner = await verifyUserOwnership(uuid, locationUUID);
    if (!isOwner) {
      return NextResponse.json({ error: 'User is not the owner of this location' }, { status: 403 });
    }
    
    // 3. If both checks pass, write to the database
    await adminDb.collection('discord').doc(locationUUID).set({ 
      discord: discordLink,
      updatedAt: new Date().toISOString(),
      updatedBy: uuid
    });
    
    // 4. Clean up the verification record
    await verificationRef.delete();
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error in discord verification:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}