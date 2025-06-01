import {FAKENATION, FAKETOWN, Nation, Player, Town, USINGFAKE } from "./types";

export const renderNation = async (query: string): Promise<Nation | null> => {
    if(USINGFAKE){
        const nat : Nation = FAKENATION[0] as any;
        return nat;
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
            console.log(`Error fetching nation data. Status: ${response.status}`);
            return null;
        }
        
        const nationDataInc = await response.json();

        const nationObject = nationDataInc[0];
        return nationObject;
    } catch (error: any) {
        console.log(error);
        return null;
    }
};

export const renderTown = async (query: string): Promise<Town> => {
    if(USINGFAKE){
        return FAKETOWN[0] as any;
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
            throw new Error(`Error fetching town data. Status: ${response.status}`);
        }
        
        const townDataInc = await response.json();

        const townObject = townDataInc[0];
        return townObject;
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

export const checkDiscord = async (locationUUID: string): Promise<string | null> => {
  try {
    if (!locationUUID) {
      console.error("Missing locationUUID parameter");
      return "";
    }
    
    const response = await fetch('/api/discord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ locationUUID }) // Make sure locationUUID is properly passed
    });

    if (!response.ok) {
      console.error(`Error fetching discord link. Status: ${response.status}`);
      return "";
    }

    const data = await response.json();
    return data.discord;
  } catch (error) {
    console.error("Error checking discord:", error);
    return "";
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

