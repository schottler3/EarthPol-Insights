export default function AskUser() {
    return (
        <div>
            <div className="absolute top-1/2 left-2 w-4 h-auto -translate-y-1/2 -translate-x-full rotate-180 hover:cursor-pointer hover:w-5 stroke-gray-600 hover:stroke-aqua1 transition-all ease-in-out">
                <svg viewBox="0 0 93 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M84.0002 9.28926L13.2896 79.9999L48.6449 115.355L84.0002 150.711" strokeWidth="18" strokeLinecap="round"/>
                </svg>
            </div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg relative">
                    <div className="text-center">
                        Is this your account?
                    </div>
                </div>
            </div>
        </div>
    )
}