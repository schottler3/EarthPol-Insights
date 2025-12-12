"use client"
import { useEffect, useState } from "react";
import LoadingLocation from "../components/LoadingLocation";
import TownItem from "./TownItem";

export default function page() {

    const [towns, setTowns] = useState<TownItem[] | null>(null);
    const [renderedTowns, setRenderedTowns] = useState<TownItem[] | null>(null);
    const [isLoadingTowns, setIsLoadingTowns] = useState(true);
    const [query, setQuery] = useState<string>("");

    interface TownItem {
        index: number;
        name: string;
        uuid: string;
    }

    useEffect(() => {
    const fetchData = async (retries = 3) => {
        try {
            const response = await fetch('/api/towns');
            
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            
            const result = await response.json();
            result.sort((a:TownItem, b:TownItem) => (a.name.toLowerCase()).localeCompare(b.name.toLowerCase()));
            setTowns(result);
            setRenderedTowns(result);
        } catch (e) {
            if (retries > 0) {
                console.log(`Retrying... ${retries} attempts left`);
                setTimeout(() => fetchData(retries - 1), 2000);
                return;
            }
            console.log("Failed to get town data in townList -- /api/towns", e);
            setTowns([]);
            setRenderedTowns([]);
        } finally {
            setIsLoadingTowns(false);
        }
    }
    
    fetchData();
},[])

    useEffect(() => {
        if(query.length > 0){
            setRenderedTowns(towns?.filter((town) => {
                return town.name.toLowerCase().includes(query.toLowerCase())
            }) || null)
        } else {
            setRenderedTowns(towns)
        }
    }, [query])

    return (
    <div className="m-4 w-full h-full flex flex-col gap-2">
        {
            !isLoadingTowns ?
            <>
                <h1 className="text-white font-bold text-2xl">{`Search Towns(${towns?.length})`}</h1>
                <div className="bg-gray1 drop-shadow-xl my-4 p-4 gap-8 items-center">
                    <input className="w-1/2 md:1/4 h-[4vh] rounded-md p-1" placeholder="Search Towns" type="text" onChange={(e) => setQuery(e.target.value)}></input>
                </div>
                {renderedTowns && renderedTowns.length > 0 ? ( // Show results if any
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                        {renderedTowns.map((item: TownItem, index: number) => (
                            <TownItem
                                key={index}
                                name={item.name}
                                uuid={item.uuid}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-aqua1 text-xl">
                        No towns found matching "{query}"
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