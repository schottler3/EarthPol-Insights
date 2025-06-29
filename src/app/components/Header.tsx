"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getEndpoints, getPlayerData } from '../lib/queries';
import { EndpointData } from '../lib/types';

export default function Header(){
    const headerHeight = "h-24";
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

            <div className={`${headerHeight} z-50 w-screen gap-2 flex items-center`} style={endpointData?.status.hasStorm ? {backgroundImage: "url('https://media.tenor.com/NdQJBfH-r04AAAAi/rain-minecraft.gif')"} : {background: 'white'}}>
                <Link href="/">
                    <Image 
                        className={`h-20 w-auto sm:h-24 ml-4`}
                        src="/images/EPMC-Insights-Logo.svg"
                        alt="EPMC Logo"
                        width={96}
                        height={96}
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
                <div className="flex absolute w-3/4 *:text-center justify-end right-4 flex-wrap sm:flex-nowrap gap-2">
                    <div className="has-tooltip hover:cursor-pointer">
                        <span className="tooltip">{`Mob Spawning: ${endpointData?.status.mobSpawning}`}</span>
                        <img src="https://mc.nerothe.com/img/1.21.6/minecraft_spawner.png" className="w-8 h-8">
                        </img>
                    </div>
                    <Link className="px-4 py-1 bg-blue1 flex-shrink text-white font-bold hover:text-aqua1 hover:bg-gray-600 rounded-md" target="none" href="https://www.patreon.com/c/schottler3">
                        Buy Me a Latte
                    </Link>
                    <Link className="px-4 py-1 bg-blue1 text-white font-bold hover:text-aqua1 hover:bg-gray-600 rounded-md" href="/shops">
                        Shops
                    </Link>
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
        </>
    )
}