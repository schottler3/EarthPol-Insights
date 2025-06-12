"use client"
import { useState } from "react";
import ShopItem from "../components/ShopItem";
import { Shop } from "../lib/types";
import Category from "../components/Category";
import { BuildingBlocks, ColoredBlocks, Combats, Food, Functionals, Materials, NaturalBlocks, parseItemStack, RedstoneItems, Tools } from "../lib/itemUtils";

export default function Shops({data}: {data: Shop[] | null}){

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [renderedShops, setRenderedShop] = useState<Shop[] | null>(data);

    const handleCategoryClick = (category: string) => {
        // Update selected categories list
        const newSelectedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(cat => cat !== category)
            : [...selectedCategories, category];
        
        setSelectedCategories(newSelectedCategories);

        // Apply filter based on the updated list of selected categories
        setRenderedShop(data ? data.filter(shop => {
            const { raw } = parseItemStack(shop.item || '');
            
            // If no categories selected, show all shops
            if (newSelectedCategories.length === 0) {
                return true;
            }
            
            // Check if item belongs to any selected category
            if (newSelectedCategories.includes("tools") && Tools.includes(raw)) return true;
            if (newSelectedCategories.includes("materials") && Materials.includes(raw)) return true;
            if (newSelectedCategories.includes("food") && Food.includes(raw)) return true;
            if (newSelectedCategories.includes("building") && BuildingBlocks.includes(raw)) return true;
            if (newSelectedCategories.includes("colored") && ColoredBlocks.includes(raw)) return true;
            if (newSelectedCategories.includes("natural") && NaturalBlocks.includes(raw)) return true;
            if (newSelectedCategories.includes("functional") && Functionals.includes(raw)) return true;
            if (newSelectedCategories.includes("redstone") && RedstoneItems.includes(raw)) return true;
            if (newSelectedCategories.includes("combat") && Combats.includes(raw)) return true;
            
            return false;
        }) : null);
    }

    const handleSearch = (query: string) =>{
        setRenderedShop(data ? data.filter(shop => {
            return shop.item?.toLowerCase().includes(query.toLowerCase()) || false;
        }) : null);
    }

    return (
        <div className="h-full sm:pt-4 p-4 flex flex-col gap-2">
            <input onChange={(e) => handleSearch(e.target.value)} className="rounded-md sm:w-1/4 p-2" placeholder={`Search Items`}></input>
            <div className="flex text-blue1 *:bg-charcoal gap-4 flex-wrap select-none">
                <Category
                    onClick={() => handleCategoryClick("tools")}
                    name="Tools"
                />
                <Category
                    onClick={() => handleCategoryClick("materials")}
                    name="Materials"
                />
                <Category
                    onClick={() => handleCategoryClick("food")}
                    name="Food"
                />
                <Category
                    onClick={() => handleCategoryClick("building")}
                    name="Building"
                />
                <Category
                    onClick={() => handleCategoryClick("colored")}
                    name="Colored"
                />
                <Category
                    onClick={() => handleCategoryClick("natural")}
                    name="Natural"
                />
                <Category
                    onClick={() => handleCategoryClick("functional")}
                    name="Functional"
                />
                <Category
                    onClick={() => handleCategoryClick("redstone")}
                    name="Redstone"
                />
                <Category
                    onClick={() => handleCategoryClick("combat")}
                    name="Combat"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                {renderedShops && renderedShops.length > 0 ?
                renderedShops.map((shop: Shop, index: number) => (

                    <ShopItem
                    key={`Shop-${shop.owner}-${shop.id}`}
                    data={shop}
                    />
                ))
                : <div className="text-center text-white p-8">No shops found</div>
                }
            </div>
        </div>
    )
}