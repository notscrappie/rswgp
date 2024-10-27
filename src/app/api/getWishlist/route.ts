import { IGetWishlist, ISteamGame, ResolveVanityResponse } from "@/types";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const reqSteamId = searchParams.get('steamId');
    const steamAPIKey = process.env.STEAM_WEB_API_KEY;

    // TODO: Don't use that endpoint anymore. Use https://store.steampowered.com/api/appdetails?appids=3259470 to get games.
    // TODO: Use https://steamapi.xpaw.me/#IWishlistService/GetWishlist to get the user's wishlist.

    if (!steamAPIKey) throw Error('You must supply a Steam API Key in the .env file in order for the website to work properly.')

    const getId = await fetch(`
        https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${steamAPIKey}&vanityurl=${reqSteamId}`
    );

    if (!getId) return new Response(`Couldn\'t find the specified Steam user, please check your Steam ID or vanity URL.`, {
        status: 400,
    });

    const json = await getId.json() as ResolveVanityResponse;
    const steamId = json.response.steamid;

    const wishlist = await fetch(
        `https://api.steampowered.com/IWishlistService/GetWishlist/v1/?key=${steamAPIKey}&steamid=${steamId}`
    );

    if (!wishlist) return new Response('Couldn\'t fetch the user\'s wishlist, it\'s probably private or you have nothing in it.', {
        status: 400,
    });

    const wishlistJson = await wishlist.json() as IGetWishlist;

    const rng = Math.floor(Math.random() * wishlistJson.response.items.length);
    const randomlySelectedGame = wishlistJson.response.items[rng];

    const fetchGame = await fetch(
        `https://store.steampowered.com/api/appdetails?appids=${randomlySelectedGame.appid}`
    )

    if (!fetchGame) return new Response('Couldn\'t fetch game data.', {
        status: 400,
    });

    const fetchGameJson = await fetchGame.json() as ISteamGame;
    
    return Response.json({ fetchGameJson });
}