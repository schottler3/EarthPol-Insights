import { useEffect, useState } from "react";
import { verifyUser } from "../queries";

export default function Verifier({uuid}: {uuid:string}) {

    const [time, setTime] = useState<number>(60);
    const [code, setCode] = useState<number | null>(null);
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const startAuth = () => {
        setTime(60);
        let c = Math.floor(Math.random() * 90000) + 10000;
        setCode(c);

        const formattedTimestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
        console.log(formattedTimestamp); // Example: 2025-05-28 15:45:12

        const newTimer = setInterval(() => {
            setTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(newTimer);
                    return 0;
                }
                if(prevTime % 5 == 0){
                    const checkVerification = async () => {
                        const verf = await verifyUser(uuid, c, formattedTimestamp);
                        setIsVerified(verf);
                    };
                    checkVerification();
                }
                return prevTime - 1;
            });
        }, 1000);
        setTimer(newTimer);
    }

    useEffect(() => {
        startAuth();
        return () => {
            if (timer) clearInterval(timer);
        };
    }, []); 

    return (
        <div className="fixed flex flex-col gap-2 items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg h-auto w-auto max-w-md text-center">
            
            {time > 0 ? 
                <div className="text-2xl font-bold text-blue1">
                    {time}
                </div>
                :
                <h2 onClick={startAuth} className="p-2 bg-red-400 rounded-md h-min text-white hover:cursor-pointer">
                    Retry Authentication
                </h2>
            }
            If you are the owner of this location, please type this code in game:
            <div onClick={() => {navigator.clipboard.writeText(String(code))}} className="text-4xl font-bold p-2 bg-aqua1 rounded-md w-1/2 text-center hover:cursor-pointer">
                {code}
            </div>
        </div>
    )
}