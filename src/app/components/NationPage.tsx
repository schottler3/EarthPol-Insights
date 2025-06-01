import { useEffect, useRef, useState } from "react";
import { Nation, Town } from "../lib/types";
import Verifier from "./Verifier";
import { checkDiscord } from "../lib/queries";

export default function NationPage({nationData}: {nationData: Nation}){

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

        }, [nationData, discordLink]);
    
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
        <div className="w-full px-8 mt-8">
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
            </div>
            <div className="grid grid-cols-2 gap-8 mt-8">
                <div className="flex flex-col gap-4"> 
                    <div className="">
                        <div className="font-bold text-2xl">
                            Capital: {nationData.capital.name}
                        </div>
                        <div className="text-sm italic text-gray-400">
                            {`${Math.floor(nationData.coordinates.spawn.x)}, ${Math.floor(nationData.coordinates.spawn.y)}, ${Math.floor(nationData.coordinates.spawn.z)}`}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <iframe src={`https://earthpol.com/map/#world:${nationData.coordinates.spawn.x}:0:${nationData.coordinates.spawn.z}:500:0:0:0:1:flat`} className="w-full h-[50vh]" sandbox="allow-same-origin allow-scripts">
                        </iframe>
                        <a className="text-sm text-gray-400" target="none" href={`https://earthpol.com/map/#world:${nationData.coordinates.spawn.x}:0:${nationData.coordinates.spawn.z}:500:0:0:0:1:flat`}>Map Link</a>
                    </div>
                </div>
                <div className="flex flex-col items-center text-md">
                    <div className="flex flex-col">
                        <h1>
                            Allies:
                        </h1>
                        <div className="flex flex-row">
                            {nationData.allies?.map((ally: {name: string, uuid: string}) => (
                                <div key={`${nationData.name}-ally-${ally.uuid}`}>
                                    {ally.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        {nationData.enemies?.map((enemy: {name: string, uuid: string}) => (
                            <div key={`${nationData.name}-enemy-${enemy.uuid}`}>
                                {enemy.name}
                            </div>
                        ))}
                    </div>
                    <div>
                        {nationData.king.name}
                    </div>
                    <div>
                        {nationData.ranks.coleader?.map((coleader: {name: string, uuid: string}) => (
                            <div key={`${nationData.name}-coleader-${coleader.uuid}`}>
                                {coleader.name}
                            </div>
                        ))}
                    </div>
                    <div>
                        {nationData.ranks.minister?.map((minister: {name: string, uuid: string}) => (
                            <div key={`${nationData.name}-minister-${minister.uuid}`}>
                                {minister.name}
                            </div>
                        ))}
                    </div>
                    <div>
                        {nationData.ranks.recruiter?.map((recruiter: {name: string, uuid: string}) => (
                            <div key={`${nationData.name}-recruiter-${recruiter.uuid}`}>
                                {recruiter.name}
                            </div>
                        ))}
                    </div>
                    <div>
                        {nationData.ranks.soldier?.map((soldier: {name: string, uuid: string}) => (
                            <div key={`${nationData.name}-soldier-${soldier.uuid}`}>
                                {soldier.name}
                            </div>
                        ))}
                    </div>
                    <div>
                        {nationData.ranks.general?.map((general: {name: string, uuid: string}) => (
                            <div key={`${nationData.name}-general-${general.uuid}`}>
                                {general.name}
                            </div>
                        ))}
                    </div>
                    <div>
                        {nationData.residents?.map((resident: {name: string, uuid: string}) => (
                            <div key={`${nationData.name}-resident-${resident.uuid}`}>
                                {resident.name}
                            </div>
                        ))}
                    </div>
                    <div>
                        {nationData.stats.numTownBlocks}
                    </div>
                    <div>
                        {nationData.stats.numResidents}
                    </div>
                    <div>
                        {nationData.stats.numTowns}
                    </div>
                    <div>
                        {nationData.stats.numAllies}
                    </div>
                    <div>
                        {nationData.stats.numEnemies}
                    </div>
                    <div>
                        {nationData.stats.balance}
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
                    <div>
                        {nationData.timestamps.registered}
                    </div>
                    <div>
                        {nationData.towns?.map((town: {name: string, uuid: string}) => (
                            <div key={`${nationData.name}-${town.uuid}`}>
                                {town.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}