import { useState, useEffect, ReactElement } from "react";
import { getPlayerData, renderSkin } from "../lib/queries";
import { type Player } from "../lib/types";

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
        const getRank = (): ReactElement | null => {
            if (!playerData?.ranks?.nationRanks) return null;
            
            const rankPriority: Record<string, number> = {
                "king": 6,
                "co-leader": 5,
                "minister": 4,
                "general": 3,
                "recruiter": 2,
                "soldier": 1
            };
            
            interface RankInfo {
                name: string;
                url: string;
            }
            
            let highestRankFound: RankInfo | null = null;
            let highestPriority = 0;
            
            playerData.ranks.nationRanks.forEach((rank: string) => {
                if (rankPriority[rank] > highestPriority) {
                    highestPriority = rankPriority[rank];
                    switch (rank) {
                        case "king":
                            highestRankFound = {name: "King", url: "/images/ranks/King.png"};
                            break;
                        case "co-leader":
                            highestRankFound = {name: "Co-leader", url: "/images/ranks/Queen.png"};
                            break;
                        case "minister": 
                            highestRankFound = {name: "Minister", url: "/images/ranks/Bishop.png"};
                            break;
                        case "general": 
                            highestRankFound = {name: "General", url: "/images/ranks/Knight.png"};
                            break;
                        case "recruiter": 
                            highestRankFound = {name: "Recruiter", url: "/images/ranks/Rook.png"};
                            break;
                        case "soldier": 
                            highestRankFound = {name: "Soldier", url: "/images/ranks/Pawn.png"};
                            break;
                    }
                }
            });
            
            if (!highestRankFound) return null;
            const { url, name: rankName } = highestRankFound;
            return (
                <div className="has-tooltip bg-aqua1 rounded-r-full pr-1">
                    <span className="tooltip -mt-6">{rankName}</span>
                    <img className="w-8 h-auto aspect-square hover:cursor-pointer" src={url} alt={rankName}/>
                </div>
            );
        };

        setHighestRank(getRank());
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
                <h1 className={`max-w-[10vw] px-2 flex items-center h-8 overflow-x-auto bg-charcoal border-y-4 border-blue1 ${highestRank ? `` : `border-r-4 rounded-r-full`}`}>
                    {name}
                </h1>
                {highestRank ? highestRank : null}
            </div>
        </div>
    )
}