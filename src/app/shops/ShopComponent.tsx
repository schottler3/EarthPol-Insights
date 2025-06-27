"use client"
import { parseItemStack } from "@/app/lib/itemUtils";
import { getPlayerData, renderPlayerShop, renderSkin } from "@/app/lib/queries";
import { Player, type Shop } from "@/app/lib/types";
import { useEffect, useState } from "react"
import ShopLoading from "./ShopLoading";
import PlayerItem from "@/app/players/Player";
import LocationItem from "@/app/location/LocationItem";

export default function ShopComponent({uuid, onBack}: {uuid: string | null, onBack?: () => void}) {

    const [isShopLoading, setIsShopLoading] = useState(true);
    const [shopData, setShopData] = useState<Shop | null>(null);
    const [skinURL, setSkinURL] = useState<string | null>(null);
    const [playerData, setPlayerData] = useState<Player | null>(null);
    const [isLoadingPlayer, setIsLoadingPlayer] = useState<boolean>(true);

    useEffect(() => {
    const getShop = async () => {
      setIsShopLoading(true);
      try {
        if (uuid) {
          console.log("The uuid is: " + uuid)
          const data: Shop | null = await renderPlayerShop(`${uuid}`);
          if (data) {
            setShopData(data);
          } else {
            console.log("Shop not found");
          }
        }
      } catch (err) {
        console.error("Failed to load player shop:", err);
        console.log("Failed to load shop data");
      } finally {
        setIsShopLoading(false);
      }
    };

    getShop();
  }, [uuid]);

  useEffect(() => {
    const loadPlayerData = async () => {
      if (!shopData || !shopData.owner) return;
      
      setIsLoadingPlayer(true);
      try {
        const data: Player | null = await getPlayerData(shopData.owner);
        if (data) {
          setPlayerData(data);
          setSkinURL(await renderSkin(shopData.owner));
        }
      } catch (err) {
        console.error("Failed to load player data:", err);
      } finally {
        setIsLoadingPlayer(false);
      }
    };

    loadPlayerData();
  }, [shopData]);

    const { raw, item, count } = parseItemStack(shopData?.item || '');

    return (
        <div className="flex relative justify-center h-full items-center text-white font-bold">
          {onBack && (
            <button 
                onClick={onBack}
                className="absolute top-4 left-4 bg-charcoal hover:bg-gray-600 p-2 rounded-md z-10 text-aqua1"
            >
                ← Back to Shops
            </button>
          )}
          
            {isShopLoading ? <ShopLoading /> :
              <div className="flex flex-col justify-center items-center h-full w-full p-8 md:p-32 gap-4">
                <div className="flex justify-start gap-4 *:h-min w-full items-center">
                  <div className="flex flex-col">
                    <h1>
                      Share This Shop:
                    </h1>
                    <h1 className="bg-charcoal p-2 rounded-md text-aqua1 hover:cursor-text">
                      {`https://earthpol-insights.cc/shops/${shopData?.id}`}
                    </h1>
                  </div>
                  <svg onClick={() => navigator.clipboard.writeText(`https://earthpol-insights.cc/shops/${shopData?.id}`)} 
                    className="hover:cursor-pointer fill-aqua1 stroke-aqua1 hover:fill-white hover:stroke-white w-6" 
                    width="189" height="206" viewBox="0 0 189 206" xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="32" cy="96" r="32"/>
                    <circle cx="143" cy="32" r="32"/>
                    <path d="M32 96L142.851 32" strokeWidth="16"/>
                    <circle cx="143.255" cy="160.255" r="32" transform="rotate(-135 143.255 160.255)"/>
                    <path d="M142.851 160L32 96" strokeWidth="16"/>
                  </svg>
                </div>
                <div className="flex flex-col relative md:flex-row h-full w-full">
                  <div className="flex relative flex-col w-full justify-around gap-4 p-16 items-center bg-charcoal md:rounded-l-md">
                      {shopData && playerData && skinURL ?
                          <div className="flex justify-between items-center w-full absolute top-0 left-0 p-4">
                              <h1>Owner </h1>
                              <PlayerItem
                                  name={playerData.name}
                                  uuid={shopData.owner}
                              ></PlayerItem>
                          </div>
                          : null
                      }
                      <div className="flex flex-col gap-2 relative items-center border-2 border-aqua1 p-8 rounded-md bg-gray1">
                          <img src={`https://mc.nerothe.com/img/1.21.4/minecraft_${raw}.png`}></img>
                          <div className="flex gap-2">
                              <h1 className="text-blue1">{count}</h1>
                              <h1>{item}</h1>
                          </div>
                          <h1>${shopData?.price}</h1>
                          <div className="flex gap-2 text-center">
                            { shopData && shopData.stock >= 0 ? (
                              <div>
                                Stock:
                                {shopData.stock > 0 ? (
                                  <h1 className="text-green-500">
                                    {shopData.stock}
                                  </h1>
                                ) : (
                                  <h1 className="text-red-500">
                                    Out
                                  </h1>
                                )}
                              </div>
                            ) : (
                              <div>
                                Space: {shopData ? shopData.space : `error`}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="flex gap-16">
                        {playerData && playerData.town ? (
                          <div className="flex flex-col gap-2 text-center text-aqua1">
                            <h1>Town</h1>
                            <LocationItem
                              name={playerData?.town?.name}
                              uuid={playerData?.town?.uuid}
                              type="town"
                            ></LocationItem>
                          </div>
                        ) : null}
                        {playerData && playerData.nation?.uuid ? (
                          <div className="flex flex-col gap-2 text-center text-aqua1">
                            <h1>Nation</h1>
                            <LocationItem
                              name={playerData?.nation?.name}
                              uuid={playerData?.nation?.uuid}
                              type="nation"
                            ></LocationItem>
                          </div>
                        ) : null}
                      </div>
                  </div>
                  <iframe src={`https://earthpol.com/map/#world:${shopData?.location.x}:0:${shopData?.location.z}:50:0:0:0:1:flat`} className="w-full h-full sm:mt-0 md:rounded-r-md" sandbox="allow-same-origin allow-scripts">
                  </iframe>
                </div>
              </div>
            }
        </div>
    )
}