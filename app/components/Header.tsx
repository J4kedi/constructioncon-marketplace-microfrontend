
'use client'

import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useCart } from "@/app/context/CartContext";
import { ShoppingCart } from "lucide-react";

export function Header() {
    const { state } = useCart();
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between p-4">
                <Link href="/">
                    <h1 className="text-2xl font-bold">Marketplace</h1>
                </Link>
                <div className="flex items-center gap-4">
                    <ThemeSwitcher />
                    <Link href="/cart">
                        <div className="relative p-2 rounded-md hover:bg-secondary/20 transition-colors">
                            <ShoppingCart size={20} />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                    {itemCount}
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}
