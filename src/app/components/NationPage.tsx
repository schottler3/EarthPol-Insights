import { Nation } from "../types";

export default function NationPage({nationData}: {nationData: Nation}){
    return (
        <div className="w-full px-8">
            <div className="text-6xl text-center">
                {nationData.name}
            </div>
            <div className="flex items-center justify-center -gap-1">
                <svg 
                    width="100%" 
                    height="12" 
                    viewBox="0 0 180 12" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className=""
                >
                    <path d="M0.226497 6L6 11.7735L11.7735 6L6 0.226497L0.226497 6ZM179.774 6L174 0.226497L168.226 6L174 11.7735L179.774 6ZM6 6V7H174V6V5H6V6Z" fill="white"/>
                </svg>
            </div>
            <div className="text-md flex flex-col items-center">
                <div>
                    {nationData.board}
                </div>
                <div>
                    {nationData.capital.name}
                </div>
                <div>
                    {`${nationData.coordinates.spawn.x},${nationData.coordinates.spawn.y},${nationData.coordinates.spawn.z}`}
                </div>
                <div>
                    {nationData.allies?.map((ally: {name: string, uuid: string}) => (
                        <div key={`${nationData.name}-${ally.uuid}`}>
                            {ally.name}
                        </div>
                    ))}
                </div>
                <div>
                    {nationData.enemies?.map((enemy: {name: string, uuid: string}) => (
                        <div key={`${nationData.name}-${enemy.uuid}`}>
                            {enemy.name}
                        </div>
                    ))}
                </div>
                <div>
                    {nationData.king.name}
                </div>
                <div>
                    {nationData.ranks.coleader?.map((coleader: {name: string, uuid: string}) => (
                        <div key={`${nationData.name}-${coleader.uuid}`}>
                            {coleader.name}
                        </div>
                    ))}
                </div>
                <div>
                    {nationData.ranks.minister?.map((minister: {name: string, uuid: string}) => (
                        <div key={`${nationData.name}-${minister.uuid}`}>
                            {minister.name}
                        </div>
                    ))}
                </div>
                <div>
                    {nationData.ranks.minister?.map((minister: {name: string, uuid: string}) => (
                        <div key={`${nationData.name}-${minister.uuid}`}>
                            {minister.name}
                        </div>
                    ))}
                </div>
                <div>
                    {nationData.ranks.minister?.map((minister: {name: string, uuid: string}) => (
                        <div key={`${nationData.name}-${minister.uuid}`}>
                            {minister.name}
                        </div>
                    ))}
                </div>
                <div>
                    {nationData.ranks.minister?.map((minister: {name: string, uuid: string}) => (
                        <div key={`${nationData.name}-${minister.uuid}`}>
                            {minister.name}
                        </div>
                    ))}
                </div>
                <div>
                    {nationData.residents?.map((resident: {name: string, uuid: string}) => (
                        <div key={`${nationData.name}-${resident.uuid}`}>
                            {resident.name}
                        </div>
                    ))}
                </div>
                <div>
                    {nationData.stats.numTownBlocks}
                </div>
                <div>
                    {nationData.stats.numResidents}
                </div>
                <div>
                    {nationData.stats.numTowns}
                </div>
                <div>
                    {nationData.stats.numAllies}
                </div>
                <div>
                    {nationData.stats.numEnemies}
                </div>
                <div>
                    {nationData.stats.balance}
                </div>
                <div>
                    {nationData.status.isPublic}
                </div>
                <div>
                    {nationData.status.isOpen}
                </div>
                <div>
                    {nationData.status.isNeutral}
                </div>
                <div>
                    {nationData.timestamps.registered}
                </div>
                <div>
                    {nationData.towns?.map((town: {name: string, uuid: string}) => (
                        <div key={`${nationData.name}-${town.uuid}`}>
                            {town.name}
                        </div>
                    ))}
                </div>
                 <div> 
                    <iframe src="https://earthpol.com/map/#world:23077:0:-14620:500:0:0:0:1:flat" width="800px" height="600px" sandbox="allow-same-origin allow-scripts">
                    </iframe>
                </div>
            </div>

        </div>
    )
}