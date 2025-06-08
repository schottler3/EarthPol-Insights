"use client"
import Link from 'next/link';

export default function page() {
    return (
        <div className="h-full flex justify-center items-center" style={{backgroundImage: "url('/images/map.jpg')"}}>
            <div className="flex flex-col max-w-[40vw] mx-auto bg-charcoal bg-opacity-80 p-8 rounded-md">
                <h1 className="text-3xl font-bold text-blue1 mb-6">
                    Welcome to EarthPol Insights
                </h1>
                <div className="text-lg text-white space-y-4">
                    <p>
                        EarthPol Insights provides a streamlined interface to access and visualize data from the EarthPol Minecraft server. 
                        Our dashboard brings together information about nations, towns, players, and more in one convenient location.
                    </p>
                    <p>
                        Browse through the sidebar to explore nations and towns, or use the search function to find specific players
                        and their affiliations. Whether you're planning diplomatic strategies or just curious about the server's 
                        geopolitical landscape, EarthPol Insights has you covered.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link href="https://earthpol.com" 
                            className="px-4 py-2 bg-blue1 font-bold text-white rounded hover:bg-aqua1 hover:text-navy transition text-center">
                            Visit Official EarthPol Website
                        </Link>
                        <Link href="https://earthpol.com/docs/api" 
                            className="px-4 py-2 border border-blue1 font-bold text-blue1 rounded hover:bg-aqua1 hover:text-navy transition text-center">
                            Explore EarthPol API Documentation
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}