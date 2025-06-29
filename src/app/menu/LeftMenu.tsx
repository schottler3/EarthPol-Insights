"use client"
import { useEffect, useRef, useState } from "react";
import useScreenSize from "../hooks/useScreenSize";
import NationItem from "./NationItem";
import TownItem from "./TownItem";
import { useAppContext } from '../context/AppContext';
import LoadingLocation from "../components/LoadingLocation";

export default function LeftMenu() {
    const [expanded, setExpanded] = useState<boolean>(false);
    const { isSidebarOpen, setIsSidebarOpen } = useAppContext();
    const { isMobile } = useScreenSize();
    const prevIsMobileRef = useRef(isMobile);
    const isFirstMount = useRef(true);
    const [nations, setNations] = useState<NationItem[] | null>(null);
    const [towns, setTowns] = useState<TownItem[] | null>(null);
    const [isLoadingNations, setIsLoadingNations] = useState(true);
    const [isLoadingTowns, setIsLoadingTowns] = useState(true);


    interface NationItem {
        index: number;
        name: string;
        uuid: string;
    }

    interface TownItem {
        index: number;
        name: string;
        uuid: string;
    }

    useEffect(() => {
        // Initial state setup on first mount
        if (isFirstMount.current) {
            setIsSidebarOpen(!isMobile); // Open on desktop, closed on mobile
            isFirstMount.current = false;
            prevIsMobileRef.current = isMobile;
            return;
        }

        // Handle screen size changes
        if (prevIsMobileRef.current !== isMobile) {
            if (!isMobile) {
                // Changed to desktop - open the menu
                setIsSidebarOpen(true);
            } else {
                // Changed to mobile - close the menu
                setIsSidebarOpen(false);
            }
            prevIsMobileRef.current = isMobile;
        }
    }, [isMobile, setIsSidebarOpen]);

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
                console.log("Failed to get nation data in LeftMenu -- /api/nations")
                setNations([]);
            } finally {
                setIsLoadingNations(false);
            }
            try {
                const response = await fetch('/api/towns');
                
                if (!response.ok) {
                    throw new Error(`Error! Status: ${response.status}`);
                }
                
                const result = await response.json();
                result.sort((a:TownItem, b:TownItem) => a.name.localeCompare(b.name));
                setTowns(result);
                setIsLoadingTowns(false);
            } catch (e) {
                console.log("Failed to get town data in LeftMenu -- /api/towns")
                setTowns([]);
            } finally {
                setIsLoadingTowns(false);
            }
        }
        
        fetchData();
    },[])

    return (
        <div className="relative">
            <svg
                onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen);
                    setExpanded(false);
                }}
                className="sm:hidden z-50 absolute left-4 top-6"
                width="24"
                height="19"
                viewBox="0 0 19 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <line
                    y1="0.5"
                    x2="19"
                    y2="0.5"
                    stroke="white"
                    strokeWidth="2"
                    className="transition-all duration-300 origin-center"
                    style={{
                        transform: isSidebarOpen ? 'rotate(45deg) translateY(7px)' : 'none'
                    }}
                />
                <line
                    y1="7.5"
                    x2="19"
                    y2="7.5"
                    stroke="white"
                    strokeWidth="2"
                    className={`transition-all duration-300 ${isSidebarOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`}
                />
                <line
                    y1="14.5"
                    x2="19"
                    y2="14.5"
                    stroke="white"
                    strokeWidth="2"
                    className="transition-all duration-300 origin-center"
                    style={{
                        transform: isSidebarOpen ? 'rotate(-45deg) translateY(-7px)' : 'none'
                    }}
                />
            </svg>
            <div className={`flex flex-col w-min relative max-h-screen z-40 justify-left pl-8 pr-8 pt-10 overflow-y-auto no-scrollbar ${isSidebarOpen ? `bg-charcoal` : `hidden`}`}>
                <div 
                    className={
                        `duration-300 transition-opacity
                        ${isSidebarOpen ? 
                            `flex flex-col opacity-100 relative` 
                            : 
                            ` opacity-0 invisible hidden`
                        }`
                    }
                    >
                    <h1 className="text-aqua1 text-xl font-bold mt-4 mb-2">Nations: {nations?.length}</h1>
                    {
                        nations && nations.length >= 1 && !isLoadingNations ?
                        nations.map((item: NationItem, index: number) => (
                            <NationItem
                                key={index}
                                name={item.name}
                                uuid={item.uuid}
                            />
                        ))
                        :
                        <LoadingLocation />
                    }
                    <h1 className="text-aqua1 text-xl font-bold mt-4 mb-2">Towns: {towns?.length}</h1>
                    <div className="h-max">
                        {
                            towns && towns.length >= 1 && !isLoadingTowns ?
                            towns.map((item: NationItem, index: number) => (
                                <TownItem
                                    key={index}
                                    name={item.name}
                                    uuid={item.uuid}
                                />
                            ))
                            :
                            <LoadingLocation />
                        }
                    </div>
                </div>

                 <div 
                    className={`hidden sm:block absolute right-4 top-4 z-50 text-white font-bold hover:cursor-pointer`}
                    onClick={() => {setIsSidebarOpen(!isSidebarOpen)}}
                >
                    {isSidebarOpen ?
                        <h1>&lt; Close</h1>
                        :
                        null
                    }
                </div>
                
            </div>
            <div 
                className={`hidden sm:block fixed left-2 translate-y-[40vh] z-50 text-white font-bold hover:cursor-pointer`}
                onClick={() => {setIsSidebarOpen(!isSidebarOpen)}}
            >
                {!isSidebarOpen ?
                    <h1>&gt;</h1>
                    :
                    null
                }
            </div>
        </div>
    )
}