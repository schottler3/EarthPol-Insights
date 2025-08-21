"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getEndpoints, getPlayerData } from '../lib/queries';
import { EndpointData } from '../lib/types';
import WeatherWidget from './WeatherWidget';
import Profile from './Profile';

export default function Header(){
    const headerHeight = "h-32";
    const router = useRouter();

    const [search, setSearch] = useState<string | null>(null);
    const [endpointData, setEndpointData] = useState<EndpointData | null>(null);

    const handleSearch = async () => {
        if (search) {
            try {
                const data = await getPlayerData(search);
                if(data != null)
                    router.push(`/players/${data.uuid}`)
            } catch (e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        async function loadEndpointData() {
            try {
                const data = await getEndpoints();
                setEndpointData(data);
                console.log(data);
            } catch (err) {
                console.log("Failed to get endpoint data in Header")
            }
        }

        loadEndpointData()
    }, [])

    return (
        <>
            <div className={`w-screen max-${headerHeight}`}>
            </div>

            <div className={`${headerHeight} w-screen flex flex-col`}>
                
                <div className="flex items-center gap-2 drop-shadow-md z-60">
                    <Link href="/">
                        <Image 
                            className={`h-20 w-auto sm:h-24 ml-4`}
                            src="/images/EPMC-Insights-Logo.svg"
                            alt="EPMC Logo"
                            width={0}
                            height={0}
                        />
                    </Link>
                    <div className="flex-col hidden sm:flex">
                        <div className="text-blue1 text-2xl font-bold">
                            <h2>
                                Insights
                            </h2>
                        </div>
                        <h1 className="items-center text-blue1 font-bold">
                            {`Online: ${endpointData?.stats.numOnlinePlayers || 0}`}
                        </h1>
                    </div>
                    <div className="absolute flex justify-center w-full">
                        <div className="hidden md:block mx-auto">
                            <WeatherWidget 
                                key="WeatherWidgetHeader"
                                data={endpointData}
                            />
                        </div>
                    </div>
                    <div className="flex absolute w-3/4 *:text-center justify-end items-center right-4 flex-wrap sm:flex-nowrap gap-2">
                        <div className="has-tooltip hover:cursor-pointer !hidden md:block">
                            <span className="tooltip">{`Mob Spawning: ${endpointData?.status.mobSpawning}`}</span>
                            <img src="https://mc.nerothe.com/img/1.21.6/minecraft_spawner.png" className="w-8 h-8">
                            </img>
                        </div>
                        <Link className="hidden sm:block w-8 has-tooltip flex-shrink h-auto text-white font-bold rounded-md" target="none" href="https://www.patreon.com/c/schottler3">
                            <span className="tooltip">Buy me a latte &lt; 3</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                <path d="M 28.1875 0 C 30.9375 6.363281 18.328125 10.292969 17.15625 15.59375 C 16.082031 20.464844 24.648438 26.125 24.65625 26.125 C 23.355469 24.109375 22.398438 22.449219 21.09375 19.3125 C 18.886719 14.007813 34.535156 9.207031 28.1875 0 Z M 36.5625 8.8125 C 36.5625 8.8125 25.5 9.523438 24.9375 16.59375 C 24.6875 19.742188 27.847656 21.398438 27.9375 23.6875 C 28.011719 25.558594 26.0625 27.125 26.0625 27.125 C 26.0625 27.125 29.609375 26.449219 30.71875 23.59375 C 31.949219 20.425781 28.320313 18.285156 28.6875 15.75 C 29.039063 13.324219 36.5625 8.8125 36.5625 8.8125 Z M 19.1875 25.15625 C 19.1875 25.15625 9.0625 25.011719 9.0625 27.875 C 9.0625 30.867188 22.316406 31.089844 31.78125 29.25 C 31.78125 29.25 34.296875 27.519531 34.96875 26.875 C 28.765625 28.140625 14.625 28.28125 14.625 27.1875 C 14.625 26.179688 19.1875 25.15625 19.1875 25.15625 Z M 38.65625 25.15625 C 37.664063 25.234375 36.59375 25.617188 35.625 26.3125 C 37.90625 25.820313 39.84375 27.234375 39.84375 28.84375 C 39.84375 32.46875 34.59375 35.875 34.59375 35.875 C 34.59375 35.875 42.71875 34.953125 42.71875 29 C 42.71875 26.296875 40.839844 24.984375 38.65625 25.15625 Z M 16.75 30.71875 C 15.195313 30.71875 12.875 31.9375 12.875 33.09375 C 12.875 35.417969 24.5625 37.207031 33.21875 33.8125 L 30.21875 31.96875 C 24.351563 33.847656 13.546875 33.234375 16.75 30.71875 Z M 18.1875 35.9375 C 16.058594 35.9375 14.65625 37.222656 14.65625 38.1875 C 14.65625 41.171875 27.371094 41.472656 32.40625 38.4375 L 29.21875 36.40625 C 25.457031 37.996094 16.015625 38.238281 18.1875 35.9375 Z M 11.09375 38.625 C 7.625 38.554688 5.375 40.113281 5.375 41.40625 C 5.375 48.28125 40.875 47.964844 40.875 40.9375 C 40.875 39.769531 39.527344 39.203125 39.03125 38.9375 C 41.933594 45.65625 9.96875 45.121094 9.96875 41.15625 C 9.96875 40.253906 12.320313 39.390625 14.5 39.8125 L 12.65625 38.75 C 12.113281 38.667969 11.589844 38.636719 11.09375 38.625 Z M 44.625 43.25 C 39.226563 48.367188 25.546875 50.222656 11.78125 47.0625 C 25.542969 52.695313 44.558594 49.535156 44.625 43.25 Z"></path>
                            </svg>
                        </Link>
                        <div>
                            <Profile
                            />
                        </div>
                        <div className="flex items-center justify-center gap-2 text-charcoal">
                            <input 
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()} 
                                className="text-center w-48 h-8 border-2 py-1 px-4 border-blue1 rounded-md focus:outline-aqua1 focus:outline-none" placeholder='Search Player'></input>
                            <svg onClick={handleSearch} className="hover:cursor-pointer" width="24" height="24" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="80.4142" y="94.208" width="19.5073" height="98" transform="rotate(-45 80.4142 94.208)" fill="black" stroke="#4F7CAC" strokeWidth="2"/>
                                <circle cx="54" cy="54" r="52" fill="black" stroke="#4F7CAC" strokeWidth="4"/>
                                <circle cx="54" cy="54" r="30" fill="white"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-evenly *:w-full bg-blue1 *:py-1 hover:cursor-pointer text-white *:font-bold z-60">
                    <Link href="/nationList" className="text-center hover hover:bg-charcoal rounded-r-full hover:text-aqua1 bg-opacity-75 transition-all ease-in-out">
                        Nations
                    </Link>
                    <Link href="/shops" className="text-center hover hover:bg-charcoal rounded-full hover:text-aqua1 bg-opacity-75 transition-all ease-in-out">
                        Shops
                    </Link>
                    <Link href="/players" className="text-center hover hover:bg-charcoal rounded-full hover:text-aqua1 bg-opacity-75 transition-all ease-in-out">
                        Players
                    </Link>
                    <Link href="/townList" className="text-center hover hover:bg-charcoal rounded-l-full hover:text-aqua1 bg-opacity-75 transition-all ease-in-out">
                        Towns
                    </Link>
                    
                </div>
            </div>
        </>
    )
}