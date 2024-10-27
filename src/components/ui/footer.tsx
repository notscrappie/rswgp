import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full fixed bottom-0 text-center bg-[#0f0f0f] p-2 text-white overflow-hidden">
            <p className="text-sm font-sans text-semibold text-white/40">Created with love by <Link href='https://github.com/notscrappie' className="cursor-pointer">scrappie</Link> @ Spearhead Labs.</p>
            <p className="text-xs font-sans text-semibold text-white/40">This is an open source project, you can find the source code <Link href='https://github.com/notscrappie'>here.</Link></p>
        </footer>
    );
}