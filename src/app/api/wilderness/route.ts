import { NextResponse } from "next/server";

export async function POST(request: Request) : Promise<Response>{
  try {
    const body = await request.json();
    
    // Ensure coordinates are numbers if they exist
    const query = body.query?.map((coord: any) => {
      if (Array.isArray(coord)) {
        return coord.map((c: any) => typeof c === 'string' ? parseFloat(c) : c);
      }
      return typeof coord === 'string' ? parseFloat(coord) : coord;
    }) || [];
    
    const response = await fetch('https://api.earthpol.com/astra/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query
      }),
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.error(`EarthPol API error: ${response.status} ${response.statusText}`);
      console.log('Request body:', { query });
      console.log('Original body:', body);
      return NextResponse.json(
        { error: `External API error: ${response.status}` }, 
        { status: response.status === 520 ? 503 : response.status }
      );
    }
    
    const data = await response.json();
    if (!data) {
      throw new Error('No data found finding wilderness location!');
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error querying EarthPol wilderness location:', error);
    return NextResponse.json(
      { error: 'Failed to query data from EarthPol API' },
      { status: 500 }
    );
  }
}