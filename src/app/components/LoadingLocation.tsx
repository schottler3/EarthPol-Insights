export default function LoadingLocation() {
    return (
        <div className="flex flex-col gap-16 h-full justify-center items-center">
            <h1 className="text-white w-full text-center text-5xl">Locations are Loading...</h1>
            <img className="animate-spin w-1/4 h-auto" src="/images/Earth.svg"></img>
        </div>
    )
}