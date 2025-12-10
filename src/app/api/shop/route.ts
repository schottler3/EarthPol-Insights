import { Player, Shop } from "@/app/lib/types";
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
      const alliesResponse = await getAllAlliesPlayers(body.nation);
      const allies = await alliesResponse.json();
      
      const allyShops = shops.filter((shop: Shop) => {
      for(let playerUuid of allies) {
        if(playerUuid === shop.owner) {
          return true;
        }
      }
      return false;
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

const getAllAlliesPlayers = async (nation: string) => {
  let players: string[] = [];
  try {
    console.log('Getting allies for nation:', nation);
    
    const alliesResponse = await getAllies(nation);
    const allies = await alliesResponse.json();
    //console.log('Allies found:', allies);

    // Check if allies is null or not an array
    if (!allies || !Array.isArray(allies)) {
      console.log('No allies found or allies is not an array, returning user nation players only');
      // Still add user's own nation players
      const userNationResponse = await fetch('https://api.earthpol.com/astra/nations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: [nation]
        }),
        cache: 'no-store',
      });
      
      if (userNationResponse.ok) {
        const userData = await userNationResponse.json();
        if (userData && userData[0] && userData[0].residents) {
          for (let player of userData[0].residents) {
            players.push(player.uuid);
          }
        }
      }
      
      return NextResponse.json(players);
    }

    // Add the user's own nation players first
    const userNationResponse = await fetch('https://api.earthpol.com/astra/nations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: [nation]
      }),
      cache: 'no-store',
    });
    
    if (userNationResponse.ok) {
      const userData = await userNationResponse.json();
      if (userData && userData[0] && userData[0].residents) {
        for (let player of userData[0].residents) {
          players.push(player.uuid);
        }
      }
    }

    // Then add allied nation players  
    for (let ally of allies) {
      const response = await fetch('https://api.earthpol.com/astra/nations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: [ally.uuid]
        }),
        cache: 'no-store',
      });
      
      if (!response.ok) {
        console.log(`Error fetching ally nation ${ally}! Status: ${response.status}`);
        continue;
      }
      
      const data = await response.json();
      if (!data || !data[0]) {
        console.log(`No nation data found for ally: ${ally}`);
        continue;
      }
      
      for (let player of data[0].residents || []) {
        players.push(player.uuid);
      }
    }
    
    console.log('Total players found:', players.length);
    return NextResponse.json(players);
  } catch (error) {
    console.error('Error in getAllAlliesPlayers:', error);
    return NextResponse.json([]);
  }
}