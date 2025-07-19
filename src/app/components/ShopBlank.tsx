export default function BlankShop(){
    return (
        <div className="opacity-100">
            <div className="p-4 h-full loadingBackground hover:text-aqua1 hover:bg-gray-600 rounded-md text-white">
                <div className="flex flex-wrap justify-between">
                    <div className="w-8 h-8 rounded"></div>
                    <div className="flex flex-wrap *:px-1 right-4 w-2/3 justify-end">
                        {/* Empty space to maintain layout */}
                    </div>
                </div>
                
                <div className="flex flex-col pt-4">
                    <div className="text-lg font-bold">&nbsp;</div>
                    <div>
                        &nbsp;
                    </div>
                    <div className="flex flex-col text-sm">
                        &nbsp;
                    </div>
                </div>
            </div>
        </div>
    );
}