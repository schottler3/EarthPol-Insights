import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function DiscordConfirmation({discordLink, discordImg, setDiscordPrompt}: {discordLink: string, discordImg: string, setDiscordPrompt: Dispatch<SetStateAction<boolean>>}) {
    return (
        <div className="fixed inset-0 w-screen h-screen z-50 bg-black bg-opacity-50 flex items-center justify-center text-charcoal">
            <div className="w-[80vw] sm:w-[60vw] md:w-[40vw] h-[40vh] bg-white rounded-md justify-center items-center flex flex-col p-8">
                <img className="max-w-16 max-h-16" src={discordImg}></img>
                <h1 className="text-2xl">You are exiting Earthpol-Insights to go to a discord invite.</h1>
                <h2 className="text-lg">Do you wish to continue to:</h2>
                <h3 className="text-blue1 font-bold">{discordLink}</h3>
                <div className="flex w-full *:w-32 *:h-12 justify-center gap-8 p-8 *:border-blue1 *:border-2 ">
                    <button onClick={() => setDiscordPrompt(false)} className="bg-blue1 rounded-md text-white font-bold hover:bg-aqua1 hover:text-navy">
                        Cancel
                    </button>
                    <button className="bg-blue1 rounded-md text-white font-bold hover:bg-aqua1 hover:text-navy">
                        <Link href={discordLink ? discordLink : ""} target="_blank">
                            Continue
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}