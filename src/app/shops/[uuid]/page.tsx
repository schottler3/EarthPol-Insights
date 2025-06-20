"use client"
import { parseItemStack } from "@/app/lib/itemUtils";
import { getPlayerData, renderPlayerShop, renderSkin } from "@/app/lib/queries";
import { Player, Shop } from "@/app/lib/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import ShopLoading from "../ShopLoading";
import PlayerItem from "@/app/players/Player";
import LocationItem from "@/app/location/LocationItem";

export default function page() {

    const params = useParams();
    const uuid = params.uuid as string;
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
          const data: Shop | null = await renderPlayerShop(uuid);
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
        <div className="flex justify-center h-full items-center text-white font-bold">
            {isShopLoading ? <ShopLoading /> :
              <div className="flex flex-col md:flex-row h-full w-full p-8 md:p-32">
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
            }
        </div>
    )
}