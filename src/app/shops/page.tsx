"use client"
import { useEffect, useState, Suspense } from "react"
import { Shop } from "../lib/types";
import { renderShops } from "../lib/queries";
import ShopItem from "../components/ShopItem";
import ShopLoading from "./ShopLoading";
import Shops from "./Shops";

function ShopsContent() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shops, setShops] = useState<Shop[] | null>(null);

  useEffect(() => {
    const getShops = async () => {
      setIsLoading(true);
      try {
        const data: Shop[] | null = await renderShops();
        if (data) {
          setShops(data);
        }
      } catch (err) {
        console.log("Failed to load all shops");
      } finally {
        setIsLoading(false);
      }
    };

    getShops();
  }, [])

  return (
    <div>
      {isLoading ? 
        <div className="flex flex-col h-full items-center justify-center gap-16 pt-32">
            <h1 className="text-white text-5xl">Shops are Loading...</h1>
            <ShopLoading/>
        </div> 
      :
        <Shops
          data={shops}
        ></Shops>
      }
    </div>
  )
}

export default function ShopsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-white text-2xl mb-4">Loading Shops...</h1>
        <ShopLoading />
      </div>
    }>
      <ShopsContent />
    </Suspense>
  )
}