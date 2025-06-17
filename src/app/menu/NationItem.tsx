import { useState, useEffect} from "react";
import { type Nation } from "../lib/types";
import { renderNation } from "../lib/queries";
import TownItem from "./TownItem";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NationItem({ name, uuid}: { name: string, uuid:string}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [nationData, setNationData] = useState<Nation | null>(null);
    const [isRendered, setIsRendered] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(isRendered)
            return;
    }, []);

    function handleExpandClick() : void {
        if(isRendered){
            setIsExpanded(!isExpanded);
        }
        else{
            setLoading(true);
            setError(null);

            renderNation(uuid).then((locationObject) => {
                setNationData(locationObject as Nation);
            }).then(() => {
                setLoading(false);
                setIsRendered(true);
                setIsExpanded(!isExpanded);
            })
        }
    }

    return (
        <div className="flex flex-col p-2">
            <div className="flex gap-2 items-center">
                <div  className={`
                    relative flex items-center gap-2
                    text-2xl font-bold hover:cursor-pointer
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
                    <Link href={`/nation/${uuid}`} className="hover:text-blue1">
                        {name}
                    </Link>
                </div>
            </div>
            <div 
            className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${isExpanded 
                    ? 'max-h-[500px] opacity-100 translate-y-0' 
                    : 'max-h-0 opacity-0 -translate-y-2'
                }
            `}
            >
                {loading && <div className="pl-2">Loading...</div>}
                {error && <div className="pl-2 text-red-500">{error}</div>}
                {nationData && nationData.towns && nationData.towns.length > 0 && (
                <div className="text-gray-400 mb-2">
                    <div className="text-lg italic">Member Towns:</div>
                    {nationData?.towns.map((item: any, index: number) => (
                        <div key={`town-${index}`} className="flex flex-col">
                            <div 
                                className="cursor-pointer hover:text-blue1"
                                >
                                <TownItem
                                    name={item.name}
                                    uuid={item.uuid}
                                    key={`nationItem-town-${item.name}`}
                                ></TownItem>
                            </div>
                        </div>
                    ))}
                </div>
                )}
                {nationData?.towns && nationData.towns.length === 0 && (
                    <div className="pl-2">No towns found</div>
                )}
            </div>
        </div>
    )
}
    