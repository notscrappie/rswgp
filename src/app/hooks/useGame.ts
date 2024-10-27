import { ISteamGame } from "@/types";
import { QueryClient, useQuery } from "@tanstack/react-query";

const client = new QueryClient();

export function useGame(steamId: string) {
    return useQuery({
        queryFn: async () => {
            const res = await fetch(`/api/getWishlist?steamId=${steamId}`);
            return await res.json() as ISteamGame;
        },
        queryKey: ['wishlist_user']
    }, client);
}