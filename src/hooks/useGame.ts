import { QueryClient, useQuery } from '@tanstack/react-query';
import type { SteamGame } from '@/types';

const client = new QueryClient();

export function useGame(steamId: string) {
	return useQuery({
		queryFn: async () => {
			const res = await fetch(`/api/wishlist/${steamId}`);
			const data = await res.json();

			if (!res.ok) {
				throw new Error(`${data.message} (${res.status})`);
			};

			return data as SteamGame;
		},
		queryKey: ['wishlist_user'],
	}, client);
}