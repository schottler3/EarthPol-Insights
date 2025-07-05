"use client"
import { useEffect, useState } from "react";
import LoadingLocation from "../components/LoadingLocation";
import TownItem from "./TownItem";

export default function page() {

    const [towns, setTowns] = useState<TownItem[] | null>(null);
    const [isLoadingTowns, setIsLoadingTowns] = useState(true);

    interface TownItem {
        index: number;
        name: string;
        uuid: string;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/towns'); // Changed from /api/nations
                
                if (!response.ok) {
                    throw new Error(`Error! Status: ${response.status}`);
                }
                
                const result = await response.json();
                result.sort((a:TownItem, b:TownItem) => a.name.localeCompare(b.name));
                setTowns(result);
                setIsLoadingTowns(false);
            } catch (e) {
                console.log("Failed to get town data in townList -- /api/towns") // Updated error message
                setTowns([]);
            } finally {
                setIsLoadingTowns(false);
            }
        }
        
        fetchData();
    },[])

    return (
        <div className="m-4 w-full h-full flex flex-col gap-2">
            {
                towns && towns.length >= 1 && !isLoadingTowns ?
                <>
                    <h1 className="text-center text-aqua1 text-4xl font-bold w-full">Towns: {towns?.length}</h1>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                        {towns.map((item: TownItem, index: number) => (
                            <TownItem
                                key={index}
                                name={item.name}
                                uuid={item.uuid}
                            />
                        ))}
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