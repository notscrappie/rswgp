import { Footer } from "@/components/ui/footer";
import { ReactNode } from "react";

export default function WishlistLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-black text-white">
            {children}
        </div>
    )
}