import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const invite = searchParams.get('invite');
    
    // No invite parameter provided
    if (!invite || invite.trim() === '') {
      console.log("No invite parameter provided");
      return new Response(JSON.stringify(null), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    try {
      const apiResponse = await fetch(`https://discord.com/api/v9/invites/${invite}`, {
        headers: {
          'User-Agent': 'EarthPol/1.0 (compatible; Bot)',
        }
      });
      
      if (apiResponse.ok) {
        const apiData = await apiResponse.json();
        
        // Check if guild data exists
        if (!apiData.guild) {
          console.log(`Invalid invite: ${invite} - No guild data`);
          return new Response(JSON.stringify(null), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        const result = {
          guildId: apiData.guild.id,
          serverName: apiData.guild.name,
          imageURL: apiData.guild.icon 
            ? `https://cdn.discordapp.com/icons/${apiData.guild.id}/${apiData.guild.icon}.webp?size=128`
            : null,
          inviteURL: `https://discord.gg/${invite}`
        };

        return NextResponse.json(result);
      } 
      else {
        console.log(`Discord API returned error for invite: ${invite} - Status: ${apiResponse.status}`);
        return new Response(JSON.stringify(null), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } catch (apiError) {
      console.error('Discord API error:', apiError);
      return new Response(JSON.stringify(null), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify(null), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}