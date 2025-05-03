'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronUp, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import NewsletterForm from '@/components/newsletter-form'; // Import the new component

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-muted dark:bg-gray-900 text-muted-foreground dark:text-gray-400 pt-16 pb-8 mt-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div>
             <Link href="/" className="flex items-center gap-2 mb-4 text-primary dark:text-primary-foreground">
               <BookOpen className="h-7 w-7" />
               <span className="font-bold text-2xl text-foreground dark:text-white">LitLink</span>
             </Link>
            <p className="text-sm">
              Your modern destination for discovering and purchasing physical and digital books. Explore, connect, and read.
            </p>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-white">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-primary dark:hover:text-teal-400 transition-colors">Shop All Books</Link></li>
              <li><Link href="/genres" className="hover:text-primary dark:hover:text-teal-400 transition-colors">Browse Genres</Link></li>
              {/* <li><Link href="/authors" className="hover:text-primary dark:hover:text-teal-400 transition-colors">Find Authors</Link></li> */}
              {/* <li><Link href="/blog" className="hover:text-primary dark:hover:text-teal-400 transition-colors">Blog</Link></li> */}
              <li><Link href="/contact" className="hover:text-primary dark:hover:text-teal-400 transition-colors">Contact Us</Link></li>
              {/* <li><Link href="/faq" className="hover:text-primary dark:hover:text-teal-400 transition-colors">FAQ</Link></li> */}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-primary dark:hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-primary dark:hover:text-teal-400 transition-colors">Terms of Service</Link></li>
              {/* <li><Link href="/shipping-returns" className="hover:text-primary dark:hover:text-teal-400 transition-colors">Shipping & Returns</Link></li> */}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-white">Newsletter</h3>
            <p className="text-sm mb-4">Get the latest updates and offers directly in your inbox.</p>
             {/* Use the client component here */}
            <div className="max-w-full"> {/* Ensure form takes appropriate width */}
                 <NewsletterForm />
             </div>
             <div className="flex space-x-4 mt-6">
                 <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary dark:hover:text-teal-400 transition-colors" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
                 <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary dark:hover:text-teal-400 transition-colors" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
                 <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary dark:hover:text-teal-400 transition-colors" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
                 <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary dark:hover:text-teal-400 transition-colors" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
             </div>
          </div>
        </div>

        <div className="border-t border-border dark:border-gray-700 pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} LitLink. All rights reserved.
        </div>
      </div>

       {/* Back to Top Button */}
        <Button
           variant="default"
           size="icon"
           className={cn(
             'fixed bottom-6 right-6 rounded-full shadow-lg transition-opacity duration-300 z-50',
             showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
           )}
           onClick={scrollToTop}
           aria-label="Scroll back to top"
         >
           <ChevronUp className="h-5 w-5" />
        </Button>
    </footer>
  );
};

export default Footer;
