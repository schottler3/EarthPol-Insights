import { adminDb } from "../api/firebase-admin";
import { getDiscord } from "../databasing";
import {FAKECUBA, FAKECASCADIA, FAKEJAPAN, FAKETOWN, Invite, Nation, Player, Town, USINGFAKE } from "./types";

export const renderLocation = async (query: string, town: boolean | null): Promise<Town | Nation | null> => {
    switch(query){
        case "5eda99c0-e430-4552-abae-4e7604579483":
            return FAKECUBA as Nation;
        case "93f28b00-51ba-43b2-930f-a63e496317a2": 
            return FAKEJAPAN as Nation;
        case "e38c9fbc-78d9-4e9b-a90f-870fba949693":
            return FAKECASCADIA as Nation;
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
    switch(query){
        case "Cuba":
            return FAKECUBA as unknown as Nation;
        case "Japan": 
            return FAKEJAPAN as unknown as Nation;
        case "Cascadia":
            return FAKECASCADIA as unknown as Nation;
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
        return true;
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

