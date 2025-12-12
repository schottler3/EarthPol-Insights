"use client"
import { Dispatch, ReactEventHandler, SetStateAction, useEffect, useState } from 'react';
import { getPlayerData, renderSkin } from '../lib/queries';
import { Player } from '../lib/types';

export default function BrowsingAs ({ localUser, setLocalUser }: { localUser: Player | null, setLocalUser: Dispatch<SetStateAction<Player | null>> }){
    const [skinURL, setSkinURL] = useState<string>('');
    const [isPrompting, setIsPrompting] = useState<boolean>(false);

    useEffect(() => {
        const fetchSkinURL = async () => {
            if(localUser?.uuid) {
                setSkinURL(await renderSkin(localUser.uuid))
            }
        }

        fetchSkinURL();
    },[localUser])

    return (
        <div className="flex mr-8 justify-right items-center gap-4 w-full text-white">
            {localUser && !isPrompting ?
            <div className="flex flex-col ">
                <div className="text-blue1 w-max">
                    Browsing As:
                </div>
                <div onClick={() => setIsPrompting(true)} className="hover:cursor-pointer items-center text-2xl flex font-bold rounded-e">
                    {localUser?.name}
                </div> 
            </div>
            :
            (
                isPrompting ?
                <div className="flex flex-col">
                    <h1 className="font-bold select-none">
                        Enter a Username
                    </h1>
                    <input 
                        type="text" 
                        className="italic text-black outline-2 focus:outline-aqua1 p-1" 
                        placeholder="MrTytanic"
                        onKeyDown={async (event) => {
                            if (event.key === 'Enter') {
                                const value = event.currentTarget.value;
                                console.log(`Success! ${value}`);
                                const newUser = await getPlayerData(event.currentTarget.value);
                                setLocalUser(newUser);
                                setIsPrompting(false);
                            }
                        }}
                    />
                </div>
                :
                <h1 className="font-bold hover:cursor-pointer" onClick={() => setIsPrompting(true)}>
                    Login as Player
                </h1>
            )
            }
            <img className="w-16 h-16" src={skinURL || `https://mc-heads.net/avatar/steve` } alt={`${localUser?.name || 'Player'} skin`}></img>
        </div>
    )
}