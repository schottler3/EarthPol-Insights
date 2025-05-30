import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch('https://api.earthpol.com/astra/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: body.query || []
      }),
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.log(`Error! Status: ${response.status}`);
      return NextResponse.json(
        null
      );
    }
    
    const data = await response.json();
    if (!data) {
      console.log('No data found');
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error querying EarthPol chat:', error);
    return NextResponse.json(
      null
    );
  }
}