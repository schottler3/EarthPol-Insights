import Image from 'next/image';

export default function Header(){

    return (
        <div className="fixed flex sm:h-16 md:h-20 lg:h-24 bg-white z-50 w-screen items-center">
            <Image 
                className="h-16 md:h-20 lg:h-24 ml-4"
                src="/images/EPMC-Insights-Logo.svg"
                alt="EPMC Logo"
                width={96}
                height={96}
            />
            <div className=" text-blue1 text-2xl font-bold">
                <h2>
                    Insights
                </h2>
            </div>
        </div>
    )
}