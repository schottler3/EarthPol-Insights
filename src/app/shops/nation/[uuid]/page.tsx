"use client"
import { renderNation, renderShops } from "@/app/lib/queries";
import { Nation, Shop } from "@/app/lib/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Shops from "../../Shops";
import ShopLoading from "../../ShopLoading";

type PlayerSnip = {
    name: string
    uuid: string
}

export default function Page(){
    const params = useParams();
    const uuid = params.uuid as string;
    const [nationData, setNationData] = useState<Nation | null>(null);
    const [shopsData, setShopsData] = useState<Shop[] | null>(null);
    const [nationShops, setNationShopsData] = useState<Shop[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let shopsLoaded = false;
        let nationLoaded = false;

        const checkAllLoaded = () => {
            if (shopsLoaded && nationLoaded) {
                setIsLoading(false);
            }
        };

        const getData = async () => {
            try {
                const data = await renderNation(uuid);
                if(data != null) {
                    setNationData(data);
                }
            } catch(Error) {
                console.log(Error);
            } finally {
                nationLoaded = true;
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
        if(nationData && shopsData){
            const filteredShops = shopsData.filter((shop:Shop) => {
                return nationData.residents.some((resident: PlayerSnip) => resident.uuid === shop.owner);
            });
            
            console.log("Nation residents:", nationData.residents.length);
            console.log("Filtered shops:", filteredShops.length);
            setNationShopsData(filteredShops);            
        }
    }, [nationData, shopsData])

    return (
        <div className="h-full">
            {isLoading ? <ShopLoading /> : (
                <>
                    {nationShops && nationShops.length > 0 ? (
                        <Shops data={nationShops} />
                    ) : (
                        <div className="p-4 text-center text-white">
                            No shops found for this nation's residents.
                        </div>
                    )}
                </>
            )}
        </div>
    )
}