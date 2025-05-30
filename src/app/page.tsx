"use client"
import { useEffect, useState } from "react"
import NationItem from "./components/NationItem";
import Header from "./components/Header";
import { FAKENATIONS, isTown, Nation, Town } from "./types";
import Verifier from "./components/Verifier";
import NationPage from "./components/NationPage";
import TownPage from "./components/TownPage";

interface NationItem {
  index: number;
  name: string;
}

const usingFake: boolean = true;

export default function EarthPol() {

    const [nations, setNations] = useState<NationItem[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Nation | Town | null>(null);
    const [isVerifying, setIsVerifying] = useState<boolean>(false);

    useEffect(() => {
        if(usingFake){
            setNations(FAKENATIONS.map((nation, index) => ({
                ...nation,
                index
            })));
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

    useEffect(() => {
        // This will run whenever selectedItem changes
        console.log("Selected item changed to:", selectedItem?.name);
        
        // Close the verifier if it's open
        if (isVerifying) {
            console.log("Closing verifier due to selectedItem change");
            setIsVerifying(false);
        }
    }, [selectedItem]);

    return (
        <>
            <Header>
                    
            </Header>
            
            <div className="bg-charcoal pt-20 min-h-screen oswald-earth">
                {isVerifying && selectedItem ? (
                    <Verifier
                        uuid={isTown(selectedItem) ? selectedItem?.mayor?.uuid : selectedItem?.king?.uuid}
                    >
                    </Verifier>
                ) :
                (
                    null
                )}
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
                    <div className="grid grid-cols-[20%_80%] h-screen">
                        <div className="flex justify-center pt-10">
                            <div className="flex flex-col overflow-y-scroll no-scrollbar">
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
                                            collapse={expanded}
                                            selectedItem={selectedItem}
                                            setSelectedItem={setSelectedItem}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                        <div className="bg-navy overflow-y-scroll">
                            {selectedItem ? 
                                <>
                                    <div onClick={() => setIsVerifying(!isVerifying)} className="text-white text-md font-bold absolute top-24 right-6 p-2 bg-blue1 rounded-md hover:cursor-pointer">
                                        Your {isTown(selectedItem) ? "town" : "nation"}?
                                    </div>
                                    <div className="bg-navy pt-8 text-white flex justify-center text-4xl">
                                        {isTown(selectedItem) ? 
                                            <TownPage
                                                townData={selectedItem}
                                            />
                                            :
                                            <NationPage
                                                nationData={selectedItem}
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