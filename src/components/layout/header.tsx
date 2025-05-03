'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Search, ShoppingCart, User, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Genres', href: '/genres' },
  // { name: 'Authors', href: '/authors' }, // Uncomment when ready
  // { name: 'Blog', href: '/blog' }, // Uncomment when ready
  // { name: 'Community', href: '/community' }, // Uncomment when ready
  // { name: 'About', href: '/about' }, // Uncomment when ready
  // { name: 'Contact', href: '/contact' }, // Uncomment when ready
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure theme toggle works correctly after mount

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const CurrentThemeIcon = theme === 'dark' ? Moon : Sun;

  // Avoid rendering theme-dependent UI until mounted
   if (!mounted) {
     // Render a placeholder or null during server rendering/hydration
     return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-16 flex items-center transition-all duration-300">
             <div className="container mx-auto px-4 flex items-center justify-between h-full">
               {/* Placeholder structure */}
               <div className="flex items-center gap-2">
                 <BookOpen className="h-6 w-6 text-primary" />
                 <span className="font-bold text-xl">LitLink</span>
               </div>
               <div className="flex items-center gap-4">
                 <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
                 <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
                 <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
                 <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
               </div>
             </div>
           </header>
     );
   }


  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300',
        isScrolled ? 'h-14 shadow-sm' : 'h-16'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        {/* Logo and Mobile Menu Trigger */}
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 pt-6">
               <nav className="flex flex-col space-y-2 px-4">
                   {navItems.map((item) => (
                     <SheetClose key={item.href} asChild>
                        <Link href={item.href}>
                          <Button variant="ghost" className="w-full justify-start text-lg py-3">
                             {item.name}
                          </Button>
                       </Link>
                     </SheetClose>
                   ))}
               </nav>
               <div className="absolute bottom-4 left-4 right-4">
                  <Button variant="outline" className="w-full" onClick={toggleTheme}>
                      Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
                  </Button>
               </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden sm:inline">LitLink</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-2 md:gap-4">
           {/* Search */}
           <div className={cn("relative transition-all duration-300 ease-in-out", isSearchExpanded ? "w-48" : "w-10")}>
              <Button
                  variant="ghost"
                  size="icon"
                  className={cn("absolute right-0 top-1/2 -translate-y-1/2 z-10", isSearchExpanded && "text-foreground/50 hover:text-foreground")}
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                  aria-label={isSearchExpanded ? "Close search" : "Open search"}
                >
                  {isSearchExpanded ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>
               <Input
                  type="search"
                  placeholder="Search books..."
                  className={cn(
                    "h-10 pl-4 pr-10 transition-all duration-300 ease-in-out",
                    isSearchExpanded ? "w-full opacity-100" : "w-0 opacity-0 pointer-events-none"
                  )}
                  onBlur={() => setTimeout(() => setIsSearchExpanded(false), 150)} // Delay blur to allow button click
               />
           </div>


          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
             <CurrentThemeIcon className="h-5 w-5 transition-transform duration-500 ease-in-out rotate-0 scale-100 group-hover:rotate-12 group-hover:scale-110" />
             {/* Animated switch */}
              {/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
          </Button>

          {/* Account */}
          <DropdownMenu>
             <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="User Account">
                  <User className="h-5 w-5" />
                </Button>
             </DropdownMenuTrigger>
             <DropdownMenuContent align="end">
                {/* Replace with actual auth logic */}
                <Link href="/account/login" passHref>
                  <DropdownMenuItem>Login</DropdownMenuItem>
                </Link>
                <Link href="/account/register" passHref>
                  <DropdownMenuItem>Register</DropdownMenuItem>
                </Link>
                {/* Logged in state items */}
                {/* <DropdownMenuItem>My Account</DropdownMenuItem> */}
                {/* <DropdownMenuItem>Order History</DropdownMenuItem> */}
                {/* <DropdownMenuItem>Wishlist</DropdownMenuItem> */}
                {/* <DropdownMenuSeparator /> */}
                {/* <DropdownMenuItem>Logout</DropdownMenuItem> */}
             </DropdownMenuContent>
          </DropdownMenu>


          {/* Cart */}
          <Button variant="ghost" size="icon" aria-label="Shopping Cart" onClick={() => alert('Open Cart Panel (placeholder)')}>
            <ShoppingCart className="h-5 w-5" />
            {/* Add badge for item count later */}
            {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span> */}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
