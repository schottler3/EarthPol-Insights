"use client"
import { useEffect, useRef, useState } from "react"
import NationItem from "./nation/NationItem";
import Header from "./components/Header";
import { FAKECUBA, FAKENATIONS, isTown, Nation, Town, USINGFAKE } from "./lib/types";
import NationPage from "./nation/NationPage";
import TownPage from "./town/TownPage";
import useScreenSize from "./hooks/useScreenSize"
import LeftMenu from "./components/LeftMenu";

interface NationItem {
  index: number;
  name: string;
  uuid: string;
}

export default function EarthPol() {

    return (
        <div>
            <h1 className="text-red-500 font-bold">
                This is the homepage silly ass ass ass ass ass
            </h1>
        </div>
    )
}