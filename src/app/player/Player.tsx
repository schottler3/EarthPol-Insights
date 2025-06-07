import { useState, useEffect, ReactElement } from "react";
import { getPlayerData, renderSkin } from "../lib/queries";
import { type Player } from "../lib/types";
import Link from "next/link";
import getRank from "./getRank";

export default function Player({name, uuid}: {name:string, uuid:string}) {

    const [skinURL, setSkinURL] = useState<string>()
    const [playerData, setPlayerData] = useState<Player | null>(null);
    const [highestRank, setHighestRank] = useState<ReactElement | null>(null);

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

    useEffect(() => {
        if(playerData != null)
            setHighestRank(getRank(playerData));
    }, [playerData]);

    return (
        <div className="flex w-max bg-opacity-70 ">
            <img 
                src={skinURL} 
                alt="Player avatar"
                className="w-8 h-8"
                onError={(e) => {
                    console.log("Image failed to load, using fallback");
                    e.currentTarget.src = `https://mc-heads.net/avatar/steve`;
                }}
            />
            <div className="flex items-center">
                <Link className={
                    `max-w-[10vw] px-2 flex items-center h-8 overflow-x-auto bg-charcoal border-y-4 border-blue1 
                    hover:cursor-pointer hover:text-blue1 
                    ${highestRank ? `` : `border-r-4 rounded-r-full`}`
                    }
                    href={`/player?uuid=${uuid}`}
                >
                    {name}
                </Link>
                {highestRank ? highestRank : null}
            </div>
        </div>
    )
}