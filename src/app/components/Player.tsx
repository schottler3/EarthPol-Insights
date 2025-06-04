import { useState, useEffect } from "react";
import { getPlayerData, renderSkin } from "../lib/queries";
import { type Player } from "../lib/types";

export default function Player({name, uuid}: {name:string, uuid:string}) {

    const [skinURL, setSkinURL] = useState<string>()
    const [playerData, setPlayerData] = useState<Player | null>(null);

    useEffect(() => {
        const getSkin = async () => {
            setSkinURL(await renderSkin(uuid))
        }

        const getData = async () => {
            setPlayerData(await getPlayerData(uuid));
        }

        getSkin();
        getData();
    }, [uuid])

    return (
        <div className="flex items-center gap-2 bg-charcoal px-2 w-max bg-opacity-70">
            <img 
                src={skinURL} 
                alt="Player avatar"
                className="w-8 h-8 mt-1"
                onError={(e) => {
                    console.log("Image failed to load, using fallback");
                    e.currentTarget.src = `https://mc-heads.net/avatar/steve`;
                }}
            />
            <h1 className="max-w-[10vw] overflow-x-auto">
                {name}
            </h1>
        </div>
    )
}