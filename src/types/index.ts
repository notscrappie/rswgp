export type ResolveVanityResponse = {
    /** The response object containing the Steam ID, message and success code. */
    response: {
        /** The resolved SteamID64. */
        steamid: string;
        /** The success code of the request. */
        success: number;
        /** The message returned back from the API (this usually spits back the errors like "Not found"). */
        message?: string;
    }
}

export type UserWishlist = {
    /** The response object containing an array of items that contains app IDs, their priority & date added timestamp. */
    response: {
        /** The array of items. */
        items: {
            /** The app's Steam app ID. */
            appid: number;
        }[];
    }
}

export type SteamGame = {
    [appid: number]: {
        success: boolean;
        data: {
            type: 'game';
            name: string;
            steam_appid: number;
            is_free: boolean;
            detailed_description: string;
            about_the_game: string;
            short_description: string;
            header_image: string;
            capsule_image: string;
            capsule_imagev5: string;
            developers: string[];
            publishers: string[];
            categories: {
                id: number;
                description: string;
            }[];
            genres: {
                id: number;
                description: string;
            }[];
            movies: {
                id: number;
                name: string;
                webm?: {
                    480?: string;
                    max?: string;
                };
                mp4?: {
                    480?: string;
                    max?: string;
                };
            }[];
            release_date: {
                date: string;
            };
            background: string;
        }
    }
}
