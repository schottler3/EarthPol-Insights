"use client"
import { useState } from "react";

export default function Category({onClick, name}: {onClick: () => void, name: string}) {

    const [isSelected, setIsSelected] = useState<boolean>(false);

    return(
        <div 
            onClick={() => {
                setIsSelected(!isSelected);
                onClick();
            }}
            className={`px-2 rounded-full hover:cursor-pointer font-bold ${isSelected ? `text-aqua1` : ``}`}
        >
            {name}
        </div>
    )
}