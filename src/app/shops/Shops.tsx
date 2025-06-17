"use client"
import { useEffect, useState } from "react";
import ShopItem from "../components/ShopItem";
import { Shop } from "../lib/types";
import Category from "../components/Category";
import { BuildingBlocks, ColoredBlocks, Combats, Food, Functionals, Materials, NaturalBlocks, parseItemStack, RedstoneItems, Tools } from "../lib/itemUtils";

export default function Shops({data}: {data: Shop[] | null}){

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [renderedShops, setRenderedShop] = useState<Shop[] | null>(data);
    const [isSelling, setIsSelling] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        if(query)
            setSearchQuery(query);
    },[])

    useEffect(() => {
        const updateItems = () => {

            // Apply filter based on the updated list of selected categories
            setRenderedShop(data ? data.filter(shop => {
                const { raw, item } = parseItemStack(shop.item || '');

                if (isSelling && shop.type === "BUYING"){
                    return false;
                }
                if(!isSelling && shop.type === "SELLING"){
                    return false;
                }

                if (searchQuery && searchQuery.length > 0 && !item.toLowerCase().includes(searchQuery.toLowerCase()))
                    return false;

                // Check if item belongs to any selected category
                if(selectedCategories.length > 0){
                    if (selectedCategories.includes("tools") && Tools.includes(raw)) return true;
                    if (selectedCategories.includes("materials") && Materials.includes(raw)) return true;
                    if (selectedCategories.includes("food") && Food.includes(raw)) return true;
                    if (selectedCategories.includes("building") && BuildingBlocks.includes(raw)) return true;
                    if (selectedCategories.includes("colored") && ColoredBlocks.includes(raw)) return true;
                    if (selectedCategories.includes("natural") && NaturalBlocks.includes(raw)) return true;
                    if (selectedCategories.includes("functional") && Functionals.includes(raw)) return true;
                    if (selectedCategories.includes("redstone") && RedstoneItems.includes(raw)) return true;
                    if (selectedCategories.includes("combat") && Combats.includes(raw)) return true;

                    return false;
                }
                
                return true;
            }) : null);
        }

        updateItems();
    }, [selectedCategories, searchQuery, data, isSelling])

    const handleCategoryClick = (category: string) => {
        // Update selected categories list
        const newSelectedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(cat => cat !== category)
            : [...selectedCategories, category];
        
        setSelectedCategories(newSelectedCategories);
    }

    return (
        <div className="h-full sm:pt-4 p-4 flex flex-col gap-2">
            <div className="flex gap-4">
                <input onChange={(e) => {setSearchQuery(e.target.value);}} className="rounded-md sm:w-1/4 p-2" placeholder={`Search Items`}></input>
                <div className="flex relative gap-6 text-blue1 font-bold items-center bg-charcoal rounded-full px-4 py-1 hover:cursor-pointer">
                    <span className={`absolute z-40 top-0 bg-aqua1 w-1/2 h-full rounded-full transition-all ease-linear duration-100 ${isSelling ? '-translate-x-4' : 'translate-x-3/4'}`}></span>
                    <h1 onClick={() => {setIsSelling(true);}} className="z-50">
                        Selling
                    </h1>
                    <h1 onClick={() => {setIsSelling(false);}} className="z-50">
                        Buying
                    </h1>
                </div>
            </div>
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