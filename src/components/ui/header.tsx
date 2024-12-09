import Link from 'next/link';

export function Header() {
	return (
		<header>
			<Link href='/'>
				<h1 className="font-mono hover:text-white/70 text-white font-semibold text-3xl text-center mt-8">RSWGP</h1>
			</Link>
			<p className="font-sans text-white/70 text-sm text-center">For those of you who have too many games in their wishlist.</p>
		</header>
	);
}