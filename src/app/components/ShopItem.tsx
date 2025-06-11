import Link from "next/link";
import { EnchantmentInfo, parseItemStack } from "../lib/itemUtils";
import { type Shop } from "../lib/types";

export default function ShopItem({data}: {data: Shop}){
    const { raw, item, count, enchants } = parseItemStack(data.item || '');

    console.log(data)

    if(data.price >= 999)
        return null;

    return (
        <Link className="relative" href={`/shops/${data.id}`}>
            <div key={data.id} className="p-4 m-2 h-full bg-gray1 hover:text-aqua1 hover:bg-gray-600 rounded-md text-white">
            <img className="w-8 h-8" src={`https://mc.nerothe.com/img/1.21.4/minecraft_${raw}.png`}></img>
            <div className="flex flex-col">
                <div className="text-lg font-bold">{item} x {count}</div>
                <div>
                    {enchants.length > 0 && (
                        <div className="text-blue1 text-sm">
                            {enchants.map((enchant: EnchantmentInfo, index: number) => (
                                <div key={`enchant-${index}`}>
                                    {enchant.name} {enchant.level}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex flex-col text-sm">
                <span>Price: {data.price || '?'}</span>
                </div>
            </div>
            </div>
        </Link>
    );
}