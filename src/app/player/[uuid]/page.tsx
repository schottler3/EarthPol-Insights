"use client"

import { useEffect, useState, Suspense } from 'react';
import { Player } from '../../lib/types';
import { getPlayerData, renderSkin } from '../../lib/queries';
import { useParams } from 'next/navigation';
import getRank from '../getRank';
import LocationItem from '../../location/LocationItem';

function PlayerContent() {
  const params = useParams();
  const uuid = params.uuid as string;
  const [skinURL, setSkinURL] = useState<string>();
  const [playerData, setPlayerData] = useState<Player | null>(null);
  const [highestRank, setHighestRank] = useState<{name: string, url: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderPlayer = async () => {
      try {
        if (uuid) {
          const data: Player | null = await getPlayerData(uuid);
          if (data) {
            setPlayerData(data);
            setHighestRank(getRank(data));
          }
          setSkinURL(await renderSkin(uuid));
        }
      } catch (err) {
        setError("Failed to load player data");
      } finally {
        setLoading(false);
      }
    };

    renderPlayer();
  }, [uuid]);
    
  if (loading) return <div className="p-4 text-white">Loading player data...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!playerData) return <div className="p-4 text-white">Player not found</div>;

  return (
    <div className="grid grid-cols-2 pt-16">
      <div className="flex flex-col gap-8 ml-8">
        <div className="flex flex-row items-center rounded-md">
          <h1 className="text-white text-4xl">
            {playerData.name}
          </h1>
          {highestRank && (
            <div className="has-tooltip hover:cursor-pointer">
              <span className="tooltip text-white -mt-6">{highestRank.name}</span>
              <img className="w-12 h-12 -mt-1" src={highestRank.url} alt={highestRank.name} />
            </div>
          )}
        </div>
        <div className="flex bg-gray1 w-1/2 rounded-md bg-opacity-80 gap-8">
          <img 
            src={skinURL} 
            alt="Player avatar"
            className="w-32 h-32 p-2 bg-blue1"
            onError={(e) => {
              console.log("Image failed to load, using fallback");
              e.currentTarget.src = `https://mc-heads.net/avatar/steve`;
            }}
          />
          <div className="flex flex-row items-center justify-evenly w-full">
            {playerData.nation?.uuid ? (
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl font-bold text-blue1">
                  Nation
                </h1>
                <LocationItem
                  name={playerData.nation.name}
                  uuid={playerData.nation.uuid}
                />
              </div>
            ) : null}
            {playerData.town ? (
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl font-bold text-blue1">
                  Town
                </h1>
                <LocationItem
                  name={playerData.town.name}
                  uuid={playerData.town.uuid}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div>
        {/* Right column content */}
      </div>
    </div>
  );
}

export default function PlayerPage() {
  return (
    <Suspense fallback={<div className="p-4 text-white">Loading...</div>}>
      <PlayerContent />
    </Suspense>
  );
}