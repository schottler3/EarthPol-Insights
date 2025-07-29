
import { NextResponse } from 'next/server';

export async function GET() : Promise<NextResponse>{
  try {
    const response = await fetch('https://api.earthpol.com/astra/', {
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
        console.log('No data found -- Endpoints');
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching EarthPol data:', error);
    return NextResponse.json(
      null
    );
  }
}