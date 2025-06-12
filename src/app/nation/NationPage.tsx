import Link from "next/link";
import { Nation } from "../lib/types";
import LocationItem from "../location/LocationItem";
import Player from "../players/Player";

export default function Page({nationData}: {nationData: Nation}){
    return (
        <div className="px-8 pt-8 flex flex-col">
            <div className="text-lg flex flex-col items-center">
                <div className="text-5xl text-center font-bold">
                    {nationData.name}
                </div>
                <div className="text-gray-400">
                    {nationData.board}
                </div>
                <div className="flex gap-4 hover:cursor-pointer">
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Town Blocks</span>
                        {nationData.stats?.numTownBlocks}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Residents</span>
                        {nationData.stats?.numResidents}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Towns</span>
                        {nationData.stats?.numTowns}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Allies</span>
                        {nationData.stats?.numAllies}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Enemies</span>
                        {nationData.stats?.numEnemies}
                    </div>
                    <div className="has-tooltip">
                        <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] rounded-t-md rounded-br-md">Balance</span>
                        ${nationData.stats?.balance}
                    </div>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-2 gap-8 mt-8">
                <div className="flex flex-col text-center sm:text-left gap-4"> 
                    <div className="">
                        <div className="font-bold text-2xl">
                            Capital: {nationData.capital.name}
                        </div>
                        <div className="flex justify-center sm:justify-start text-sm italic text-gray-400 gap-4">
                            <div className="">
                                {`${Math.floor(nationData.coordinates.spawn.x)}, ${Math.floor(nationData.coordinates.spawn.y)}, ${Math.floor(nationData.coordinates.spawn.z)}`}
                            </div>
                            <div className="has-tooltip hover:cursor-pointer">
                                <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[5vh] ml-8 rounded-t-md rounded-br-md">Founded</span>
                                {new Date(nationData.timestamps.registered).toLocaleDateString('en-US', {
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
                        <iframe src={`https://earthpol.com/map/#world:${nationData.coordinates.spawn.x}:0:${nationData.coordinates.spawn.z}:500:0:0:0:1:flat`} className="w-full h-[25vh] sm:h-[50vh]" sandbox="allow-same-origin allow-scripts">
                        </iframe>
                        <a className="text-sm text-gray-400 text-left" target="none" href={`https://earthpol.com/map/#world:${nationData.coordinates.spawn.x}:0:${nationData.coordinates.spawn.z}:500:0:0:0:1:flat`}>Map Link</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl text-left text-blue1">Towns: {nationData.towns.length}</h1>
                        <div className="flex flex-wrap gap-8">
                            {nationData.towns?.map((town: {name: string, uuid: string}) => (
                                <div className="flex flex-col items-center gap-1" key={`${nationData.name}-town-${town.uuid}`}>
                                    { town.uuid == nationData.capital.uuid ?
                                        <div className="has-tooltip">
                                            <span className="tooltip w-max text-navy italic font-bold p-2 bg-white -mt-[16vh] rounded-t-md rounded-br-md">Capital</span>
                                            <img className="flex hover:cursor-pointer w-auto h-4" src="/images/Crown.svg"></img>
                                        </div>
                                    : <div className="h-4"></div> }
                                    <LocationItem
                                        name={town.name}
                                        uuid={town.uuid}
                                        type="town"
                                    >
                                    </LocationItem>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr className="relative sm:hidden p-4"></hr>
                </div>
                <div className="flex flex-col items-left text-md sm:ml-8 mt-8 gap-4">
                    <div className="flex flex-row items-center gap-4 bg-charcoal p-4 rounded-md">
                        <h1 className="text-2xl text-blue1">Leader</h1>
                        <Player
                            key={`${nationData.name}-king-${nationData.king.uuid}`}
                            name={nationData.king.name}
                            uuid={nationData.king.uuid}
                        ></Player>
                    </div>
                    
                    {nationData.allies?.length > 0 ?
                    (
                    <div className="flex flex-col items-start gap-4">
                        <h1 className="text-2xl text-blue1">
                            Allies: {nationData.allies.length}
                        </h1>
                        <div className="flex flex-wrap gap-4 w-full max-w-full overflow-x-scroll no-scrollbar bg-charcoal p-4 rounded-md">
                            {nationData.allies?.map((ally: {name: string, uuid: string}) => (
                                <LocationItem
                                    key={`${nationData.name}-ally-${ally.uuid}`}
                                    name={ally.name}
                                    uuid={ally.uuid}
                                    type="nation"
                                ></LocationItem>
                            ))
                            }
                        </div>
                    </div>
                    )
                    :
                    null}
                    
                    {nationData.enemies?.length > 0 ?
                    (
                    <div className="flex flex-col items-start gap-4">
                        <h1 className="text-2xl text-blue1">
                            Enemies: {nationData.enemies.length}
                        </h1>
                        <div className="flex flex-wrap gap-4 w-full max-w-full overflow-x-scroll no-scrollbar bg-charcoal p-4 rounded-md">
                            {nationData.enemies?.map((enemy: {name: string, uuid: string}) => (
                                <LocationItem
                                    key={`${nationData.name}-ally-${enemy.uuid}`}
                                    name={enemy.name}
                                    uuid={enemy.uuid}
                                    type="nation"
                                ></LocationItem>
                            ))
                            }
                        </div>
                    </div>
                    )
                    :
                    null}
                    <div className="flex flex-col">
                        <h1 className="text-2xl text-blue1">Residents: {nationData.residents.length}</h1>
                        <div className="flex flex-wrap gap-4 bg-charcoal p-4 rounded-md">
                            {nationData.residents?.map((resident: {name: string, uuid: string}) => (
                                <Player
                                    key={`${nationData.name}-resident-${resident.uuid}`}
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
                            <h1 className={`font-bold ${nationData.status.isPublic ? `text-green-500` : `text-red-500`}`}>
                                {`${nationData.status.isPublic}`}
                            </h1>
                        </div>
                        <div className="flex gap-2">
                            <h1>
                                IsOpen:
                            </h1>
                            <h1 className={`font-bold ${nationData.status.isOpen ? `text-green-500` : `text-red-500`}`}>
                                {`${nationData.status.isOpen}`}
                            </h1>
                        </div>
                        <div className="flex gap-2">
                            <h1>
                                IsNeutral:
                            </h1>
                            <h1 className={`font-bold ${nationData.status.isNeutral ? `text-green-500` : `text-red-500`}`}>
                                {`${nationData.status.isNeutral}`}
                            </h1>
                        </div>
                    </div>
                    <Link href={`../shops/nation/${nationData.uuid}`} className="bg-charcoal rounded-full p-8 h-16 w-16 text-center flex justify-center items-center font-bold hover:cursor-pointer hover:bg-gray1 hover:text-aqua1">
                        Shops
                    </Link>
                </div>
            </div>
        </div>
    )
}