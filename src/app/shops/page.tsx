"use client"
import React, { useEffect, useState, Suspense } from "react"
import { Shop } from "../lib/types";
import { renderShops } from "../lib/queries";
import ShopLoading from "./ShopLoading";
import Shops from "./Shops";
import { useAppContext } from "../context/AppContext";

function ShopsContent() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { shops, setShops } = useAppContext();

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

    if(shops.length <= 0)
      getShops();
    else
      setIsLoading(false);
  }, [])

  return (
    <div className="h-full flex justify-center">
      {isLoading ? 
          <ShopLoading/>
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