export type ResolveVanityResponse = {
    response: {
        steamid: string;
    }
}

export type IGetWishlist = {
    response: {
        items: {
            appid: number;
        }[];
    }
}

export type ISteamGame = {
    fetchGameJson: {
        [appid: number]: {
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
}