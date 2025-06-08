"use client"

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import { renderLocation } from "../lib/queries";
import { isTown, Nation, Town } from "../lib/types";
import TownPage from "../town/TownPage";
import NationPage from "../nation/NationPage";

function LocationContent() {
  const params = useParams();
  const uuid = params.uuid as string;
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
        setError("Failed to load location data");
        setLoading(false);
      }
    }

    if (uuid) {
      loadLocation();
    }
  }, [uuid]);

  return (
    <div className="min-h-screen text-white">
      {loading ? (
        <div className="p-4">Loading...</div>
      ) : error ? (
        <div className="p-4 text-red-500">{error}</div>
      ) : locationData ? (
        isTown(locationData) ? 
          <TownPage townData={locationData} /> :
          <NationPage nationData={locationData} />
      ) : (
        <div className="p-4">Location not found</div>
      )}
    </div>
  );
}

export default function LocationDetailPage() {
  return (
    <Suspense fallback={<div className="p-4 text-white">Loading location data...</div>}>
      <LocationContent />
    </Suspense>
  );
}