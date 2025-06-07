import { ReactElement } from "react";
import { Player } from "../lib/types";

export default function getRank(playerData: Player): ReactElement | null {
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