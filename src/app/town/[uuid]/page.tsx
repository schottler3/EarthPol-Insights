"use client"

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import TownPage from "../TownPage";
import { Town } from "../../lib/types";
import { renderTown } from "../../lib/queries";

function TownContent() {
  const params = useParams();
  const uuid = params.uuid as string;
  const [townData, setTownData] = useState<Town | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTown() {
      try {
        if(uuid){
          const data: Town | null = await renderTown(uuid);
          setTownData(data);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to load town data");
        setLoading(false);
      }
    }

    if (uuid) {
      loadTown();
    }
  }, [uuid]);

  return (
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
  );
}

export default function TownDetailPage() {
  return (
    <Suspense fallback={<div className="p-4 text-white">Loading town data...</div>}>
      <TownContent />
    </Suspense>
  );
}