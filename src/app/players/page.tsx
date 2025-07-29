"use client"
import { useEffect, useState } from "react"
import { Player } from "../lib/types";
import { getAllPlayerData } from "../lib/queries";
import Link from "next/link";

export default function page() {

    const [loadingPlayers, setLoadingPlayers] = useState<boolean>(true);
    const [players, setPlayers] = useState<Player[] | null>(null);
    const [renderedPlayers, setRenderedPlayers] = useState<Player[] | null>(null);

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

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 p-8 text-white">
            { renderedPlayers?.map((player) => {
                return <Link href={`/players/${player.uuid}`} key={player.name}>{player.name}</Link>
            })}
        </div>
    )
}