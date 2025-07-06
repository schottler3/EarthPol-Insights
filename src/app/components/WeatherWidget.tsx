import { useState, useEffect } from "react";
import { EndpointData } from "../lib/types";

export default function WeatherWidget({data}: {data: EndpointData | null}){
    const [dayRotation, setDayRotation] = useState<string>("0");
    const [timeTwelve, setTimeTwelve] = useState<string>("");
    const [currentTime, setCurrentTime] = useState<number>(0);

    // Function to update time display based on current time
    const updateTimeDisplay = (minecraftTime: number) => {
        let hours = (minecraftTime / 1000) % 24;
        let adjustedHours = (hours + 6) % 24;
        let displayHours = adjustedHours > 12 ? adjustedHours - 12 : adjustedHours;

        let wholeHours = Math.floor(adjustedHours);
        let decimalPart = adjustedHours % 1;
        let minutes = Math.floor(decimalPart * 60);
        setTimeTwelve(`${wholeHours}:${minutes.toString().padStart(2, '0')}`);

        let rotation = wholeHours*30;
                    
        setDayRotation(`${rotation}`);
    };

    useEffect(() => {
        if (data?.time?.time !== undefined) {
            setCurrentTime(data.time.time);
            updateTimeDisplay(data.time.time);
        }
    }, [data?.time?.time]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(prevTime => {
                const newTime = prevTime + 200;
                updateTimeDisplay(newTime);
                return newTime;
            });
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-16 h-16 border-2 border-aqua1 rounded-full flex justify-center items-center overflow-hidden relative">
            {/* Sun/Moon rotating background */}
            <div className="flex flex-col h-32 w-full items-center justify-center" 
                style={{ transform: `rotate(${dayRotation}deg)` }}>
                <div className="bg-blue-200 w-full p-2 flex items-center justify-center">
                    <img className="w-4 h-auto" src="/images/Sun.png" alt="Sun"></img>
                </div>
                <div className="bg-gray-700 w-full p-2 flex items-center justify-center">
                    <img className="w-4 h-auto" src="/images/Moon.png" alt="Moon"></img>
                </div>
            </div>
            
            {/* Rain overlay on top */}
            {data?.status.hasStorm && (
                <div 
                    className="absolute inset-0 rounded-full z-10"
                    style={{
                        backgroundImage: "url('https://media.tenor.com/NdQJBfH-r04AAAAi/rain-minecraft.gif')",
                        backgroundSize: '200%',
                        backgroundPosition: 'center'
                    }}
                />
            )}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-navy z-10 flex items-center justify-center"
                style={{
                    borderRadius: '0 0 100% 100%'
                }}>
                <h1 className="text-white font-bold text-xs">{timeTwelve}</h1>
            </div>
        </div>
    )
}