import { FAKECASCADIA, FAKECUBA, FAKEJAPAN, Nation } from '@/app/lib/types';
import { NextResponse } from 'next/server';

export async function GET() : Promise<Response>{
  try {
    const response = await fetch('https://api.earthpol.com/astra/nations', {
      headers: {
        'Content-Type': 'application/json',
      },
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
    console.error('Error fetching EarthPol data:', error);
    return NextResponse.json(
      null
    );
  }
}

export async function POST(request: Request) : Promise<Response>{
  try {
    const body = await request.json();
    switch(body){
        case "5eda99c0-e430-4552-abae-4e7604579483":
            return NextResponse.json(FAKECUBA);
        case "93f28b00-51ba-43b2-930f-a63e496317a2": 
            return NextResponse.json(FAKEJAPAN);
        case "e38c9fbc-78d9-4e9b-a90f-870fba949693":
            return NextResponse.json(FAKECASCADIA);
    }
    
    const response = await fetch('https://api.earthpol.com/astra/nations', {
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
      );;
    }
    
    const data = await response.json();
    if (!data) {
      console.log('No data found');
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error querying EarthPol nations:', error);
    return NextResponse.json(null);
  }
}