"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDiscordSrc, renderNation } from "../lib/queries";
import { Invite } from "../lib/types";

export default function LocationItem({name, uuid, type, discord}: {name: string, uuid: string, type?: string, discord?: string}) {

    const [discordLink, setDiscordLink] = useState<string>(discord || "");
    const [discordImg, setDiscordImg] = useState<string>("");

    useEffect(() => {
        const getLocationData = async () => {
            if(type == `nation`){
                try {
                    if (discord) {
                        setDiscordLink(discord);
                        try{
                            let invite: Invite | null = await getDiscordSrc(discord);
                            if(invite){
                                if(invite?.imageURL)
                                    setDiscordImg(invite.imageURL);
                            }
                            else{
                                console.log("Invite invalid!");
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    }
                    else {
                        const data = await renderNation(uuid);
                        if(data != null && data.discord) {
                            setDiscordLink(data.discord);
                            let invite: Invite | null = await getDiscordSrc(data.discord);
                            if(invite?.imageURL)
                                setDiscordImg(invite.imageURL);
                        }
                    }
                } catch (err){
                    console.log(err);
                }
            }
        }

        getLocationData();
    }, []);

    const getHref = () => {
        if (type === 'nation') return `/nation/${uuid}`;
        else return `/town/${uuid}`;
    };

    return (
        <div className="relative">
            <div className="flex flex-col items-center hover:cursor-pointer">
                <div className="hover:text-blue1 flex flex-col items-center font-bold text-white">
                    <Link href={discordLink}>
                        <img
                            className="w-10 h-10 rounded-full" 
                            src={discordImg ? discordImg : `/images/Earth.svg`}
                            alt={`${name}`}
                        />
                    </Link>
                    <Link href={getHref()}>{name}</Link>
                </div>
            </div>
        </div>
    )
}