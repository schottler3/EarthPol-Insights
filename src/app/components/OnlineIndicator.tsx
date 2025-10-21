import { Player } from "../lib/types"

export default function OnlineIndicator({ playerData }: { playerData: Player | null}) {
    return (
        playerData?.status.isOnline ?
        <div className="has-tooltip hover:cursor-pointer">
            <span className="tooltip text-white -mt-6">{`${playerData?.name} is online`}</span>
            <span className="absolute right-0 top-0 bg-green-500 rounded-full w-3 h-3"></span>
        </div>
        :
        null
    )
}