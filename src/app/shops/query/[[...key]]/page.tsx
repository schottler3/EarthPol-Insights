"use client"
import { useParams } from "next/navigation";

export default function page() {

    const params = useParams();
    const key = Array.isArray(params.key) ? params.key[0] : params.key;

    return <div>
        <h1>Search All Shops:</h1>
    </div> 
}