"use client"
import { useEffect, useState } from "react"
import { Player } from "../lib/types";
import { getAllPlayerData, getOnlinePlayers } from "../lib/queries";
import Link from "next/link";
import OnlineIndicator from "../components/OnlineIndicator";

export default function page() {

    const [loadingPlayers, setLoadingPlayers] = useState<boolean>(true);
    const [players, setPlayers] = useState<Player[] | null>(null);
    const [onlinePlayers, setOnlinePlayers] = useState<Player[] | null>(null);
    const [renderedPlayers, setRenderedPlayers] = useState<Player[] | null>(null);
    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        const getPlayers = async () => {
          setLoadingPlayers(true);
          try {
            const data: Player[] | null = await getAllPlayerData();
            if (data) {
              setPlayers(data);
            }
            const onlineData: Player[] | null = await getOnlinePlayers();
            if(onlineData && data){
              setOnlinePlayers(onlineData);
              setRenderedPlayers(data.filter((player) => {
                return onlineData.find((onlinePlayer) => onlinePlayer.uuid != player.uuid);
              }))
            }
          } catch (err) {
            console.log("Failed to load all players");
          } finally {
            setLoadingPlayers(false);
          }
        };
    
        getPlayers();
      }, [])

    useEffect(() => {
      setRenderedPlayers(players?.filter((player) => {
        return player.name.includes(query)
      }) || null)
    }, [query])

    return (
      <div className="w-full h-full p-8">
        {loadingPlayers ? 
          <div className="flex h-full w-full justify-center text-3xl items-center text-center font-bold text-white">
            Finding Players...
          </div>
          :
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-white font-bold text-2xl"> {` Search Known Players (${players ? players.length : `0`})`}</h1>
              <input className="w-1/4 h-8 rounded-md" onChange={(e) => {setQuery(e.target.value)}} placeholder="Search Players"></input>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 text-white">
                { onlinePlayers?.map((player) => {
                    return (
                      <div key={`onlineList-${player.name}`} className="flex w-full bg-charcoal hover:bg-gray1">
                        <Link className="p-2 hover:text-aqua font-bold" href={`/players/${player.uuid}`} key={`Link-${player?.uuid}`}>
                          {player.name}
                        </Link>
                        <OnlineIndicator key={`Indicator-${player?.uuid}`} playerData={player || null}></OnlineIndicator>
                      </div>
                      )
                })}
                { renderedPlayers?.map((player) => {
                    return (
                      <div key={`playerList-${player.name}`} className="flex w-full bg-charcoal hover:bg-gray1">
                        <Link className="p-2 hover:text-aqua font-bold" href={`/players/${player.uuid}`} key={`Link-${player?.uuid}`}>
                          {player.name}
                        </Link>
                      </div>
                      )
                })}
            </div>
          </div>
            }
      </div>
    )
  }
