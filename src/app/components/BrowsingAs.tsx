"use client"
import { useEffect, useState } from 'react';
import { renderSkin } from '../lib/queries';
import { Player } from '../lib/types';

export default function BrowsingAs ({ localUser }: { localUser: Player | null }){
    const [skinURL, setSkinURL] = useState<string>('');

    useEffect(() => {
        const fetchSkinURL = async () => {
            if(localUser?.uuid) {
                setSkinURL(await renderSkin(localUser.uuid))
            }
        }

        fetchSkinURL();
    },[localUser])

    return (
        <div className="flex mr-8 justify-right items-center gap-4">
            <div className="flex flex-col text-white">
                <div className="text-blue1 w-max">
                    Browsing As:
                </div>
                <div className="bg-[] items-center text-2xl flex font-bold rounded-e">
                    {localUser?.name}
                </div> 
            </div>
            <img className="w-16 h-16" src={skinURL || `https://mc-heads.net/avatar/steve` } alt={`${localUser?.name || 'Player'} skin`}></img>
        </div>
    )
}