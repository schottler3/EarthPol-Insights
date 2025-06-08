import Link from "next/link";

export default function LocationItem({name, uuid, type}: {name: string, uuid: string, type?: string}) {
    const getHref = () => {
        if (type === 'nation') return `/nation/${uuid}`;
        else return `/town/${uuid}`;
    };

    return (
        <div className="relative">
            <div className="flex flex-col items-center hover:cursor-pointer">
                <Link 
                    href={getHref()}
                    className="hover:text-blue1 flex flex-col items-center font-bold text-white"
                >
                    <img
                        className="w-10 h-10 rounded-full" 
                        src="/images/Earth.svg"
                        alt={`${name}`}
                    />
                    {name}
                </Link>
            </div>
        </div>
    )
}