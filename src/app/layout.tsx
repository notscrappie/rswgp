import localFont from 'next/font/local';
import type { Metadata } from 'next';
import { Footer } from '@components';
import './globals.css';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'RSWGP',
	description: 'For those of you who have too many games in their wishlist and don\'t know what to play.',
};

export default function RootLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
			>
				{children}
				<Footer />
			</body>
		</html>
	);
}
