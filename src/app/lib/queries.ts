import {Invite, Nation, Player, Town, Shop, EndpointData, Wilderness } from "./types";

export const getEndpoints = async (): Promise<EndpointData | null> => {
    try {
        const response = await fetch(`/api/endpoints`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`Error fetching endpoints data -- query. Status: ${response.status}`);
            return null;
        }
        
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error fetching shops data:', error);
        return null;
    }
};

export const renderLocation = async (query: string, town: boolean | null): Promise<Town | Nation | null> => {
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

export const getWildernessInfo = async(x: number, y:number) : Promise<Wilderness | null> => {
    try {
        console.log(`Fetching wilderness info for coordinates: ${x}, ${y}`);
        
        const response = await fetch('/api/wilderness', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: [[x, y]] 
            })
        });
        
        if (!response.ok) {
            console.error(`Wilderness API error - Status: ${response.status}, Coordinates: ${x}, ${y}`);
            return null;
        }
        
        const wildernessData = await response.json();
        console.log('Wilderness data received:', wildernessData);

        return wildernessData[0] || null;
    } catch (error: any) {
        console.error('Error in getWildernessInfo:', error);
        return null;
    }
}

export const renderNation = async (query: string): Promise<Nation | null> => {
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

export const renderTown = async (query: string): Promise<Town | null> => {
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

export const renderShops = async (): Promise<Shop[] | null> => {
    try {
        const response = await fetch(`/api/shop`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`Error fetching shops data. Status: ${response.status}`);
            return null;
        }
        
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error fetching shops data:', error);
        return null;
    }
};

export const renderAllyShops = async (uuid: string): Promise<Shop[] | null> => {
    try {
        const response = await fetch(`/api/shop`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nation: uuid,
                filter: 'allies'
            })
        });

        if (!response.ok) {
            console.error(`Error fetching ally shops data. Status: ${response.status}`);
            return null;
        }
        
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error fetching ally shops data:', error);
        return null;
    }
};

export const renderPlayerShop = async (query: string): Promise<Shop | null> => {

    console.log("Query : " + query)

    try {
        const response = await fetch('/api/shop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: [query]
            }),
        });

        if(response.status === 500){
            console.log(response);
            return null;
        }
        if (!response.ok) {
            throw new Error(`Error fetching shop data. Status: ${response.status}`);
        }
        
        const shopData = await response.json();

        return shopData[0];
    } catch (error: any) {
        console.error('Error fetching player shop data:', error);
        return null;
    }
};

export const renderPlayerShops = async (query: string): Promise<Shop[] | null> => {
    try {
        const response = await fetch('/api/shop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: [query]
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Error fetching shops data. Status: ${response.status}`);
        }

        
        const shopsData = await response.json();

        return shopsData[0];
    } catch (error: any) {
        return null;
    }
};

export const renderSkin = async(uuid: string): Promise<string> => {
    try {
        const crafatarUrl = `https://mc-heads.net/avatar/${uuid}`;

        //console.log("Getting uuid: " + uuid);
        
        if (!uuid || uuid.length < 32) {
            return `https://mc-heads.net/avatar/steve`;
        }

        //console.log(crafatarUrl)
        
        return crafatarUrl;
    } catch (error) {
        console.error("Error fetching player skin:", error);
        return `https://mc-heads.net/avatar/steve`;
    }
};

export const getAllPlayerData = async() : Promise<Player[] | null> => {
    try {
        const response = await fetch(`/api/players`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`Error fetching players data. Status: ${response.status}`);
            return null;
        }
        
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error fetching players data:', error);
        return null;
    }
}

export const getPlayerData = async(query: string) : Promise<Player | null> => {
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

export const getOnlinePlayers = async() : Promise<Player[] | null> => {
    try {
        const response = await fetch('/api/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: ['online']
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Error fetching online player data. Status: ${response.status}`);
        }
        
        const playerData = await response.json();

        return playerData;
    } catch (error: any) {
        return error;
    }
}

export const getDiscordSrc = async (invite: string): Promise<Invite | null> => {
  try {
    if (!invite) return null;

    // Extract invite code if full URL is provided
    let inviteCode = invite;
    if (invite.includes('/')) {
      const inviteSplit = invite.split('/');
      inviteCode = inviteSplit[inviteSplit.length-1];
    }

    const response = await fetch(`/api/discord-invite?invite=${inviteCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching discord invite:', error);
    return null;
  }
};

export const verifyUser = async(uuid: string, code:number, time:string) : Promise<boolean> => {
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

