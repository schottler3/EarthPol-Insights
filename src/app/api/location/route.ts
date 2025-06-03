import { FAKECASCADIA, FAKECUBA, FAKEJAPAN, FAKETOWNS, Nation, Town } from "@/app/lib/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) : Promise<Response>{
  try {
    const body = await request.json();
    console.log("Received body:", body);
    
    // Check if body is a string (UUID directly) or an object with query property
    const uuid = typeof body === 'string' ? body : body?.query?.[0];
    
    console.log("Processing UUID:", uuid);
    
    // Handle fake data first
    switch(uuid) {
      case "5eda99c0-e430-4552-abae-4e7604579483":
        return NextResponse.json(FAKECUBA);
      case "93f28b00-51ba-43b2-930f-a63e496317a2": 
        return NextResponse.json(FAKEJAPAN);
      case "e38c9fbc-78d9-4e9b-a90f-870fba949693":
        return NextResponse.json(FAKECASCADIA);
      case "ff50d039-669d-413e-84e0-18c3fd370ea3":
        return NextResponse.json(FAKETOWNS[0]);
      case "47dc1e57-8b5a-4b83-a9d4-7f92c621e9d3":
        return NextResponse.json(FAKETOWNS[1]);
      case "a7c891f6-7d3e-495b-b276-c4a7328ab9e1":
        return NextResponse.json(FAKETOWNS[2]);
      case "f25acd71-9e38-4712-89b4-f24a963c320e":
        return NextResponse.json(FAKETOWNS[3]);
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