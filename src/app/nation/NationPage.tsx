import { useEffect, useRef, useState } from "react";
import { Nation, ReactStateHandler, Town } from "../lib/types";
import Verifier from "../components/Verifier";
import { checkDiscord, renderSkin } from "../lib/queries";
import LocationItem from "../location/LocationItem";
import Player from "../player/Player";

export default function page({nationData}: {nationData: Nation}){

    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const verifierRef = useRef<HTMLDivElement>(null);
    const [discordLink, setDiscordLink] = useState<string>("");
    const [isLoadingDiscord, setIsLoadingDiscord] = useState<boolean>(true);

    useEffect(() => {
        if (isVerifying) {
            console.log("Closing verifier due to selectedItem change");
            setIsVerifying(false);
        }

        const fetchDiscordLink = async () => {
            setIsLoadingDiscord(true);
            const link:string | null = await checkDiscord(nationData.uuid);
            if(!link)
                setDiscordLink("")
            else
                setDiscordLink(link);
        };
        
        fetchDiscordLink().then(() => {
            setIsLoadingDiscord(false);
            console.log("Discord link: " + discordLink);
        });

    }, [nationData]);
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
            isVerifying && 
            verifierRef.current && 
            !verifierRef.current.contains(event.target as Node)
            ) {
            setIsVerifying(false);
            }
        }
        
        if (isVerifying) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVerifying]);

    return (
        <div className="w-full px-8 pt-8 flex flex-col">
            {isVerifying && nationData ? (
                <div ref={verifierRef}>
                    <Verifier
                        uuid={nationData.king.uuid}
                        locationUUID={nationData.uuid}
                        onClose={() => setIsVerifying(false)}
                    />
                </div>
            ) :
            (
                isLoadingDiscord ?
                (
                    null
                )
                :
                (
                    discordLink ? 
                    <h1 onClick={() => setIsVerifying(!isVerifying)} className="text-blue1 text-md font-bold absolute top-24 right-6 p-2 bg-charcoal rounded-md hover:cursor-pointer">
                        Change Invite
                    </h1>
                    :
                    <h1 onClick={() => setIsVerifying(!isVerifying)} className="text-white text-md font-bold absolute top-24 right-6 p-2 bg-blue1 rounded-md hover:cursor-pointer">
                        Your Nation?
                    </h1>
                )
            )}
            <div className="text-lg flex flex-col items-center">
                <div className="text-5xl text-center font-bold">
                    {nationData.name}
                </div>
                <div className="flex items-center justify-center -gap-1">
                    <svg 
                        width="100%" 
                        height="12" 
                        viewBox="0 0 180 12" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className=""
                    >
                        <path d="M0.226497 6L6 11.7735L11.7735 6L6 0.226497L0.226497 6ZM179.774 6L174 0.226497L168.226 6L174 11.7735L179.774 6ZM6 6V7H174V6V5H6V6Z" fill="white"/>
                    </svg>
                </div>
                <div className="text-gray-400">
                    {nationData.board}
                </div>
                <div className="flex gap-4 hover:cursor-pointer">
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Town Blocks</span>
                        {nationData.stats.numTownBlocks}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Residents</span>
                        {nationData.stats.numResidents}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Towns</span>
                        {nationData.stats.numTowns}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Allies</span>
                        {nationData.stats.numAllies}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Enemies</span>
                        {nationData.stats.numEnemies}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Balance</span>
                        ${nationData.stats.balance}
                    </div>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-2 gap-8 mt-8">
                <div className="flex flex-col text-center sm:text-left gap-4"> 
                    <div className="">
                        <div className="font-bold text-2xl">
                            Capital: {nationData.capital.name}
                        </div>
                        <div className="flex justify-center sm:justify-start text-sm italic text-gray-400 gap-4">
                            <div className="">
                                {`${Math.floor(nationData.coordinates.spawn.x)}, ${Math.floor(nationData.coordinates.spawn.y)}, ${Math.floor(nationData.coordinates.spawn.z)}`}
                            </div>
                            <div className="has-tooltip hover:cursor-pointer">
                                <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] ml-8 rounded-t-md rounded-br-md">Founded</span>
                                {new Date(nationData.timestamps.registered).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <iframe src={`https://earthpol.com/map/#world:${nationData.coordinates.spawn.x}:0:${nationData.coordinates.spawn.z}:500:0:0:0:1:flat`} className="w-full h-[25vh] sm:h-[50vh]" sandbox="allow-same-origin allow-scripts">
                        </iframe>
                        <a className="text-sm text-gray-400 text-left" target="none" href={`https://earthpol.com/map/#world:${nationData.coordinates.spawn.x}:0:${nationData.coordinates.spawn.z}:500:0:0:0:1:flat`}>Map Link</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl text-left text-blue1">Towns</h1>
                        <div className="flex gap-8">
                            {nationData.towns?.map((town: {name: string, uuid: string}) => (
                                <LocationItem
                                    key={`${nationData.name}-town-${town.uuid}`}
                                    name={town.name}
                                    uuid={town.uuid}
                                >
                                </LocationItem>
                            ))}
                        </div>
                    </div>
                    <hr className="relative sm:hidden p-4"></hr>
                </div>
                <div className="flex flex-col items-left text-md sm:ml-8 mt-8 gap-4">
                    <div className="flex flex-row items-center gap-4 bg-charcoal p-4 rounded-md">
                        <h1 className="text-2xl text-blue1">Leader</h1>
                        <Player
                            key={`${nationData.name}-king-${nationData.king.uuid}`}
                            name={nationData.king.name}
                            uuid={nationData.king.uuid}
                        ></Player>
                    </div>
                    
                    {nationData.allies?.length > 0 ?
                    (
                    <div className="flex flex-col items-start gap-4">
                        <h1 className="text-2xl text-blue1">
                            Allies:
                        </h1>
                        <div className="flex flex-row gap-4 w-full max-w-full overflow-x-scroll no-scrollbar bg-charcoal p-4 rounded-md">
                            {!isLoadingDiscord ? 
                                nationData.allies?.map((ally: {name: string, uuid: string}) => (
                                    <LocationItem
                                        key={`${nationData.name}-ally-${ally.uuid}`}
                                        name={ally.name}
                                        uuid={ally.uuid}
                                    ></LocationItem>
                                ))
                                :
                                null
                            }
                        </div>
                    </div>
                    )
                    :
                    null}
                    
                    {nationData.enemies?.length > 0 ?
                    (
                    <div className="flex flex-col items-start gap-4">
                        <h1 className="text-2xl text-blue1">
                            Enemies:
                        </h1>
                        <div className="flex flex-row gap-4 w-full max-w-full overflow-x-scroll no-scrollbar bg-charcoal p-4 rounded-md">
                            {!isLoadingDiscord ? 
                                nationData.enemies?.map((enemy: {name: string, uuid: string}) => (
                                    <LocationItem
                                        key={`${nationData.name}-ally-${enemy.uuid}`}
                                        name={enemy.name}
                                        uuid={enemy.uuid}
                                    ></LocationItem>
                                ))
                                :
                                null
                            }
                        </div>
                    </div>
                    )
                    :
                    null}
                    <div className="flex flex-col">
                        <h1 className="text-2xl text-blue1">Residents:</h1>
                        <div className="flex flex-row gap-4 bg-charcoal p-4 rounded-md">
                            {nationData.residents?.map((resident: {name: string, uuid: string}) => (
                                <Player
                                    key={`${nationData.name}-resident-${resident.uuid}`}
                                    name={resident.name}
                                    uuid={resident.uuid}
                                >
                                </Player>
                            ))}
                        </div>
                    </div>
                    <div>
                        {nationData.status.isPublic}
                    </div>
                    <div>
                        {nationData.status.isOpen}
                    </div>
                    <div>
                        {nationData.status.isNeutral}
                    </div>
                </div>
            </div>
        </div>
    )
}