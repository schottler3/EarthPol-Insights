import { useEffect, useRef, useState } from "react";
import { Nation, ReactStateHandler, Town } from "../lib/types";
import Verifier from "./Verifier";
import { checkDiscord, renderSkin } from "../lib/queries";
import LocationItem from "./LocationItem";
import Player from "./Player";

export default function TownPage({townData, setSelectedItem}: {townData: Town, setSelectedItem: ReactStateHandler}){

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
                const link:string | null = await checkDiscord(townData.uuid);
                if(!link)
                    setDiscordLink("")
                else
                    setDiscordLink(link);
            };
            
            fetchDiscordLink().then(() => {
                setIsLoadingDiscord(false);
                console.log("Discord link: " + discordLink);
            });

        }, [townData]);
    
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
        <div className="w-full px-8 mt-8 h-screen">
            {isVerifying && townData ? (
                <div ref={verifierRef}>
                    <Verifier
                        uuid={townData.mayor.uuid}
                        locationUUID={townData.uuid}
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
                        Your Town?
                    </h1>
                )
            )}
            <div className="text-lg flex flex-col items-center">
                <div className="text-5xl text-center font-bold">
                    {townData.name}
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
                    {townData.board}
                </div>
                <div className="flex gap-4 hover:cursor-pointer">
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-8 rounded-t-md rounded-br-md">Town Blocks</span>
                        {townData.stats.numTownBlocks}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-8 rounded-t-md rounded-br-md">Max Town Blocks</span>
                        {townData.stats.maxTownBlocks}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-8 rounded-t-md rounded-br-md">Residents</span>
                        {townData.stats.numResidents}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-8 rounded-t-md rounded-br-md">Bonus Blocks</span>
                        {townData.stats.bonusBlocks}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-8 rounded-t-md rounded-br-md">Trusted</span>
                        {townData.stats.numTrusted}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-8 rounded-t-md rounded-br-md">Outlaws</span>
                        {townData.stats.numOutlaws}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-8 rounded-t-md rounded-br-md">Balance</span>
                        ${townData.stats.balance}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-8">
                <div className="flex flex-col justify-left gap-4"> 
                    <h1 className="text-aqua1 text-2xl">
                        Parent Nation:
                    </h1>
                    <div className="flex items-left">
                        <LocationItem
                            key={`${townData.name}-nation-${townData.nation.uuid}`}
                            name={townData.nation.name}
                            uuid={townData.nation.uuid}
                            setSelectedItem={setSelectedItem}
                        ></LocationItem>
                    </div>
                    <div className="flex text-sm italic text-gray-400 gap-4">
                        <div className="">
                            {`${Math.floor(townData.coordinates.spawn.x)}, ${Math.floor(townData.coordinates.spawn.y)}, ${Math.floor(townData.coordinates.spawn.z)}`}
                        </div>
                        <div className="has-tooltip hover:cursor-pointer">
                            <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-28 ml-8 rounded-t-md rounded-br-md">Founded</span>
                            {new Date(townData.timestamps.registered).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <iframe src={`https://earthpol.com/map/#world:${townData.coordinates.spawn.x}:0:${townData.coordinates.spawn.z}:500:0:0:0:1:flat`} className="w-full h-[50vh]" sandbox="allow-same-origin allow-scripts">
                        </iframe>
                        <a className="text-sm text-gray-400" target="none" href={`https://earthpol.com/map/#world:${townData.coordinates.spawn.x}:0:${townData.coordinates.spawn.z}:500:0:0:0:1:flat`}>Map Link</a>
                    </div>
                </div>
                <div className="flex flex-col items-left text-md ml-8">

                    <div className="flex flex-row items-center gap-4">
                        <h1 className="text-2xl text-blue1">Leader</h1>
                        <Player
                            name={townData.mayor.name}
                            uuid={townData.mayor.uuid}
                        ></Player>
                    </div>
                    
                    <div className="flex gap-4 items-center">
                        <h1 className="text-2xl text-blue1">Assistants</h1>
                        {townData.ranks.assistant?.map((assistant: {name: string, uuid: string}) => (
                            <Player
                                key={`${townData.name}-assistant-${assistant.uuid}`}
                                name={assistant.name}
                                uuid={assistant.uuid}
                            >
                            </Player>
                        ))}
                    </div>

                    <div className="flex gap-4 items-center">
                        <h1 className="text-2xl text-blue1">Trusted</h1>
                        {townData.ranks.trusted?.map((trusted: {name: string, uuid: string}) => (
                            <Player
                                key={`${townData.name}-trusted-${trusted.uuid}`}
                                name={trusted.name}
                                uuid={trusted.uuid}
                            >
                            </Player>
                        ))}
                    </div>

                    <div className="flex gap-4 items-center">
                        <h1 className="text-2xl text-blue1">Recruiters</h1>
                        {townData.ranks.recruiter?.map((recruiter: {name: string, uuid: string}) => (
                            <Player
                                key={`${townData.name}-recruiter-${recruiter.uuid}`}
                                name={recruiter.name}
                                uuid={recruiter.uuid}
                            >
                            </Player>
                        ))}
                    </div>

                    <div className="flex gap-4 items-center">
                        <h1 className="text-2xl text-blue1">Sherrif</h1>
                        {townData.ranks.sheriff?.map((sheriff: {name: string, uuid: string}) => (
                            <Player
                                key={`${townData.name}-sheriff-${sheriff.uuid}`}
                                name={sheriff.name}
                                uuid={sheriff.uuid}
                            >
                            </Player>
                        ))}
                    </div>

                    <div className="flex gap-4 items-center">
                        <h1 className="text-2xl text-blue1">Guards</h1>
                        {townData.ranks.guard?.map((guard: {name: string, uuid: string}) => (
                            <Player
                                key={`${townData.name}-guard-${guard.uuid}`}
                                name={guard.name}
                                uuid={guard.uuid}
                            >
                            </Player>
                        ))}
                    </div>

                    <div className="flex flex-col py-4">
                        <h1 className="text-2xl text-blue1">Residents:</h1>
                        <div className="grid grid-cols-6 gap-8">
                            {townData.residents?.map((resident: {name: string, uuid: string}) => (
                                <Player
                                    key={`${townData.name}-resident-${resident.uuid}`}
                                    name={resident.name}
                                    uuid={resident.uuid}
                                >
                                </Player>
                            ))}
                        </div>
                    </div>
                    <div>
                        {townData.status.isPublic}
                    </div>
                    <div>
                        {townData.status.isOpen}
                    </div>
                    <div>
                        {townData.status.isNeutral}
                    </div>
                </div>
            </div>
        </div>
    )
}