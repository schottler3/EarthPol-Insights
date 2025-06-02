import { FAKECASCADIA, FAKECUBA, FAKEJAPAN } from "@/app/lib/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) : Promise<Response>{
  try {
    const body = await request.json();
    console.log(body);
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