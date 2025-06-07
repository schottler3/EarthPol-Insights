import { adminDb } from "../api/firebase-admin";
import { getDiscord } from "../databasing";
import {FAKECUBA, FAKECASCADIA, FAKEJAPAN, FAKETOWN, Invite, Nation, Player, Town, USINGFAKE, FAKETOWNS, FAKEPLAYERS } from "./types";

export const renderLocation = async (query: string, town: boolean | null): Promise<Town | Nation | null> => {
    switch(query){
        case "5eda99c0-e430-4552-abae-4e7604579483":
            return FAKECUBA as Nation;
        case "93f28b00-51ba-43b2-930f-a63e496317a2": 
            return FAKEJAPAN as Nation;
        case "e38c9fbc-78d9-4e9b-a90f-870fba949693":
            return FAKECASCADIA as Nation;
        // Havana (Cuba's capital)
        case "ff50d039-669d-413e-84e0-18c3fd370ea3":
            return FAKETOWNS[0] as Town;
        // Tokyo (Japan's capital)
        case "47dc1e57-8b5a-4b83-a9d4-7f92c621e9d3":
            return FAKETOWNS[1] as Town;
        // Portland (Cascadia's capital)
        case "a7c891f6-7d3e-495b-b276-c4a7328ab9e1":
            return FAKETOWNS[2] as Town;
        // Seattle (Cascadia town)
        case "f25acd71-9e38-4712-89b4-f24a963c320e":
            return FAKETOWNS[3] as Town;
    }

    try {
        const response = await fetch('/api/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: [query]
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Error fetching location data. Status: ${response.status}`);
        }
        
        const locationData = await response.json();

        return locationData[0];
    } catch (error: any) {
        return error;
    }
};

export const renderNation = async (query: string, town: boolean | null): Promise<Town | Nation | null> => {
    switch(query){
        case "5eda99c0-e430-4552-abae-4e7604579483":
            return FAKECUBA as Nation;
        case "93f28b00-51ba-43b2-930f-a63e496317a2": 
            return FAKEJAPAN as Nation;
        case "e38c9fbc-78d9-4e9b-a90f-870fba949693":
            return FAKECASCADIA as Nation;
    }

    try {
        const response = await fetch('/api/nations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: [query]
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Error fetching location data. Status: ${response.status}`);
        }
        
        const locationData = await response.json();

        return locationData[0];
    } catch (error: any) {
        return error;
    }
};

export const renderTown = async (query: string, town: boolean | null): Promise<Town | Nation | null> => {
    switch(query) {
        // Havana (Cuba's capital)
        case "ff50d039-669d-413e-84e0-18c3fd370ea3":
            return FAKETOWNS[0] as Town;
        // Tokyo (Japan's capital)
        case "47dc1e57-8b5a-4b83-a9d4-7f92c621e9d3":
            return FAKETOWNS[1] as Town;
        // Portland (Cascadia's capital)
        case "a7c891f6-7d3e-495b-b276-c4a7328ab9e1":
            return FAKETOWNS[2] as Town;
        // Seattle (Cascadia town)
        case "f25acd71-9e38-4712-89b4-f24a963c320e":
            return FAKETOWNS[3] as Town;
    }

    try {
        const response = await fetch('/api/towns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: [query]
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Error fetching location data. Status: ${response.status}`);
        }
        
        const locationData = await response.json();

        return locationData[0];
    } catch (error: any) {
        return error;
    }
};

export const renderSkin = async(uuid: string): Promise<string> => {
    try {
            
        const crafatarUrl = `https://crafatar.com/avatars/${uuid}?overlay`;

        return`https://crafatar.com/avatars/${uuid}?overlay`;

    } catch (error) {
        console.error("Error fetching player:", error);
        return`https://mc-heads.net/avatar/steve`;
    }
};

export const getPlayerData = async(query: string) : Promise<Player | null> => {

    if(USINGFAKE){
        switch(query){
            case "9a2657ea-e15c-4469-8886-6c101151eff0":
                return FAKEPLAYERS[0] as Player;
            case "b71c2a48-3f76-49a2-9e4c-b9826376a8f2":
                return FAKEPLAYERS[1] as Player;
            case "cba82d5-94fa-42f8-b7a7-83d9c06e3f6b":
                return FAKEPLAYERS[2] as Player;
            case "29e47b48-c631-4958-b07e-814e218ab5a9":
                return FAKEPLAYERS[3] as Player;
            case "753cb829-69c4-48c5-9432-8dfa12631d7f":
                return FAKEPLAYERS[4] as Player;
            case "SakuraSan":
                return FAKEPLAYERS[1] as Player;
            default:
                return null;
        }
    }
    else{
        try {
            const response = await fetch('/api/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: [query]
                }),
            });
            
            if (!response.ok) {
                throw new Error(`Error fetching player data. Status: ${response.status}`);
            }
            
            const playerData = await response.json();

            return playerData[0];
        } catch (error: any) {
            return error;
        }
    }
}

export const checkDiscord = async (locationUUID: string) : Promise<string | null> => {
    if (!locationUUID) {
      console.error("Missing locationUUID parameter");
      return "";
    }
    
    const discord: string | null = await getDiscord(locationUUID);

    return discord;
};

export const getDiscordSrc = async (invite: string): Promise<Invite | null> => {
  try {
    if (!invite) return null;

    // Extract invite code if full URL is provided
    let inviteCode = invite;
    if (invite.includes('/')) {
      const inviteSplit = invite.split('/');
      inviteCode = inviteSplit[inviteSplit.length-1];
    }

    // Use your own API endpoint as a proxy instead of calling Discord directly
    const response = await fetch(`/api/discord-invite?invite=${inviteCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`Error fetching invite data. Status: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching discord data:', error);
    return null;
  }
};

export const verifyUser = async(uuid: string, code:number, time:string) : Promise<boolean> => {
    if(USINGFAKE){
        return false;
    }  

    let query = 
    {
        "query": {
            "uuid": [`${uuid}`],
            "message": [`${code}`],
            "startTimestamp": time,
        }
    }

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: [query]
            }),
        });
        
        if (!response.ok) {
            console.log(`Error fetching town data. Status: ${response.status}`);
            return false;
        }
        
        const chatData = await response.json();

        const chatBoolean = chatData[0];
        return chatBoolean;
    } catch (error: any) {
        return false;
    }
}

