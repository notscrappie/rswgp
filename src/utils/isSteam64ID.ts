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