"use client"
import { useEffect, useRef, useState } from "react"
import NationItem from "./components/NationItem";
import Header from "./components/Header";
import { FAKECUBA, FAKENATIONS, isTown, Nation, Town, USINGFAKE } from "./lib/types";
import NationPage from "./components/NationPage";
import TownPage from "./components/TownPage";

interface NationItem {
  index: number;
  name: string;
  uuid: string;
}

export default function EarthPol() {

    const [nations, setNations] = useState<NationItem[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Nation | Town | null>(null);

    useEffect(() => {
        if(USINGFAKE){
            setNations(FAKENATIONS.map((nation, index) => ({
                ...nation,
                index
            })));
            setSelectedItem(FAKECUBA);
            setLoading(false);
        }
        else {
            const fetchData = async () => {
                try {
                    const response = await fetch('/api/earthpol/nations');
                    
                    if (!response.ok) {
                        throw new Error(`Error! Status: ${response.status}`);
                    }
                    
                    const result = await response.json();
                    console.log('Fetched data:', result);
                    setNations(result);
                    console.log(result[0])
                    setSelectedItem(result[0]);
                    setLoading(false);
                } catch (e: unknown) {
                    const error = e instanceof Error ? e : new Error(String(e));
                    console.error('Error fetching data:', error);
                    if(!nations){
                        setError(error.message);
                        setLoading(false);
                    }
                    
                }
            };

            fetchData();
        }
    }, [])

    return (
        <>
            <Header/>
            
            <div className="bg-charcoal pt-20 min-h-screen h-screen oswald-earth">
                {loading ? (
                    <div className="text-white p-4">Loading...</div>
                ) : error ? (
                    <div className="text-red-500 p-4">Error: {error}</div>
                ) : !nations ? (
                    <div className="text-white text-4xl flex flex-col justify-center h-screen items-center">
                        <h1>The server at</h1>
                        <a className="text-aqua1 font-bold" href="https://api.earthpol.com/astra/">https://api.earthpol.com/astra/</a>
                        <h1>appears to be down :(</h1>
                    </div>
                ) : (
                    <div className="grid grid-cols-[20%_80%] w-full">
                        {/*Left side page (nationItems and townItems) */}
                        <div className="flex justify-left pl-8 pt-10 overflow-y-auto max-h-screen no-scrollbar">
                            <div className="flex flex-col">
                                <div className="text-white hover:cursor-pointer flex items-center gap-2" onClick={() => setExpanded(!expanded)}>
                                    <svg 
                                        className={`w-4 h-4 transition-transform text-blue1 ${expanded ? 'rotate-180' : ''}`} 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2"
                                    >
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                    <h2>
                                        {expanded ? 'Collapse All' : 'Expand All'}
                                    </h2>
                                </div>
                                {
                                    nations.map((item: NationItem, index: number) => (
                                        <NationItem
                                            key={index}
                                            name={item.name}
                                            uuid={item.uuid}
                                            collapse={expanded}
                                            selectedItem={selectedItem}
                                            setSelectedItem={setSelectedItem}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                        {/*Right side page */}
                        <div className="bg-navy max-h-screen overflow-y-auto no-scrollbar">
                            {selectedItem ? 
                                <>
                                    <div className="bg-navy pt-8 text-white flex justify-center">
                                        {isTown(selectedItem) ? 
                                            <TownPage
                                                townData={selectedItem}
                                                setSelectedItem={setSelectedItem}
                                            />
                                            :
                                            <NationPage
                                                nationData={selectedItem}
                                                setSelectedItem={setSelectedItem}
                                            />
                                        }
                                    </div>
                                </>
                                :
                                null
                            }
                        </div>
                    </div>
            )}
        </div>
    </>
)
}