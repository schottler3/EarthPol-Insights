import { NextResponse } from "next/server";

export async function POST(request: Request) : Promise<Response>{
  try {
    const body = await request.json();
    console.log("Received body:", body);
    
    // Check if body is a string (UUID directly) or an object with query property
    const uuid = typeof body === 'string' ? body : body?.query?.[0];
    
    console.log("Processing UUID:", uuid);

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
      return NextResponse.json(null);
    }
    
    const data = await response.json();
    if (!data) {
      try {
        const townResponse = await fetch('https://api.earthpol.com/astra/towns', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: body.query || []
          }),
          cache: 'no-store',
        });
        
        if (!townResponse.ok) {
          throw new Error(`Error! Status: ${townResponse.status}`);
        }
        
        const townData = await townResponse.json();
        if (!townData) {
          throw new Error('No data found');
        }
        
        return NextResponse.json(townData);
      } catch (error) {
        console.error('Error querying EarthPol towns:', error);
        return NextResponse.json(
          { error: 'Failed to query data from EarthPol API' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error querying EarthPol nations:', error);
    return NextResponse.json(null);
  }
}