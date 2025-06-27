import { EnchantmentInfo, parseItemStack } from "../lib/itemUtils";
import { type Shop } from "../lib/types";
import { Dispatch, SetStateAction } from 'react';

export default function ShopItem({data, setSelectedShop}: {data: Shop, setSelectedShop: Dispatch<SetStateAction<string | null>>}){
    const { raw, item, count, enchants } = parseItemStack(data.item || '');
    const proportion = data.stock / count;
    const spaceProportion = data.space / count;

    return (
        <div className="relative hover:cursor-pointer" onClick={() => setSelectedShop(data.id)}>
            <div key={data.id} className="p-4 h-full bg-gray1 hover:text-aqua1 hover:bg-gray-600 rounded-md text-white">
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
            { data.stock < 0 ?
                <div className={`absolute top-4 right-4 ${data.space > 0 ? (spaceProportion < .5 ? `text-orange-500` : (spaceProportion >= 1 ? `text-green-500` : `text-yellow-500`)) : `text-red-500`}`}>
                    Space: {data.space}
                </div>
                :
                <div className={`absolute top-4 right-4 ${data.stock > 0 ? (proportion < .5 ? `text-orange-500` : (proportion >= 1 ? `text-green-500` : `text-yellow-500`)) : `text-red-500`}`}>
                    Stock: {data.stock}
                </div>
            }
            </div>
        </div>
    );
}