import { useEffect, useRef, useState } from "react"
import { checkDiscord, getDiscordSrc, renderLocation } from "../lib/queries";
import { Invite, ReactStateHandler } from "../lib/types";
import Link from "next/link";

export default function LocationItem({name, uuid}: {name: string, uuid: string}) {
    const [discordInfo, setDiscordInfo] = useState<{data: Invite | null}>({ data: null });
    const [isLoading, setIsLoading] = useState(false);
    const hasLoadedRef = useRef(false);

    useEffect(() => {

        if (hasLoadedRef.current) return;
        
        // Prevent duplicate requests with loading state
        setIsLoading(true);
        
        const getInviteInfo = async () => {
            try {
                const discordLink = await checkDiscord(uuid);
                if (discordLink) {
                    const info = await getDiscordSrc(discordLink);
                    setDiscordInfo({ data: info });
                    hasLoadedRef.current = true;
                } else {
                    setDiscordInfo({ data: null });
                }
            } catch (error) {
                console.error(`Error loading invite info for ${name}:`, error);
            } finally {
                setIsLoading(false);
            }
        };

        getInviteInfo();
        
    }, [uuid, name]);

    return (
        <div className="relative">
            {isLoading ? (
                <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full"></div>
            ) : (
                <div className="flex flex-col items-center hover:cursor-pointer">
                    {discordInfo?.data?.imageURL ? (
                        <div className="has-tooltip">
                            <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-8 rounded-t-md rounded-br-md">{discordInfo.data.serverName}</span>
                            <img
                                onClick={() => discordInfo?.data?.inviteURL && window.open(discordInfo.data.inviteURL, '_blank')}
                                className="w-10 h-10 rounded-full" 
                                src={discordInfo.data?.imageURL} 
                                alt={`${name} Discord server`}
                            />
                        </div>
                    ) : (
                        <img
                            className="w-10 h-10 rounded-full" 
                            src="/images/Earth.svg"
                            alt={`${name} Discord server`}
                        />
                    )}
                    <Link href={`/location?uuid=${uuid}`} className="hover:text-blue1 font-bold text-white">
                        {name}
                    </Link>
                </div>
            )}
        </div>
    )
}