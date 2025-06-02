import { USINGFAKE } from "./types";

/**
 * Verifies if a user has entered the correct code in the game chat
 */
export async function verifyUserFromChat(uuid: string, code: number, timestamp: string): Promise<boolean> {

    if(USINGFAKE)
        return true;

    try {
        const response = await fetch('https://api.earthpol.com/astra/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: {
            uuid: [uuid],
            message: [`${code}`],
            startTimestamp: timestamp
            }
        })
        });
        
        if (!response.ok) return false;
        
        const data = await response.json();
        return data && data.length > 0;
    } catch (error) {
        console.error('Error verifying user from chat:', error);
        return false;
    }
}

/**
 * Verifies if a user is the owner (mayor or king) of a location
 */
export async function verifyUserOwnership(userUUID: string, locationUUID: string): Promise<boolean> {

    if(USINGFAKE)
        return true;

    try {
        // First check if it's a nation
        const nationResponse = await fetch('https://api.earthpol.com/astra/nations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: [locationUUID]
        })
        });
        
        if (nationResponse.ok) {
        const nationData = await nationResponse.json();
        if (nationData && nationData.length > 0) {
            const nation = nationData[0];
            return nation.king?.uuid === userUUID;
        }
        }
        
        // Then check if it's a town
        const townResponse = await fetch('https://api.earthpol.com/astra/towns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: [locationUUID]
        })
        });
        
        if (townResponse.ok) {
        const townData = await townResponse.json();
        if (townData && townData.length > 0) {
            const town = townData[0];
            return town.mayor?.uuid === userUUID;
        }
        }
        
        return false;
    } catch (error) {
        console.error('Error verifying ownership:', error);
        return false;
    }
}