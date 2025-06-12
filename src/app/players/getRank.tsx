import { Player } from "../lib/types";

// Change the return type to RankInfo | null
export default function getRank(playerData: Player): { name: string; url: string; } | null {
    if (!playerData?.ranks?.nationRanks) return null;
    
    const rankPriority: Record<string, number> = {
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

    if(playerData.status.isKing){
        return {name: "King", url: "/images/ranks/King.png"};
    }
    else if(playerData.status.isMayor){
        return {name: "Mayor", url: "/images/ranks/Star.svg"};
    }
    
    let highestRankFound: RankInfo | null = null;
    let highestPriority = 0;
    
    playerData.ranks.nationRanks.forEach((rank: string) => {
        if (rankPriority[rank] > highestPriority) {
            highestPriority = rankPriority[rank];
            switch (rank) {
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
    
    // Return the RankInfo object or null
    return highestRankFound;
}