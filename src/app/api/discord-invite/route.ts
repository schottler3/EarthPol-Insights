import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const invite = searchParams.get('invite');
    
    try {
      const apiResponse = await fetch(`https://discord.com/api/v9/invites/${invite}`, {
        headers: {
          'User-Agent': 'EarthPol/1.0 (compatible; Bot)',
        }
      });
      
      if (apiResponse.ok) {
        const apiData = await apiResponse.json();
        
        const result = {
          guildId: apiData.guild?.id,
          serverName: apiData.guild?.name,
          imageURL: apiData.guild?.icon 
            ? `https://cdn.discordapp.com/icons/${apiData.guild.id}/${apiData.guild.icon}.webp?size=128`
            : null,
          inviteURL: `https://discord.gg/${invite}`
        };

        return NextResponse.json(result);
      }
    } catch (apiError) {
      console.error('Discord API error:', apiError);
      return NextResponse.json({ error: 'Discord API error' }, { status: 500 });
    }
    
    // Handle case where apiResponse.ok is false
    return NextResponse.json({ error: 'Invalid invite' }, { status: 400 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}