import { useEffect, useState, useRef } from "react";
import { verifyUser } from "../lib/queries";
import { setDiscord } from "../databasing";

export default function Verifier({uuid, locationUUID, onClose}: {uuid:string, locationUUID:string, onClose: () => void}) {
    const [time, setTime] = useState<number>(60);
    const [code, setCode] = useState<number | null>(null);
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [discordLink, setDiscordLink] = useState<string>("");
    const [isValidLink, setIsValidLink] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
    const [timestamp, setTimestamp] = useState<string>("");
    
    // Use useRef to track if the timer is already running
    const isInitialized = useRef(false);

    const startAuth = async () => {
        // Clear any existing timer 
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        
        // Reset states
        setTime(60);
        setIsSubmitting(true);
        setIsVerified(false);
        
        try {
            // Request a verification code from the server
            const response = await fetch('/api/user-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uuid, locationUUID })
            });
            
            if (!response.ok) {
                throw new Error('Failed to generate verification code');
            }
            
            const data = await response.json();
            setCode(data.code);
            setTimestamp(data.timestamp);
            
            // Create a local variable to close over the data
            const codeValue = data.code;
            const timestampValue = data.timestamp;
            
            // Only start a new timer if one isn't already running
            timerRef.current = setInterval(() => {
                setTime(prevTime => {
                    // Stop the timer at 0
                    if (prevTime <= 1) {
                        if (timerRef.current) {
                            clearInterval(timerRef.current);
                            timerRef.current = null;
                        }
                        return 0;
                    }
                    
                    // Check verification only at specific intervals
                    if (prevTime % 5 === 0) {
                        verifyUser(uuid, codeValue, timestampValue)
                            .then((verified) => {
                                setIsVerified(verified);
                            })
                            .catch((error) => {
                                console.error('Error checking verification:', error);
                            });
                    }
                    
                    // Decrement by exactly 1
                    return prevTime - 1;
                });
            }, 1000);
            
        } catch (error) {
            console.error('Error starting verification:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (!isInitialized.current) {
            isInitialized.current = true;
            startAuth();
        }
        
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
    if(submitSuccess){
      // Auto-close after a short delay
      const timer = setTimeout(() => {
        onClose();
      }, 2000); // 2 second delay before closing
      
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, onClose]);

    const handleSubmitDiscord = async () => {
        const isValid = discordLink.includes("https://discord.gg/");
        setIsValidLink(isValid);
        
        if (isValid && code && timestamp) {
            setIsSubmitting(true);
            try {
                await setDiscord(uuid, locationUUID, code, timestamp, discordLink);
                console.log("Discord link submitted successfully");
                setSubmitSuccess(true);
            } catch (error) {
                console.error("Failed to submit Discord link:", error);
                setIsValidLink(false);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="fixed items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg h-1/4 w-1/2 max-w-md text-center text-navy">
            {isVerified ? (
                <div className="flex flex-col items-center justify-between h-full">
                    {submitSuccess ? (
                        <div className="flex flex-col items-center gap-4 justify-center h-full">
                            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <h1 className="text-2xl font-bold text-green-500">Discord Link Saved!</h1>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-xl">
                                Please enter your discord's invite link below:
                            </h1>
                            <h1 className={isValidLink ? `invisible` : `text-red-500 font-bold italic`}>
                                Invalid discord invite!
                            </h1>
                            <input 
                                type="text" 
                                placeholder="Discord Invite Link" 
                                value={discordLink}
                                onChange={(e) => setDiscordLink(e.target.value)}
                                className="border-2 border-blue1 p-2 bg-charcoal text-center focus:outline-none focus:border-aqua1 focus:ring-2 focus:ring-aqua1/50 rounded-md text-white w-full"
                                disabled={isSubmitting}
                            />
                            <button 
                                className={`border-2 border-blue1 rounded-md w-1/3 text-center p-2 transition-colors ${
                                    isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'hover:bg-blue1/10'
                                }`}
                                onClick={handleSubmitDiscord}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Invite'}
                            </button>
                        </>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4">
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
            )}
        </div>
    );
}