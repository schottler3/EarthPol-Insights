"use client"

export default function Category({onClick, name, isSelected}: {onClick: () => void, name: string, isSelected?: boolean}) {

    return(
        <div 
            onClick={onClick}
            className={`px-2 rounded-full hover:cursor-pointer font-bold ${isSelected ? `text-aqua1` : ``}`}
        >
            {name}
        </div>
    )
}