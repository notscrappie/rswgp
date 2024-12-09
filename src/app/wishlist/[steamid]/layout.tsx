import { Header } from '@/components/ui/header';
import { ReactNode } from 'react';

export default function WishlistLayout({ children }: { children: ReactNode }) {
	return (
		<div className="bg-black text-white overflow-hidden">
			<Header />
			{children}
		</div>
	);
}