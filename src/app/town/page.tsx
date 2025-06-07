"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { renderTown } from "../lib/queries";
import { Nation, Town } from "../lib/types";
import TownPage from "./TownPage";

export default function NationDetail() {
  const params = useSearchParams();
  const uuid = params.get('uuid');
  const [townData, setTownData] = useState<Town | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTown() {
      try {
        if(uuid){
          const data = await renderTown(uuid, false);
          setTownData(data as Town);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to load nation data");
        setLoading(false);
      }
    }

    if (uuid) {
      loadTown();
    }
  }, [uuid]);

  return (
    <>
      <div className="min-h-screen text-white">
        {loading ? (
          <div className="p-4">Loading...</div>
        ) : error ? (
          <div className="p-4 text-red-500">{error}</div>
        ) : townData ? (
          <TownPage townData={townData} />
        ) : (
          <div className="p-4">Town not found</div>
        )}
      </div>
    </>
  );
}