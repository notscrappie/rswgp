import type { UserWishlist, SteamGame, ResolveVanityResponse } from '@/types';
import { HTTPException } from 'hono/http-exception';

const steamAPIKey = process.env.STEAM_WEB_API_KEY;

/**
 * Fetches the user's vanity URL from the Steam API.
 * @param steamId The user's steam ID.
 * @returns A response object containing the user's SteamID64.
 */
export async function resolveVanityURL(steamId: string): Promise<ResolveVanityResponse> {
	const res = await fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${steamAPIKey}&vanityurl=${steamId}`);
	const data = await res.json() as ResolveVanityResponse;

	if (data.response.message === 'No match') throw new HTTPException(400, {
		message: 'Couldn\'t find the specified Steam user, please check your Steam ID or vanity URL.',
	});

	return data;
}

/**
 * Gets the user's Steam Wishlist from the Steam API.
 * @param steamId The user's Steam ID.
 * @returns A response object with an array of game IDs.
 */
export async function getWishlist(steamId: string): Promise<UserWishlist> {
	const res = await fetch(`https://api.steampowered.com/IWishlistService/GetWishlist/v1/?key=${steamAPIKey}&steamid=${steamId}`);

	if (!res.ok) throw new HTTPException(400, {
		message: 'Couldn\'t fetch the user\'s wishlist, it\'s probably private or you have nothing in it.',
	});

	return await res.json() as UserWishlist;
}

/**
 * Gets the game's information from the Steam API based on the provided app ID.
 * @param appId The app ID of the app.
 * @returns A response object with the app's information.
 */
export async function getGameDetails(appId: number): Promise<SteamGame> {
	const res = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}`);
	if (!res.ok) throw new HTTPException(400, { message: 'Couldn\'t fetch game data.' });

	return await res.json() as SteamGame;
}

/**
 * Determines the type of Steam ID. Supports vanity URL links and direct Steam64 IDs.
 * @param str The string provided by the user.
 * @returns The user ID of the person.
 */
export function determineSteamID(str: string | null) {
	if (!str) return null;
	let userId: string;

	// splits the ID into 4, 4th element will always be the user's Steam ID
	if (/^https:\/\/steamcommunity\.com\/id\/([a-zA-Z0-9_%\-]+)\/?$/i.test(str)) {
		userId = str.split('/')[4];
		return userId;
	};

	// case 2: checks against a Steam ID regex (steam IDs are always 17 numbers long)
	if (/^[0-9]{17}$/.test(str)) {
		userId = str;
		return userId;
	};

	// case 3 (default): if both fail, it's just a normal user steam ID
	userId = str;
	return userId;
}
