"use client"
import { useEffect, useState, Suspense } from "react"
import { Shop } from "../lib/types";
import { renderShops } from "../lib/queries";
import ShopItem from "../components/ShopItem";
import ShopLoading from "./ShopLoading";

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
    <div className="h-full">
      {isLoading ? 
        <div className="flex flex-col h-full items-center justify-center">
          <h1 className="text-white text-5xl pt-32">Shops are Loading...</h1>
          <ShopLoading/>
        </div> 
        :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {shops && shops.length > 0 ?
            shops.map((shop: Shop, index: number) => (
              <ShopItem
                key={`Shop-${shop.owner}-${shop.id}`}
                data={shop}
              />
            ))
            : <div className="col-span-full text-center text-white p-8">No shops found</div>
          }
        </div>
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