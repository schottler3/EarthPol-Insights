"use client"
import { useEffect, useRef, useState } from "react";
import useScreenSize from "../hooks/useScreenSize";
import NationItem from "./NationItem";
import { FAKENATIONS, USINGFAKE } from "../lib/types";
import TownItem from "./TownItem";

export default function LeftMenu() {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { isMobile } = useScreenSize();
    const prevIsMobileRef = useRef(isMobile);
    const isFirstMount = useRef(true);
    const [nations, setNations] = useState<NationItem[] | null>(null);
    const [towns, setTowns] = useState<TownItem[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            setIsOpen(!isMobile); // Open on desktop, closed on mobile
            isFirstMount.current = false;
            prevIsMobileRef.current = isMobile;
            return;
        }

        // Handle screen size changes
        if (prevIsMobileRef.current !== isMobile) {
            if (!isMobile) {
                // Changed to desktop - open the menu
                setIsOpen(true);
            } else {
                // Changed to mobile - close the menu
                setIsOpen(false);
            }
            prevIsMobileRef.current = isMobile;
        }
    }, [isMobile, setIsOpen]);

    useEffect(() => {
        if(USINGFAKE){
            setNations(FAKENATIONS.map((nation, index) => ({
                ...nation,
                index
            })));
            setLoading(false);
        }
        else {
            const fetchData = async () => {
                try {
                    const response = await fetch('/api/nations');
                    
                    if (!response.ok) {
                        throw new Error(`Error! Status: ${response.status}`);
                    }
                    
                    const result = await response.json();
                    result.sort((a:NationItem, b:NationItem) => a.name.localeCompare(b.name));
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
                try {
                    const response = await fetch('/api/towns');
                    
                    if (!response.ok) {
                        throw new Error(`Error! Status: ${response.status}`);
                    }
                    
                    const result = await response.json();
                    result.sort((a:TownItem, b:TownItem) => a.name.localeCompare(b.name));
                    setTowns(result);
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
    },[])

    return (
        <div className={`flex flex-col w-auto h-full z-50 justify-left pl-8 pt-3 overflow-y-auto no-scrollbar ${isOpen ? `bg-charcoal` : ``}`}>
            <svg
                onClick={() => {
                    setIsOpen(!isOpen);
                    setExpanded(false);
                }}
                className="w-16 mb-2 -ml-6 sm:hidden"
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
                    transform: isOpen ? 'rotate(45deg) translateY(7px)' : 'none'
                }}
                />
                <line
                y1="7.5"
                x2="19"
                y2="7.5"
                stroke="white"
                strokeWidth="2"
                className={`transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`}
                />
                <line
                y1="14.5"
                x2="19"
                y2="14.5"
                stroke="white"
                strokeWidth="2"
                className="transition-all duration-300 origin-center"
                style={{
                    transform: isOpen ? 'rotate(-45deg) translateY(-7px)' : 'none'
                }}
                />
            </svg>
            <div 
                className={
                    `duration-300 transition-opacity
                    ${isOpen ? 
                        `flex flex-col opacity-100 relative` 
                        : 
                        ` opacity-0 invisible`
                    }`
                }
                >
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
                <h1 className="text-aqua1 text-xl font-bold mt-4 mb-2">Nations: {nations?.length}</h1>
                {
                    nations?.map((item: NationItem, index: number) => (
                        <NationItem
                            key={index}
                            name={item.name}
                            uuid={item.uuid}
                            collapse={expanded}
                        />
                    ))
                }
                <h1 className="text-aqua1 text-xl font-bold mt-4 mb-2">Towns: {towns?.length}</h1>
                <div className="h-max">
                    {
                        towns?.map((item: NationItem, index: number) => (
                            <TownItem
                                key={index}
                                name={item.name}
                                uuid={item.uuid}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}