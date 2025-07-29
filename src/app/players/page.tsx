"use client"
import { useEffect, useState } from "react"
import { Player } from "../lib/types";
import { getAllPlayerData } from "../lib/queries";
import Link from "next/link";
import { event } from "firebase-functions/v1/analytics";

export default function page() {

    const [loadingPlayers, setLoadingPlayers] = useState<boolean>(true);
    const [players, setPlayers] = useState<Player[] | null>(null);
    const [renderedPlayers, setRenderedPlayers] = useState<Player[] | null>(null);
    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        const getPlayers = async () => {
          setLoadingPlayers(true);
          try {
            const data: Player[] | null = await getAllPlayerData();
            if (data) {
                console.log(data)
              setPlayers(data);
              setRenderedPlayers(data);
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
                { renderedPlayers?.map((player) => {
                    return <Link className="hover:text-aqua1 bg-charcoal font-bold hover:bg-gray1 p-2" href={`/players/${player.uuid}`} key={player.name}>{player.name}</Link>
                })}
            </div>
          </div>
            }
      </div>
    )
}