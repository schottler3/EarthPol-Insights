"use client"
import { ReactElement, useEffect, useState } from 'react';
import { Player } from '../lib/types';
import { getPlayerData } from '../lib/queries';
import { useSearchParams } from 'next/navigation';

export default function page() {

    const params = useSearchParams();
    const uuid = params.get('uuid');
    const [skinURL, setSkinURL] = useState<string>()
    const [playerData, setPlayerData] = useState<Player | null>(null);
    const [highestRank, setHighestRank] = useState<ReactElement | null>(null);

    useEffect(() => {
        const renderPlayer = async () => {
            if(uuid){
                const data: Player | null = await getPlayerData(uuid);
                if(data)
                    setPlayerData(data);
            }
        }

        renderPlayer();
       
    }, []);
    
    return (
        <div>
            <h1 className="text-white">
                {playerData?.name}
            </h1>
        </div>
    )
}