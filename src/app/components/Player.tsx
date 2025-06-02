import { useState, useEffect } from "react";
import { renderSkin } from "../lib/queries";

export default function Player({name, uuid}: {name:string, uuid:string}) {

    const [skinURL, setSkinURL] = useState<string>()

    useEffect(() => {
        const getSkin = async () => {
            setSkinURL(await renderSkin(uuid))
        }
        getSkin();
    }, [uuid])

    return (
        <div className="flex items-center gap-2 bg-charcoal px-2 w-max bg-opacity-70">
            <img 
                src={skinURL} 
                alt="Player avatar"
                className="w-8 h-8 mt-1"
                onError={(e) => {
                    console.log("Image failed to load, using fallback");
                    e.currentTarget.src = `https://mc-heads.net/avatar/steve`;
                }}
            />
            <h1>
                {name}
            </h1>
        </div>
    )
}