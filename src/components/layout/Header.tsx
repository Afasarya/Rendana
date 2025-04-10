import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from './Navbar';

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative h-10 w-10">
            <Image 
              src="/images/Group4.svg" 
              alt="Rendana Logo" 
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary">Rendana</span>
            <span className="text-xs text-gray-500 -mt-1">Rencana Dana Bisnis</span>
          </div>
        </Link>
        <Navbar />
      </div>
    </header>
  );
}