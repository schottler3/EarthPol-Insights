"use client"
import { useEffect, useState } from "react";
import ShopItem from "../components/ShopItem";
import { Nation, Player, Shop } from "../lib/types";
import Category from "../components/Category";
import { BuildingBlocks, ColoredBlocks, Combats, Food, Functionals, Materials, NaturalBlocks, parseItemStack, RedstoneItems, Tools } from "../lib/itemUtils";
import ShopComponent from "./ShopComponent";
import useScreenSize from "../hooks/useScreenSize";
import ShopBlank from "../components/ShopBlank";
import { useAppContext } from "../context/AppContext";
import { getPlayerData, renderAllyShops, renderSkin } from "../lib/queries";
import BrowsingAs from "../components/BrowsingAs";

export default function Shops({data}: {data: Shop[] | null}){

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    const screenSize = useScreenSize();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedShop, setSelectedShop] = useState<string | null>(null);
    
    const [noOutShops, setNoOutShops] = useState<Shop[] | null>(null);
    const [renderedShops, setRenderedShops] = useState<Shop[] | null>(null);
    const [middlewareShops, setMiddlewareShops] = useState<Shop[] | null>(null);

    const [isSelling, setIsSelling] = useState<boolean>(true);
    const [showOuts, setShowOuts] = useState<boolean>(false);
    const [bestDeals, setBestDeals] = useState<boolean>(true);

    const [searchQuery, setSearchQuery] = useState<string>("");

    const [numBlanks, setNumBlanks] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const [onlyAllies, setOnlyAllies] = useState<boolean>(false);
    const [allyShops, setAllyShops] = useState<Shop[] | null>(null);

    const { user } = useAppContext(); 
    const [localUser, setLocalUser] = useState<Player | null>(null);
    const [skinURL, setSkinURL] = useState<string | null>(null);

    useEffect(() => {
        if(query)
            setSearchQuery(query);
    },[query])

    useEffect(() => { 
        if (screenSize.width >= 1536) {
            // XL screens
            setNumBlanks(20);
        } 
        else if (screenSize.width >= 1280) {
            // Large screens
            setNumBlanks(20);
        }
        else if (screenSize.width >= 1024) {
            // Medium screens
            setNumBlanks(16);
        }
        else if (screenSize.width >= 768) {
            // Small screens
            setNumBlanks(12);
        }
        else if (screenSize.width >= 640) {
            // Extra small screens
            setNumBlanks(8);
        }
        else {
            // Smaller than extra small screens
            setNumBlanks(5);
        }
    }, [screenSize])

    useEffect(() => {
        const fetchAllyShops = async () => {
            if(!allyShops && user && user.nation){
                const gotAllyShops: Shop[] | null = await renderAllyShops(user.nation.uuid);
                if(gotAllyShops){
                    setAllyShops(gotAllyShops);
                }
            }
            else if(!allyShops && localUser && localUser.nation){
                const gotAllyShops: Shop[] | null = await renderAllyShops(localUser.nation.uuid);
                if(gotAllyShops){
                    setAllyShops(gotAllyShops);
                }
            }
        }
        fetchAllyShops();

    },[user])

    useEffect(() => {
        const fetchUserData = async () => {
            if(user?.userName) {
                setLocalUser(await getPlayerData(user.userName))
            }
        }

        fetchUserData();
    },[user])

    useEffect(() => {
        setRenderedShops(null);
        setLoading(true);
    }, [onlyAllies, showOuts, isSelling])

    useEffect(() => {
        const getData = async () => {
            if (user?.userName) {
                setLocalUser(await getPlayerData(user.userName) || null)
            }
            else {
                const localUserName: string | null = localStorage.getItem(`userName`);

                if(localUserName)
                    setLocalUser(await getPlayerData(localUserName));
            }
        }
        getData();
    }, [user])

    useEffect(() => {
        if(data){
            setNoOutShops(data.filter(shop => {
                return shop.type === "BUYING" && shop.space <= 0 ? false :
                shop.type === "SELLING" && shop.stock <= 0 ? false : true;
            }));
        } else {
            setNoOutShops([]);
        }
    },[data])

    useEffect(() => {
        const getDetails = async () => {
            var localUsername: string | null = localStorage.getItem('userName');
            if(localUsername){
                setLocalUser(await getPlayerData(localUsername))
            }
        }

        getDetails();
    }, [])

    useEffect(() => {
        const sortItems = () => {
            if (middlewareShops) {
                const sortedShops = [...middlewareShops].sort((a:Shop, b:Shop) => {
                    const { item: itemA, count: countA } = parseItemStack(a.item || '');
                    const { item: itemB, count: countB } = parseItemStack(b.item || '');
                    
                    // Primary sort by item name
                    if (itemA !== itemB) {
                        return itemA.localeCompare(itemB);
                    }
                    
                    // Secondary sort by price
                    if(bestDeals)
                        return a.price/countA - b.price/countB;
                    else
                        return b.price/countB - a.price/countA;
                });
                
                if (JSON.stringify(sortedShops) !== JSON.stringify(renderedShops)) {
                    setRenderedShops(sortedShops);
                }
            }
        };

        sortItems();
    }, [middlewareShops, bestDeals])

    useEffect(() => {
        setLoading(false);
    }, [renderedShops])

     useEffect(() => {
        if(!user?.authUser){
            setAllyShops(null)
            setOnlyAllies(false);
        }
    }, [user])

    useEffect(() => {
    const updateItems = () => {

        var currentData: Shop[] | null = null;

        if(onlyAllies && allyShops) {
            // Respect showOuts toggle for ally shops
            if(showOuts) {
                currentData = allyShops;
            } else {
                currentData = allyShops.filter(shop => {
                    return shop.type === "BUYING" && shop.space <= 0 ? false :
                    shop.type === "SELLING" && shop.stock <= 0 ? false : true;
                });
            }
        } else if(showOuts) {
            currentData = data;
        } else {
            currentData = noOutShops;
        }

        // Apply filter based on the updated list of selected categories
        setMiddlewareShops(currentData ? currentData.filter(shop => {
            const { raw, item } = parseItemStack(shop.item || '');

            if (isSelling && shop.type === "BUYING"){
                return false;
            }
            if(!isSelling && shop.type === "SELLING"){
                return false;
            }

            if(shop.price >= 999)
                return false;

            if (searchQuery && searchQuery.length > 0 && 
                !shop.item.toLowerCase().includes(searchQuery.toLowerCase()) && 
                !item.toLowerCase().includes(searchQuery.toLowerCase()))
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

}, [selectedCategories, searchQuery, noOutShops, showOuts, isSelling, onlyAllies, allyShops])

    const handleCategoryClick = (category: string) => {
        // Update selected categories list
        const newSelectedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(cat => cat !== category)
            : [...selectedCategories, category];
        
        setSelectedCategories(newSelectedCategories);
    }
    
    const clearSelectedShop = () => {setSelectedShop(null);};  

    const clearFilters = () => {
        setSearchQuery("");
        const searchInput = document.getElementById("itemSearch") as HTMLInputElement;
        if (searchInput) searchInput.value = "";
        setSelectedCategories([]);
        setShowOuts(false);
        setIsSelling(true);
    }

    return (
        selectedShop ? 
            <ShopComponent
                uuid={selectedShop}
                onBack={clearSelectedShop}
            />
        :
        <div className="h-full w-full sm:pt-4 p-4 pt-8 flex flex-col gap-2">
            <div className="flex">
                <div className="flex flex-col w-full gap-4 items-center md:items-start">
                    <div className="block md:hidden">
                        <BrowsingAs
                            localUser={localUser}
                        >
                        </BrowsingAs>
                    </div>
                    <div className="flex flex-wrap w-full gap-4 items-center">
                        <input onChange={(e) => {setSearchQuery(e.target.value);}} id="itemSearch" className="rounded-md md:w-1/4 w-full p-2" placeholder={`Search Items`}></input>
                        <div className="flex relative h-min gap-6 text-blue1 font-bold items-center bg-charcoal rounded-full py-1 hover:cursor-pointer">
                            <span className={`absolute first-letter:top-0 bg-aqua1 w-1/2 h-full rounded-full transition-all ease-linear duration-100 ${isSelling ? 'translate-x-0' : 'translate-x-full'}`}></span>
                            <h1 onClick={() => {setIsSelling(true);}} className="z-0 pl-2">
                                Selling
                            </h1>
                            <h1 onClick={() => {setIsSelling(false);}} className="z-0 pr-2">
                                Buying
                            </h1>
                        </div>
                        <div className="flex relative h-min gap-6 text-blue1 font-bold items-center bg-charcoal rounded-full py-1 hover:cursor-pointer">
                            <span className={`absolute top-0 bg-aqua1 w-1/2 h-full rounded-full transition-all ease-linear duration-100 ${showOuts ? 'translate-x-0' : 'translate-x-full'}`}></span>
                            <h1 onClick={() => {setShowOuts(true);}} className="z-0 pl-2">
                                Show Outs
                            </h1>
                            <h1 onClick={() => {setShowOuts(false);}} className="z-0 pr-2">
                                Hide Outs
                            </h1>
                        </div>
                        { localUser || (user && user.nation && user.nation.uuid) ?
                            <div className="flex relative h-min gap-6 text-blue1 font-bold items-center bg-charcoal rounded-full py-1 hover:cursor-pointer">
                                <span className={`absolute top-0 bg-aqua1 w-1/2 h-full rounded-full transition-all ease-linear duration-100 ${onlyAllies ? 'translate-x-0' : 'translate-x-full'}`}></span>
                                <h1 onClick={() => {setOnlyAllies(true);}} className="z-0 pl-2">
                                    Only Allies
                                </h1>
                                <h1 onClick={() => {setOnlyAllies(false);}} className="z-0 pr-2">
                                    All Nations
                                </h1>
                            </div>
                            :
                            null
                        }
                        <div className="flex relative h-min gap-6 text-blue1 font-bold items-center bg-charcoal rounded-full py-1 hover:cursor-pointer">
                            <span className={`absolute z-40 top-0 bg-aqua1 w-1/2 h-full rounded-full transition-all ease-linear duration-100 ${bestDeals ? 'translate-x-0' : 'translate-x-full'}`}></span>
                            <h1 onClick={() => {setBestDeals(true);}} className="z-50 pl-2">
                                Best Deals
                            </h1>
                            <h1 onClick={() => {setBestDeals(false);}} className="z-50 pr-2">
                                Worst Deals
                            </h1>
                        </div>
                    </div>
                    <div className="flex gap-8">
                        <div className="flex h-min md:max-w-[75vw] lg:max-w-[50vw] text-blue1 *:bg-gray1 bg-charcoal p-2 rounded-md gap-4 flex-wrap select-none hover:*:text-aqua1">
                            <Category
                                onClick={() => handleCategoryClick("tools")}
                                name="Tools"
                                isSelected={selectedCategories.includes("tools")}
                            />
                            <Category
                                onClick={() => handleCategoryClick("materials")}
                                name="Materials"
                                isSelected={selectedCategories.includes("materials")}
                            />
                            <Category
                                onClick={() => handleCategoryClick("food")}
                                name="Food"
                                isSelected={selectedCategories.includes("food")}
                            />
                            <Category
                                onClick={() => handleCategoryClick("building")}
                                name="Building"
                                isSelected={selectedCategories.includes("building")}
                            />
                            <Category
                                onClick={() => handleCategoryClick("colored")}
                                name="Colored"
                                isSelected={selectedCategories.includes("colored")}
                            />
                            <Category
                                onClick={() => handleCategoryClick("natural")}
                                name="Natural"
                                isSelected={selectedCategories.includes("natural")}
                            />
                            <Category
                                onClick={() => handleCategoryClick("functional")}
                                name="Functional"
                                isSelected={selectedCategories.includes("functional")}
                            />
                            <Category
                                onClick={() => handleCategoryClick("redstone")}
                                name="Redstone"
                                isSelected={selectedCategories.includes("redstone")}
                            />
                            <Category
                                onClick={() => handleCategoryClick("combat")}
                                name="Combat"
                                isSelected={selectedCategories.includes("combat")}
                            />
                                <div onClick={clearFilters} className="hover:cursor-pointer px-2 text-white hover:!text-aqua1 rounded-full font-bold ml-auto">
                                    Clear Filters
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <BrowsingAs
                            localUser={localUser}
                        >
                        </BrowsingAs>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 pt-0">
                    {renderedShops && renderedShops.length > 0 && !loading ? (
                        renderedShops?.map((shop: Shop) => (
                            <ShopItem
                                key={`Shop-${shop.owner}-${shop.id}`}
                                data={shop}
                                setSelectedShop={setSelectedShop}
                            />
                        ))
                    ) : renderedShops && renderedShops.length === 0 && !loading ? (
                        <div className="text-white font-bold">
                            No Matching Shops
                        </div>
                    ) : (
                        Array.from({ length: numBlanks }).map((_, index) => (
                            <ShopBlank 
                                key={`blankShop-${index}`}
                            />
                        ))
                    )}
                </div>
            </div>
    )
}