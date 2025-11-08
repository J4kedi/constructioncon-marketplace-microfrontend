'use client';

import ConstructionconLogo from "./constructioncon-logo";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { mainNavLinks } from "@/lib/contants";
import { Navigation } from "./Navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-gradient-to-b from-background to-secondary/5 dark:from-background dark:to-secondary/10 backdrop-blur-sm sticky top-0 z-50 border-b border-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <ConstructionconLogo />
          <div className="flex-1 flex justify-center">
            <Navigation
              links={mainNavLinks}
              navClassName="hidden md:flex md:items-center md:space-x-8"
              linkClassName="text-text hover:text-primary transition-colors"
            />
          </div>
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <Link
              href="/carrinho"
              className="relative p-2 rounded-full text-text hover:bg-accent transition-colors mr-4"
            >
              <ShoppingCart />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
