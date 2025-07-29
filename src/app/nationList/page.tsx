"use client"
import { useEffect, useState } from "react";
import NationItem from "./NationItem";
import LoadingLocation from "../components/LoadingLocation";

export default function page() {

    const [nations, setNations] = useState<NationItem[] | null>(null);
    const [renderedNations, setRenderedNations] = useState<NationItem[] | null>(null);
    const [isLoadingNations, setIsLoadingNations] = useState(true);
    const [query, setQuery] = useState<string>("");

    interface NationItem {
        index: number;
        name: string;
        uuid: string;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/nations');
                
                if (!response.ok) {
                    throw new Error(`Error! Status: ${response.status}`);
                }
                
                const result = await response.json();
                result.sort((a:NationItem, b:NationItem) => a.name.localeCompare(b.name));
                setNations(result);
                setRenderedNations(result);
                setIsLoadingNations(false);
            } catch (e) {
                console.log("Failed to get nation data in nationList -- /api/nations")
                setNations([]);
            } finally {
                setIsLoadingNations(false);
            }
        }
        
        fetchData();
    },[])

    useEffect(() => {
        if(query.length > 0){
            setRenderedNations(nations?.filter((nation) => {
                return nation.name.includes(query)
            }) || null)
        } else {
            setRenderedNations(nations)
        }
    }, [query])

    return (
        <div className="m-4 w-full h-full flex flex-col gap-2">
            {
                !isLoadingNations ?
                <>
                    <h1 className="text-white font-bold text-2xl">{`Search Nations(${nations?.length})`}</h1>
                    <div className="bg-gray1 drop-shadow-xl my-4 p-4 gap-8 items-center">
                        <input className="w-1/4 h-[4vh] rounded-md p-1" placeholder="Search nations" type="text" onChange={(e) => setQuery(e.target.value)}></input>
                    </div>
                    {renderedNations && renderedNations.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                            {renderedNations.map((item: NationItem, index: number) => (
                                <NationItem
                                    key={index}
                                    name={item.name}
                                    uuid={item.uuid}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-aqua1 text-xl">
                            No nations found matching "{query}"
                        </div>
                    )}
                </>
                :
                <div className="flex items-center justify-center h-full w-full *:w-1/2">
                    <LoadingLocation />
                </div>
            }
        </div>
    )
}