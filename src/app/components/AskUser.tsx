"use client"
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { setServers } from "dns";
import { reloadAccount } from "../lib/databasing";

export default function AskUser({account}: {account:string}) {

    const [isPrompting, setIsPrompting] = useState<boolean>(false);
    const [firstPrompt, setFirstPrompt] = useState<boolean>(true);
    const [isTheirAccount, setIsTheirAccount] = useState<boolean>(false);

    const { user } = useAppContext(); 

    useEffect(() => {
        const cachedIsIgnored = localStorage.getItem('isIgnored');
        const cachedAccount = localStorage.getItem('userName');
        console.log(user);
        if(user?.userName && user.userName == account || cachedAccount == account){
            setIsPrompting(false);
            setIsTheirAccount(true);
        }
        else if (cachedIsIgnored === 'true') {
            setIsPrompting(false);
        }
        else{
            setIsPrompting(true);
            setFirstPrompt(true);
        }
    }, []);

    const handleExit = () => {
        if(isTheirAccount){
            setIsPrompting(false);
        }
        else if(firstPrompt)
            setFirstPrompt(false);
        else
            setIsPrompting(false);
    }

    const notTheirAccount  = () => {
        setIsTheirAccount(false);
        handleExit();
    }

    const continueAsking = () => {
        setIsPrompting(false);
        localStorage.setItem('isIgnored', `false`);
    }

    const dontAsk = () => {
        localStorage.setItem('isIgnored', `true`);
        setIsPrompting(false);
    }

    const claimAccount = () => {
        setIsTheirAccount(true);
        if (user) {
            user.userName = account;
            reloadAccount(user);
        }
        localStorage.setItem('userName', `${account}`);
    }

    const removeClaim = () => {
        localStorage.setItem('userName', ``);
        setFirstPrompt(true);
        setIsTheirAccount(false);
        if(user){
            user.userName = "";
            reloadAccount(user);
        }
        setIsPrompting(false);
    }

    return (
        <div>
            {isPrompting ?
            <div onClick={() => handleExit()} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-lg shadow-lg relative z-20">
                    <div onClick={() => handleExit()} className="absolute top-0 right-2 hover:font-bold hover:cursor-pointer select-none">
                        x
                    </div>
                    <div className="min-w-64">
                        {firstPrompt ?
                            isTheirAccount ?
                            <div className="flex flex-col gap-4 text-center w-full">
                                <h1>Account Confirmed</h1>
                                <div className="flex justify-around *:bg-blue1 text-white font-bold *:px-6 *:rounded-md">
                                    <button onClick={() => removeClaim()} className="hover:text-aqua1">Remove Link</button>
                                </div>
                            </div>
                            :
                            <div className="flex flex-col gap-4 text-center w-full">
                                <h1>Is this your account?</h1>
                                <div className="flex justify-around *:bg-blue1 text-white font-bold *:px-6 *:rounded-md">
                                    <button onClick={() => claimAccount()} className="hover:text-aqua1">Yes</button>
                                    <button onClick={() => notTheirAccount()} className="hover:text-aqua1">No</button>
                                </div>
                            </div>
                        :
                            <div className="flex gap-4 *:bg-blue1 text-white font-bold *:px-6 *:rounded-md">
                                <button onClick={() => dontAsk()} className="hover:text-aqua1">Dont Ask Again</button>
                                <button onClick={() => continueAsking()} className="hover:text-aqua1">Continue Asking</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            :
                <div onClick={() => {setIsPrompting(true); setFirstPrompt(true);}} className="absolute top-1/2 left-6 w-4 h-auto -translate-y-1/2 -translate-x-full rotate-180 hover:cursor-pointer hover:w-5 stroke-gray-600 hover:stroke-aqua1 transition-transform ease-in-out">
                    <svg viewBox="0 0 93 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M84.0002 9.28926L13.2896 79.9999L48.6449 115.355L84.0002 150.711" strokeWidth="18" strokeLinecap="round"/>
                    </svg>
                </div>
            }
        </div>
    )
}