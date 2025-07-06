"use client"
import { useEffect, useState } from "react";
import NationItem from "./NationItem";
import LoadingLocation from "../components/LoadingLocation";

export default function page() {

    const [nations, setNations] = useState<NationItem[] | null>(null);
    const [isLoadingNations, setIsLoadingNations] = useState(true);

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

    return (
        <div className="m-4 w-full h-full flex flex-col gap-2">
            {
                nations && nations.length >= 1 && !isLoadingNations ?
                <>
                    <h1 className="text-center text-aqua1 text-4xl font-bold w-full">Nations: {nations?.length}</h1>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"> {
                        nations.map((item: NationItem, index: number) => (
                            <NationItem
                                key={index}
                                name={item.name}
                                uuid={item.uuid}
                            />
                        ))
                    }
                    </div>
                </>
                :
                <div className="flex items-center justify-center h-full w-full *:w-1/2">
                    <LoadingLocation />
                </div>
            }
        </div>
    )
}