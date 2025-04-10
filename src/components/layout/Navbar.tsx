'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, } from '@heroicons/react/24/outline';

const navLinks = [
  { name: 'Beranda', href: '/' },
  { name: 'Kalkulator', href: '/calculator' },
  { name: 'Panduan', href: '/guide' },
  { name: 'Tentang', href: '/about' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`flex items-center transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
      {/* Mobile menu button */}
      <button 
        type="button"
        className="md:hidden p-2 text-gray-600"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Desktop menu */}
      <ul className="hidden md:flex space-x-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.name}>
              <Link 
                href={link.href}
                className={`font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-gray-600 hover:text-primary hover:border-b-2 hover:border-primary/30'
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full z-50 md:hidden">
          <ul className="flex flex-col bg-white shadow-lg rounded-b-lg py-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name} className="px-4 py-2">
                  <Link 
                    href={link.href} 
                    className={`block font-medium ${
                      isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}