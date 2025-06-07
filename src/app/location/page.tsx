"use client"

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { renderLocation } from "../lib/queries";
import { isTown, Nation, Town } from "../lib/types";
import TownPage from "../town/TownPage";
import NationPage from "../nation/NationPage";

export default function NationDetail() {
  const params = useSearchParams();
  const uuid = params.get('uuid');
  const [locationData, setLocationData] = useState<Nation | Town | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLocation() {
        try {
        if(uuid){
            const data = await renderLocation(uuid, false);
            setLocationData(data);
            setLoading(false);
        }
        } catch (err) {
        setError("Failed to load nation data");
        setLoading(false);
        }
    }

    if (uuid) {
        loadLocation();
    }
  }, [uuid]);

  return (
    <>
      <div className="min-h-screen text-white">
        {loading ? (
          <div className="p-4">Loading...</div>
        ) : error ? (
          <div className="p-4 text-red-500">{error}</div>
        ) : locationData ? (
            isTown(locationData) ? 
                (<TownPage townData={locationData as Town} />)
                :
                (<NationPage nationData={locationData as Nation} />)
        ) : (
          <div className="p-4">Nation not found</div>
        )}
      </div>
    </>
  );
}