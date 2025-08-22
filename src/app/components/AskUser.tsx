"use client"
import { useEffect, useState } from "react";

export default function AskUser() {

    const [isPrompting, setIsPrompting] = useState<boolean>(true);
    const [isDontShow, setIsDontShow] = useState<boolean>(true);

    useEffect(() => {
        const dontShowAgain = localStorage.getItem('dontShowAccountPrompt');
        if (dontShowAgain === 'true') {
            setIsPrompting(false);
        }
    }, []);

    const handleExit = () => {
        if(isDontShow){
            setIsDontShow(false);
        }
        else if(isPrompting){
            setIsPrompting(false);
        }
    }

    const dontShow = () => {
        if(isPrompting){
            setIsDontShow(false);
            setIsPrompting(false);
            localStorage.setItem('dontShowAccountPrompt', 'true');
        }
    }

    return (
        <div>
            {isPrompting ?
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg relative min-w-64">
                    <div onClick={() => handleExit()} className="absolute top-0 right-2 hover:font-bold hover:cursor-pointer select-none">
                        x
                    </div>
                    <div className="flex flex-col gap-2 text-center w-full">
                        <div>
                            {isDontShow ?
                                <h1>Is this your account?</h1>
                            :
                                <h1>Don't ask again</h1>
                            }
                        </div>
                        <div className="justify-around flex *:bg-blue1 text-white *:px-4 *:py-1 *:rounded-md font-bold">
                            <button onClick={() => dontShow()} className="hover:text-aqua1">Yes</button>
                            <button onClick={() => handleExit()} className="hover:text-aqua1">No</button>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div onClick={() => {setIsPrompting(true); setIsDontShow(true);}} className="absolute top-1/2 left-6 w-4 h-auto -translate-y-1/2 -translate-x-full rotate-180 hover:cursor-pointer hover:w-5 stroke-gray-600 hover:stroke-aqua1 transition-transform ease-in-out">
                <svg viewBox="0 0 93 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M84.0002 9.28926L13.2896 79.9999L48.6449 115.355L84.0002 150.711" strokeWidth="18" strokeLinecap="round"/>
                </svg>
            </div>
            }
        </div>
    )
}