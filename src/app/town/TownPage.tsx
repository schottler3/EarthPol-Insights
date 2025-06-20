import Link from "next/link";
import { Town } from "../lib/types";
import LocationItem from "../location/LocationItem";
import Player from "../players/Player";

export default function TownPage({townData}: {townData: Town}){

    return (
        <div className="p-8 flex flex-col">
            <div className="text-lg flex flex-col items-center">
                <div className="text-3xl md:text-5xl text-center font-bold">
                    {townData.name}
                </div>
                <div className="text-gray-400">
                    {townData.board}
                </div>
                <div className="flex gap-4 hover:cursor-pointer">
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Town Blocks</span>
                        {townData.stats?.numTownBlocks}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Max Town Blocks</span>
                        {townData.stats?.maxTownBlocks}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Residents</span>
                        {townData.stats?.numResidents}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Bonus Blocks</span>
                        {townData.stats?.bonusBlocks}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Trusted</span>
                        {townData.stats?.numTrusted}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Outlaws</span>
                        {townData.stats?.numOutlaws}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Balance</span>
                        ${townData.stats?.balance}
                    </div>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-2 gap-8 mt-8">
                <div className="flex flex-col text-center sm:text-left gap-4">
                    <div className="">
                        <div className="flex justify-center sm:justify-start text-sm italic text-gray-400 gap-4">
                            <div className="">
                                {`${Math.floor(townData.coordinates.spawn.x)}, ${Math.floor(townData.coordinates.spawn.y)}, ${Math.floor(townData.coordinates.spawn.z)}`}
                            </div>
                            <div className="has-tooltip hover:cursor-pointer">
                                <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] ml-8 rounded-t-md rounded-br-md">Founded</span>
                                {new Date(townData.timestamps.registered).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <iframe src={`https://earthpol.com/map/#world:${townData.coordinates.spawn.x}:0:${townData.coordinates.spawn.z}:500:0:0:0:1:flat`} className="w-full h-[25vh] sm:h-[50vh]" sandbox="allow-same-origin allow-scripts">
                        </iframe>
                        <a className="text-sm text-gray-400 text-left" target="none" href={`https://earthpol.com/map/#world:${townData.coordinates.spawn.x}:0:${townData.coordinates.spawn.z}:500:0:0:0:1:flat`}>Map Link</a>
                    </div>
                    
                    {townData.nation.uuid ? (
                        <div className="flex flex-col gap-4">
                            <h1 className="text-2xl text-left text-blue1">
                                Nation:
                            </h1>
                            <div className="flex flex-wrap gap-4">
                                <LocationItem
                                    key={`${townData.name}-nation-${townData.nation.uuid}`}
                                    name={townData.nation.name}
                                    uuid={townData.nation.uuid}
                                    type="nation"
                                />
                            </div>
                        </div>
                    ) : null}
                    
                    <hr className="relative sm:hidden p-4"></hr>
                </div>
                <div className="flex flex-col items-left text-md sm:ml-8 md:mt-8 gap-4">
                    <div className="flex flex-row items-center gap-4 bg-charcoal p-4 rounded-md">
                        <h1 className="text-2xl text-blue1">Leader</h1>
                        <Player
                            name={townData.mayor.name}
                            uuid={townData.mayor.uuid}
                        ></Player>
                    </div>
                    
                    <div className="flex flex-col">
                        <h1 className="text-2xl text-blue1">Residents: {townData.residents.length}</h1>
                        <div className="flex flex-wrap gap-4 bg-charcoal p-4 rounded-md">
                            {townData.residents?.map((resident: {name: string, uuid: string}) => (
                                <Player
                                    key={`${townData.name}-resident-${resident.uuid}`}
                                    name={resident.name}
                                    uuid={resident.uuid}
                                >
                                </Player>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="flex gap-2">
                            <h1>
                                IsPublic:
                            </h1>
                            <h1 className={`font-bold ${townData.status.isPublic ? `text-green-500` : `text-red-500`}`}>
                                {`${townData.status.isPublic}`}
                            </h1>
                        </div>
                        <div className="flex gap-2">
                            <h1>
                                IsOpen:
                            </h1>
                            <h1 className={`font-bold ${townData.status.isOpen ? `text-green-500` : `text-red-500`}`}>
                                {`${townData.status.isOpen}`}
                            </h1>
                        </div>
                        <div className="flex gap-2">
                            <h1>
                                IsNeutral:
                            </h1>
                            <h1 className={`font-bold ${townData.status.isNeutral ? `text-green-500` : `text-red-500`}`}>
                                {`${townData.status.isNeutral}`}
                            </h1>
                        </div>
                    </div>
                    
                    <Link href={`../shops/town/${townData.uuid}`} className="bg-charcoal rounded-full p-8 h-16 w-16 text-center flex justify-center items-center font-bold hover:cursor-pointer hover:bg-gray1 hover:text-aqua1">
                        Shops
                    </Link>
                </div>
            </div>
        </div>
    )
}