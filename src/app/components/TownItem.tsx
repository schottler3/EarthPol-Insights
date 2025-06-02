import { useEffect, useState } from "react";
import { Nation, Player, ReactStateHandler, Town } from "../lib/types";
import { renderSkin, renderTown} from "../lib/queries";

export default function TownItem({name, uuid, selectedItem, setSelectedItem}: {name:string, uuid:string, selectedItem:Nation | Town | null, setSelectedItem:ReactStateHandler}) {

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
                
                //const locationObject = await renderTown(uuid, true);
                //console.log("Town data received:", townObject);
                //setTownData(locationObject as Town);
                
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

    function handleTownClick() : void {
        console.log(townData?.name)
        setSelectedItem(townData);
    }

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
                <div onClick={handleTownClick}>
                    {name}
                </div>
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
                            <p>Mayor: {townData.mayor?.name || "None"}</p>
                            {townData.residents && townData.residents.length > 0 && (
                                <div>
                                    <p className="font-semibold mt-2">Residents:</p>
                                    <div className="pl-2 w-min">
                                        {townData.residents.map((resident, index:number) => (
                                            <div onClick={() => handleUserClick(resident.uuid)} key={resident.uuid || `resident-${index}`}>{resident.name}</div>
                                        ))}
                                        {imageData && (
                                            <img 
                                                src={imageData} 
                                                alt="Player avatar"
                                                className="w-8 h-8 mt-1"
                                                onError={(e) => {
                                                    console.log("Image failed to load, using fallback");
                                                    e.currentTarget.src = `https://mc-heads.net/avatar/steve`;
                                                }}
                                            />
                                        )}
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