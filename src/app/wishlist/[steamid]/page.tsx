'use client';

import { useGame } from "@/app/hooks/useGame"
import { GameCard } from "@/components/ui/gameCard";
import { usePathname } from "next/navigation";
import { LuLoader2 } from "react-icons/lu";
import { MdError } from "react-icons/md";

export default function WishlistPage() {
    const steamId = usePathname().split('/')[2];
    const { data, status, error } = useGame(steamId);

   if (status === 'pending') return (
        <div className="h-screen flex items-center justify-center text-center">
            <LuLoader2 className="mr-1 animate-spin" />
            <h1 className="font-sans font-semibold">Choosing the perfect game for you...</h1>
        </div>
    );

   if (status === 'error') return (
        <div className="h-screen flex items-center justify-center text-center">
            <MdError className="mr-1 w-[18px] h-[18px]" />
            <h1 className="font-sans font-semibold">An error has occured: {error.message}</h1>
        </div>
    )

    return (
        <div className="flex justify-center items-center text-center flex-col min-h-screen mt-3">
            <h1 className="text-center text-2xl font-sans font-semibold mb-5">The game you'll be checking out today is...</h1>
            <GameCard game={data} />
        </div>
    );
}