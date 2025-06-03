import { useEffect, useState } from 'react';
import { Player } from '../lib/types';
import { getPlayerData } from '../lib/queries';

export default function PlayerPage({uuid}: {uuid: string}) {

    const[playerData, setPlayerData] = useState<Player | null>(null);

    useEffect(() => {
        const renderPlayer = async () => {
            const data: Player | null = await getPlayerData(uuid);
            if(data)
                setPlayerData(data);
        }

        renderPlayer();
       
    }, []);
    
    return (
        <div>
            {playerData?.name}
        </div>
    )
}