'use client';

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components';
import { Code, Globe, List, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { SteamGame } from '@/types';
import { ReactNode } from 'react';
import Link from 'next/link';

export function GameCard({ game }: { game: SteamGame }) {
	const router = useRouter();
	const appid = Number(Object.keys(game)[0]);
	const gameData = game[appid].data;

	return (
		<Card className="bg-[#1a1a1a] text-white rounded-lg shadow-md overflow-hidden w-full max-w-3xl mx-auto p-4 md:p-6 mb-10">
			<CardHeader className="p-2">
				<CardTitle className="font-sans font-semibold text-lg md:text-xl text-left overflow-wrap">
					{gameData.name}
				</CardTitle>
				<CardDescription className="font-sans text-sm text-white/70 mt-2 text-left overflow-wrap">
					{gameData.short_description}
				</CardDescription>
			</CardHeader>
			<CardContent className="p-2 space-y-3">
				<InfoRow icon={<Code className='w-[18px] h-[18px]' />} label="Developed by" content={gameData.developers.join(', ')} />
				<InfoRow icon={<Globe className='w-[18px] h-[18px]' />} label="Published by" content={gameData.publishers.join(', ')} />
				<InfoRow icon={<List className='w-[18px] h-[18px]' />} label="Genres" content={gameData.genres.map((genre) => genre.description).join(', ')} />
				<InfoRow icon={<Calendar className='w-[18px] h-[18px]' />} label="Release Date" content={gameData.release_date.date} />
				<video
					src={gameData.movies[0]?.mp4?.max || ''}
					controls
					className="w-full aspect-video rounded-lg"
				/>
			</CardContent>
			<CardFooter className="font-sans font-semibold text-black flex flex-col sm:flex-row gap-4 mt-4 w-full">
				<Button className="flex-1 w-full sm:w-auto text-center p-3" onClick={() => router.refresh()}>I'm feeling lucky again</Button>
				<Link className="flex-1 w-full" href={`https://store.steampowered.com/app/${gameData.steam_appid}`}>
					<Button className="w-full text-center p-3">Visit Steam Page</Button>
				</Link>
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