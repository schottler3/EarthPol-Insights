"use client"

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { renderNation } from "../lib/queries";
import NationPage from "./NationPage";
import Header from "../components/Header";
import { Nation } from "../lib/types";
import LeftMenu from "../components/LeftMenu";

export default function NationDetail() {
  const params = useSearchParams();
  const uuid = params.get('uuid');
  const [nationData, setNationData] = useState<Nation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNation() {
      try {
        if(uuid){
          const data = await renderNation(uuid, false);
          setNationData(data as Nation);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to load nation data");
        setLoading(false);
      }
    }

    if (uuid) {
      loadNation();
    }
  }, [uuid]);

  return (
    <>
      <div className="min-h-screen text-white">
        {loading ? (
          <div className="p-4">Loading...</div>
        ) : error ? (
          <div className="p-4 text-red-500">{error}</div>
        ) : nationData ? (
          <NationPage nationData={nationData} />
        ) : (
          <div className="p-4">Nation not found</div>
        )}
      </div>
    </>
  );
}