import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { rateLimiter } from 'hono-rate-limiter';

import { handle } from 'hono/vercel';
import { getGameDetails, getWishlist, resolveVanityURL } from '@/lib/steam';
import { HTTPException } from 'hono/http-exception';

const app = new Hono().basePath('/api');

app.use(cors({
	allowMethods: ['GET'],
	origin: process.env.WEB_URL as string,
}));
app.use(csrf({
	origin: process.env.WEB_URL as string,
}));
app.use(rateLimiter({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-6',
	keyGenerator: (c) => {
		const header = c.req.header('x-forwarded-for');
		return `${header}-${c.req.path.split('/')[3]}`;
	},
}));

app.get('/wishlist/:steamId', async (c) => {
	if (!process.env.STEAM_WEB_API_KEY) throw Error('You must supply a Steam API Key in the .env file in order for the website to work properly.');
	const steamID = c.req.param('steamId');

	try {
		const steamVanity = await resolveVanityURL(steamID);

		const wishlist = await getWishlist(steamVanity.response.steamid);
		if (!wishlist.response.items) throw new HTTPException(400, {
			message: 'Couldn\'t fetch the user\'s wishlist, it\'s probably private or you have nothing in it.',
		});

		const randomGame = wishlist.response.items[
			Math.floor(Math.random() * wishlist.response.items.length)
		];
		const gameDetails = await getGameDetails(randomGame.appid);

		return c.json(gameDetails);
	}
	catch (err) {
		if (err instanceof HTTPException) {
			return c.json({ status: err.status, message: err.message }, err.status);
		}
	}
});

export const GET = handle(app);
export const POST = handle(app);