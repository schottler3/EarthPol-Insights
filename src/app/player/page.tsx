"use client"
import { ReactElement, useEffect, useState } from 'react';
import { Player } from '../lib/types';
import { getPlayerData, renderSkin } from '../lib/queries';
import { useSearchParams } from 'next/navigation';
import getRank from './getRank';
import LocationItem from '../location/LocationItem';

export default function page() {

    const params = useSearchParams();
    const uuid = params.get('uuid');
    const [skinURL, setSkinURL] = useState<string>()
    const [playerData, setPlayerData] = useState<Player | null>(null);
    const [highestRank, setHighestRank] = useState<{name: string, url: string} | null>(null);

    useEffect(() => {
        const renderPlayer = async () => {
            if(uuid){
                const data: Player | null = await getPlayerData(uuid);
                if(data){
                    setPlayerData(data);
                    setHighestRank(getRank(data))
                }
                setSkinURL(await renderSkin(uuid))
            }
        }

        renderPlayer();
       
    }, []);
    
    return (
        <div className="grid grid-cols-2 pt-16">
            <div className="flex flex-col gap-8 ml-8">
                <div className="flex flex-row items-center rounded-md">
                    <h1 className="text-white text-4xl">
                        {playerData?.name}
                    </h1>
                    <div className="has-tooltip hover:cursor-pointer">
                        <span className="tooltip text-white -mt-6">{highestRank?.name}</span>
                        <img className="w-12 h-12 -mt-1" src={highestRank?.url}></img>
                    </div>
                </div>
                <div className="flex bg-gray1 w-1/2 rounded-md bg-opacity-80 gap-8 ">
                    <img 
                        src={skinURL} 
                        alt="Player avatar"
                        className="w-32 h-32 p-2 bg-blue1"
                        onError={(e) => {
                            console.log("Image failed to load, using fallback");
                            e.currentTarget.src = `https://mc-heads.net/avatar/steve`;
                        }}
                    />
                    <div className="flex flex-row items-center justify-evenly w-full">
                        {playerData?.nation ? (
                            <div className="flex flex-col items-center gap-2">
                                <h1 className="text-2xl font-bold text-blue1">
                                    Nation
                                </h1>
                                <LocationItem
                                    name={playerData.nation.name}
                                    uuid={playerData.nation.uuid}
                                ></LocationItem>
                            </div>
                        ) : null}
                        {playerData?.town ? (
                            <div className="flex flex-col items-center gap-2">
                                <h1 className="text-2xl font-bold text-blue1">
                                    Town
                                </h1>
                                <LocationItem
                                    name={playerData.town.name}
                                    uuid={playerData.town.uuid}
                                ></LocationItem>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <div>

            </div>
           
        </div>
    )
}