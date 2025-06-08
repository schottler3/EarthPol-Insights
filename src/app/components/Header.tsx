"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPlayerData } from '../lib/queries';

export default function Header(){
    const headerHeight = "h-24";
    const router = useRouter();

    const [search, setSearch] = useState<string | null>(null);

    const handleSearch = async () => {
        if (search) {
            try {
                const data = await getPlayerData(search);
                if(data != null)
                    router.push(`/player/${data.uuid}`)
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <>
            <div className={`w-screen ${headerHeight}`}>
            </div>

            <div className={`fixed top-0 left-0 ${headerHeight} bg-white z-50 w-screen flex items-center`}>
                <Link href="/">
                    <Image 
                        className={`${headerHeight} ml-4`}
                        src="/images/EPMC-Insights-Logo.svg"
                        alt="EPMC Logo"
                        width={96}
                        height={96}
                    />
                </Link>
                <div className="text-blue1 text-2xl font-bold">
                    <h2>
                        Insights
                    </h2>
                </div>
                <div className="flex items-center gap-2 ml-auto mr-8">
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
        </>
    )
}