export default function shopLoading() {
    return (
        <div className="flex justify-center items-center h-full w-full">
            <div className="animate-spin h-24 w-40 flex flex-col items-center justify-evenly text-white font-bold leading-none" style={{ backgroundImage: "url('/images/Oak.webp')" }}>
            <span className="mb-0 pb-0">Username</span>
            <span className="my-0 py-0">Amount</span>
            <span className="my-0 py-0">Price</span>
            <span className="mt-0 pt-0">Item</span>
            </div>
        </div>
    )
}