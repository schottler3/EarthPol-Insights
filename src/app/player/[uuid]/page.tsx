"use client"

import { useEffect, useState, Suspense } from 'react';
import { Player, Shop } from '../../lib/types';
import { getPlayerData, renderShops, renderSkin } from '../../lib/queries';
import { useParams } from 'next/navigation';
import getRank from '../getRank';
import LocationItem from '../../location/LocationItem';

function PlayerContent() {
  const params = useParams();
  const uuid = params.uuid as string;
  const [skinURL, setSkinURL] = useState<string>();
  const [playerData, setPlayerData] = useState<Player | null>(null);
  const [playerShops, setPlayerShops] = useState<Shop[] | null>(null);
  const [highestRank, setHighestRank] = useState<{name: string, url: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [isShopLoading, setIsShopLoading] = useState(true);
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

    const getShops = async () => {
      try {
        if (uuid) {
          setIsShopLoading(true);
          const data: Shop[] | null = await renderShops(uuid);
          if (data) {
            setPlayerShops(data);
          }
        }
      } catch (err) {
        setError("Failed to load player shops");
      } finally {
        setIsShopLoading(false);
      }
    };

    renderPlayer();
    getShops();
  }, [uuid]);

  function parseItemStack(itemString: string): { raw: string, item: string, count: number } {
    let raw = "unknown_item";
    let item = "Unknown Item";
    let count = 0;
    
    // Match pattern: ItemStack{ITEM_NAME x NUMBER}
    const regex = /ItemStack\{([A-Z_]+) x (\d+)(?:,.*?)?\}/;
    const match = itemString.match(regex);
    
    if (match && match.length >= 3) {
      const toSplit = match[1].split('_');
      
      raw = toSplit.join('_').toLowerCase();
      
      item = toSplit
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      
      count = parseInt(match[2], 10);
    }
    
    return { raw, item, count };
}
    
  if (loading) return <div className="p-4 text-white">Loading player data...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!playerData) return <div className="p-4 text-white">Player not found</div>;

  return (
    <div className="grid grid-cols-2 pt-16 h-full">
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
      {playerShops && playerShops?.length > 0 ? 
        <div>
          <h1 className="text-3xl text-white font-bold">Shops:</h1>
          {isShopLoading ? (
            <div className="flex justify-center items-center h-full w-full">
              <div className="animate-spin h-24 w-40 flex flex-col items-center justify-evenly text-white font-bold leading-none" style={{ backgroundImage: "url('/images/Oak.webp')" }}>
                <span className="mb-0 pb-0">Username</span>
                <span className="my-0 py-0">Amount</span>
                <span className="my-0 py-0">Price</span>
                <span className="mt-0 pt-0">Item</span>
              </div>
            </div>
          ) : (
            <div>
              {playerShops.map((shop) => {
                console.log(shop)
                const { raw, item, count } = parseItemStack(shop.item || '');
                return (
                  <div key={shop.id} className="p-4 m-2 bg-gray1 rounded-md text-white">
                    <img className="w-8 h-8" src={`https://mc.nerothe.com/img/1.21.4/minecraft_${raw}.png`}></img>
                    <div className="flex flex-col">
                      <div className="text-lg font-bold">{item} x {count}</div>
                      <div className="flex flex-col text-sm">
                        <span>Price: {shop.price || '?'}</span>
                        <span>Available: {shop.stock || '?'}</span>
                        <span>{shop.location?.world || 'Unknown'} ({shop.location?.x || '?'},{shop.location?.z || '?'})</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
          }
        </div>
        :
        null
      }
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