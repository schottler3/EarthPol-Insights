import Image from 'next/image';

export default function Header(){
    const headerHeight = "h-24";

    return (
        <>
            <div className={`w-screen ${headerHeight}`}>
            </div>

            <div className={`fixed top-0 left-0 ${headerHeight} bg-white z-50 w-screen flex items-center`}>
                <Image 
                    className={`${headerHeight} ml-4`}
                    src="/images/EPMC-Insights-Logo.svg"
                    alt="EPMC Logo"
                    width={96}
                    height={96}
                />
                <div className="text-blue1 text-2xl font-bold">
                    <h2>
                        Insights
                    </h2>
                </div>
            </div>
        </>
    )
}