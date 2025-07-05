"use client"
import React, { useEffect, useState, Suspense } from "react"
import { Shop } from "../lib/types";
import { renderShops } from "../lib/queries";
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