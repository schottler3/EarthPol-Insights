import { Shop } from "@/app/lib/types";
import { NextResponse } from "next/server";

export async function GET() : Promise<NextResponse>{
  try {
    return await getShops();
  } catch (error) {
      console.error('Error fetching EarthPol data:', error);
      return NextResponse.json(
        null
      );
  }
}

export async function POST(request: Request) : Promise<NextResponse>{
  try {
    const body = await request.json();

    if(body.nation && body.filter === 'allies'){
      const response = await fetch('https://api.earthpol.com/astra/shops', {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      
      if (!response.ok) {
        return NextResponse.json(null);
      }
      
      const shops = await response.json();
      const alliesResponse = await getAllies(body.nation.uuid);
      const allies = await alliesResponse.json();
      
      const allyShops = shops.filter((shop: Shop) => {
        return allies.includes(shop.owner);
      });

      return NextResponse.json(allyShops);
    }
    else{
      const response = await fetch('https://api.earthpol.com/astra/shops', {
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
        console.log(body)
        console.log(response)
        return NextResponse.json(null);
      }
      
      const data = await response.json();
      if (!data) {
        throw new Error('No data found');
      }
      
      return NextResponse.json(data);
    }

  } catch (error) {
    console.error('Error querying EarthPol shops:', error);
    return NextResponse.json(
      { error: 'Failed to query data from EarthPol API' },
      { status: 500 }
    );
  }
}

const getShops = async () => {
  const response = await fetch('https://api.earthpol.com/astra/shops', {
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
        return NextResponse.json(null);
    }
    return NextResponse.json(data);
}

const getAllies = async (uuid: string) => {
  try {
    const response = await fetch('https://api.earthpol.com/astra/nations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: [uuid]
      }),
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.log(`Error! Status: ${response.status}`);
      return NextResponse.json(null);
    }
    
    const data = await response.json();
    if (!data || !data[0]) {
      console.log('No nation data found');
      return NextResponse.json([]);
    }
    
    return NextResponse.json(data[0].allies || []);
  } catch (error) {
    console.error('Error querying EarthPol nations:', error);
    return NextResponse.json([]);
  }
}

const getAllAlliesPlayers = async (uuid: string) => {
  let players: string[] = [];
  try {
    const alliesResponse = await getAllies(uuid);
    const allies = await alliesResponse.json();

    for (let ally of allies) {
      const response = await fetch('https://api.earthpol.com/astra/nations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: [ally]
        }),
        cache: 'no-store',
      });
      
      if (!response.ok) {
        console.log(`Error! Status: ${response.status}`);
        continue;
      }
      
      const data = await response.json();
      if (!data || !data[0]) {
        console.log('No nation data found');
        continue;
      }
      
      for (let player of data[0].residents || []) {
        players.push(player.uuid);
      }
    }
    
    return NextResponse.json(players);
  } catch (error) {
    console.error('Error querying EarthPol nations:', error);
    return NextResponse.json([]);
  }
}