"use client"

import { useEffect, useState, Suspense } from 'react';
import { Player, type Shop } from '../../lib/types';
import { getPlayerData, renderPlayerShops, renderSkin } from '../../lib/queries';
import { useParams } from 'next/navigation';
import getRank from '../getRank';
import LocationItem from '../../location/LocationItem';
import ShopItem from '@/app/components/ShopItem';
import ShopLoading from '@/app/shops/ShopLoading';
import Shops from '@/app/shops/Shops';

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
            console.log(data);
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
          const data: Shop[] | null = await renderPlayerShops(uuid);
          console.log(data);
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
    
  if (loading) return <div className="p-4 text-white">Loading player data...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!playerData) return <div className="p-4 text-white">Player not found</div>;

  return (
    <div className="pt-16 flex flex-col w-full items-center">
      <div className="w-full sm:w-3/4 md:w-2/3">
        <div className="flex flex-col w-full gap-8 py-8">
          <div className="flex flex-row rounded-md">
            <h1 className="text-white text-4xl">
              {playerData.name}
            </h1>
            {highestRank && (
                <div className="has-tooltip pr-2 hover:cursor-pointer">
                  <span className="tooltip text-white -mt-6">{highestRank.name}</span>
                  <img className="w-12 h-12 -mt-1" src={highestRank.url} alt={highestRank.name} />
                </div>
            )}
            { playerData && playerData.status && playerData.status.isOnline ?
              <div className="has-tooltip hover:cursor-pointer right-0">
                <span className="tooltip text-white -mt-6">{`${playerData.name} is online`}</span>
                <span className="absolute bg-green-500 rounded-full w-3 h-3"></span>
              </div>
              :
              null
            }
          </div>
          <div className="flex flex-col items-center md:flex-row bg-gray1 w-full rounded-md bg-opacity-80 gap-8 py-4">
            <img 
              src={skinURL} 
              alt="Player avatar"
              className="w-32 aspect-square p-2 bg-blue1"
              onError={(e) => {
                console.log("Image failed to load, using fallback");
                e.currentTarget.src = `https://mc-heads.net/avatar/steve`;
              }}
            />
            <div className="flex flex-wrap items-center w-full justify-center md:justify-start gap-8">
              {playerData.nation?.uuid ? (
                <div className="flex flex-col items-center gap-2">
                  <h1 className="text-2xl font-bold text-blue1">
                    Nation
                  </h1>
                  <LocationItem
                    name={playerData.nation.name}
                    uuid={playerData.nation.uuid}
                    type="nation"
                  />
                </div>
              ) : null}
              {playerData.town && playerData.town.name ? (
                <div className="flex flex-col items-center gap-2">
                  <h1 className="text-2xl font-bold text-blue1">
                    Town
                  </h1>
                  <LocationItem
                    name={playerData.town.name}
                    uuid={playerData.town.uuid}
                    type="town"
                  />
                </div>
              ) : 
                null
              }
            </div>
          </div>
        </div>
        {playerShops && playerShops?.length > 0 ? 
          <div className="">
              {isShopLoading ? (
                <ShopLoading/>
              ) : (
                <Shops
                  data={playerShops}
                ></Shops>
              )}
          </div>
        : null}
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