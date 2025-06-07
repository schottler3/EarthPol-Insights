import { useEffect, useState } from "react";
import { Nation, ReactStateHandler, Town } from "../lib/types";
import { renderSkin, renderTown} from "../lib/queries";
import Player from "../player/Player";
import Link from "next/link";

export default function TownItem({name, uuid}: {name:string, uuid:string}) {

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [players, setPlayers] = useState<{"name": string, "uuid":string}[] | null>(null);
    const [isRendered, setIsRendered] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [townData, setTownData] = useState<Town | null>(null);
    const [imageData, setImageData] = useState<string | null>(null);
    
    useEffect(() => {
        if(isRendered) return;
        
        const fetchTownData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const locationObject = await renderTown(uuid, true);
                console.log("Town data received:", locationObject);
                setTownData(locationObject as Town);
                
            } catch (err) {
                console.error("Error fetching town data:", err);
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
                setIsRendered(true);
            }
        };
        
        fetchTownData();
    }, [name, isRendered]);
    
    function handleExpandClick() : void {
        setIsExpanded(!isExpanded);
    }

    async function handleUserClick(uuid: string) {
        console.log("Clicked UUID:", uuid);
        setImageData(await renderSkin(uuid));
}

    return (
        <div className="mb-2">
            <div className={`
                relative flex items-center gap-2
                text-md font-bold hover:cursor-pointer
                ${isExpanded ? 'text-aqua1' : 'text-white hover:text-blue1'}
            `}>
                <svg 
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    onClick={handleExpandClick}
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                <Link href={`/town?uuid=${uuid}`} className="hover:text-blue1">
                    {name}
                </Link>
            </div>
            
            {isExpanded && (
                <div className="pl-6 mt-1">
                    {loading ? (
                        <div className="text-gray-400">Loading town data...</div>
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : !townData ? (
                        <div className="text-gray-400">No town data available</div>
                    ) : (
                        <div className="text-white">
                            <p>Mayor:</p>
                            <Player
                                key={`${townData.name}-mayor-${townData.mayor.uuid}`}
                                name={townData.mayor.name}
                                uuid={townData.mayor.uuid}
                            >
                            </Player>
                            {townData.residents && townData.residents.length > 0 && (
                                <div>
                                    <p className="font-semibold mt-2">Residents:</p>
                                    <div className="flex flex-col gap-4">
                                        {townData.residents?.map((resident: {name: string, uuid: string}) => (
                                            <Player
                                                key={`${townData.name}-resident-${resident.uuid}`}
                                                name={resident.name}
                                                uuid={resident.uuid}
                                            >
                                            </Player>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}