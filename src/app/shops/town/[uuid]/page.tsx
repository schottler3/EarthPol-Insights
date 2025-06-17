"use client"
import { renderNation, renderShops, renderTown } from "@/app/lib/queries";
import { Shop, Town } from "@/app/lib/types";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Shops from "../../Shops";
import ShopLoading from "../../ShopLoading";

type PlayerSnip = {
    name: string
    uuid: string
}

export default function Page(){
    const params = useParams();
    const uuid = params.uuid as string;
    const [townData, setTownData] = useState<Town | null>(null);
    const [shopsData, setShopsData] = useState<Shop[] | null>(null);
    const [townShops, setTownShopsData] = useState<Shop[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let shopsLoaded = false;
        let townLoaded = false;

        const checkAllLoaded = () => {
            if (shopsLoaded && townLoaded) {
                setIsLoading(false);
            }
        };

        const getData = async () => {
            try {
                const data = await renderTown(uuid);
                if(data != null) {
                    setTownData(data);
                }
            } catch(Error) {
                console.log(Error);
            } finally {
                townLoaded = true;
                checkAllLoaded();
            }
        }

        const getAllShops = async () => {
            try {
                const shops = await renderShops();
                setShopsData(shops);
                console.log("Shops loaded:", shops?.length || 0);
            } catch(error) {
                console.error("Error loading shops:", error);
            } finally {
                shopsLoaded = true;
                checkAllLoaded();
            }
        }

        getAllShops();
        getData();
    }, [uuid])

    useEffect(() => {
        if(townData && shopsData){
            const filteredShops = shopsData.filter((shop:Shop) => {
                return townData.residents.some((resident: PlayerSnip) => resident.uuid === shop.owner);
            });
            
            setTownShopsData(filteredShops);            
        }
    }, [townData, shopsData])

    return (
        <div className="h-full">
            {isLoading ? <ShopLoading /> : (
                <Suspense fallback={<></>}>
                    {townShops && townShops.length > 0 ? (
                        <Shops data={townShops} />
                    ) : (
                        <div className="p-4 text-center text-white">
                            No shops found for this towns's residents.
                        </div>
                    )}
                </Suspense>
            )}
        </div>
    )
}