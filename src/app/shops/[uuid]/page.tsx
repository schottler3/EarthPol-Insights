"use client"
import { useParams } from "next/navigation";
import ShopComponent from "../ShopComponent";

export default function page() {

    const params = useParams();
    const uuid = params.uuid as string;
    
    return (
      <ShopComponent
        uuid={uuid}
      ></ShopComponent>
    )
}