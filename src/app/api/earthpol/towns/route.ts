import { NextResponse } from 'next/server';

export async function GET() : Promise<Response>{
  try {
    const response = await fetch('https://api.earthpol.com/astra/towns', {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (!data) {
        throw new Error('No data found');
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching EarthPol data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from EarthPol API' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) : Promise<Response>{
  try {
    const body = await request.json();
    
    const response = await fetch('https://api.earthpol.com/astra/towns', {
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
      throw new Error(`Error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    if (!data) {
      throw new Error('No data found');
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error querying EarthPol nations:', error);
    return NextResponse.json(
      { error: 'Failed to query data from EarthPol API' },
      { status: 500 }
    );
  }
}