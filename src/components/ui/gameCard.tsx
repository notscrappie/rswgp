'use client';

import { ISteamGame } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { MdCategory, MdEventAvailable, MdPublish } from "react-icons/md";
import { SiGamedeveloper } from "react-icons/si";
import { ReactNode } from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export function GameCard({ game }: { game: ISteamGame }) {
    const router = useRouter();
    const appid = Number(Object.keys(game.fetchGameJson)[0]);
    const gameData = game.fetchGameJson[appid].data;

    return (
        <Card className="bg-[#1a1a1a] text-white rounded-lg shadow-md overflow-hidden max-w-lg mx-auto ml-2 mr-2">
            <CardHeader className="p-4">
                <CardTitle className="font-sans font-semibold text-lg text-center">
                    {gameData.name}
                </CardTitle>
                <CardDescription className="font-sans text-sm text-white/70 mt-1 text-left">
                    {gameData.short_description}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
                <InfoRow icon={<SiGamedeveloper />} label="Developed by" content={gameData.developers.join(", ")} />
                <InfoRow icon={<MdPublish />} label="Published by" content={gameData.publishers.join(", ")} />
                <InfoRow icon={<MdCategory />} label="Genres" content={gameData.genres.map((genre) => genre.description).join(", ")} />
                <InfoRow icon={<MdEventAvailable />} label="Release Date" content={gameData.release_date.date} />
                <video
                    src={gameData.movies[0]?.mp4?.max}
                    controls
                    className="w-full max-w-screen-sm rounded-lg mt-4 mx-auto"
                />
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row">
                <Button className="font-sans text-semibold text-black w-full mr-1" onClick={() => router.refresh()}>I'm feeling lucky today</Button>
                <Button className="font-sans text-semibold text-black w-full ml-1" onClick={() => router.push(`https://store.steampowered.com/app/${gameData.steam_appid}`)}>Visit Steam Page</Button>
            </CardFooter>
        </Card>
    );
}

function InfoRow({ icon, label, content }: { icon: ReactNode; label: string; content: string }) {
    return (
        <div className="flex items-center text-sm space-x-2">
            <span className="bg-white/20 p-2 rounded-lg shadow-md flex items-center">
                <span className="text-white">{icon}</span>
            </span>
            <h1 className="font-semibold text-white">{label}:</h1>
            <p className="ml-1 text-white/80">{content}</p>
        </div>
    );
}