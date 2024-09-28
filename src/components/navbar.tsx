"use client";

import { useState, MouseEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from "@/components/logo";
import { usePathname } from 'next/navigation'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname(); // Get the current route

  // Explicitly type toggleMenu as MouseEventHandler
  const toggleMenu: MouseEventHandler<HTMLButtonElement> = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to check if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full py-4 px-8 bg-white dark:bg-darkBg border-b-4 border-black shadow-[5px_5px_0px_#000000] flex justify-between items-center">
      {/* Left side: Logo or Brand */}
      <Logo />  {/* Replace with the Logo component */}

      {/* Mobile Hamburger Icon */}
      <button
        className="lg:hidden text-black dark:text-white focus:outline-none"
        onClick={toggleMenu}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
        </svg>
      </button>

      {/* Full Page Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? 'fixed inset-0 z-20 bg-white dark:bg-darkBg flex flex-col justify-center items-center' : 'hidden'
        } lg:flex lg:space-x-6 lg:text-lg lg:font-semibold lg:text-black lg:dark:text-white lg:items-center lg:static lg:w-auto lg:h-auto`}
      >
        {/* Close Button (Cross) */}
        {isMenuOpen && (
          <button
            className="absolute top-6 right-6 text-black dark:text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <ul className="flex flex-col items-center space-y-8 text-lg font-semibold text-black dark:text-white lg:flex-row lg:space-x-6 lg:space-y-0">
          <li>
            <Link
              href="/adopt"
              className={`px-4 py-2 hover:bg-black hover:text-white border-2 border-black dark:border-white transition-all shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#ffffff] ${
                isActive('/adopt') ? 'bg-black text-white dark:bg-white dark:text-black' : ''
              }`}
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              Adopt a Pet
            </Link>
          </li>
          <li>
            <Link
              href="/vets"
              className={`px-4 py-2 hover:bg-black hover:text-white border-2 border-black dark:border-white transition-all shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#ffffff] ${
                isActive('/vets') ? 'bg-black text-white dark:bg-white dark:text-black' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Vets Near You
            </Link>
          </li>
          <li>
            <Link
              href="/community"
              className={`px-4 py-2 hover:bg-black hover:text-white border-2 border-black dark:border-white transition-all shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#ffffff] ${
                isActive('/community') ? 'bg-black text-white dark:bg-white dark:text-black' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`px-4 py-2 hover:bg-black hover:text-white border-2 border-black dark:border-white transition-all shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#ffffff] ${
                isActive('/about') ? 'bg-black text-white dark:bg-white dark:text-black' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </li>
        </ul>

        {/* Right side: Call to Action */}
        <div className="flex flex-col space-y-4 mt-8 lg:hidden">
          <Button variant="default" size="lg" className="border-black dark:border-white shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#ffffff]">
            Sign In
          </Button>
          <Button variant="noShadow" size="lg" className="border-black dark:border-white shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#ffffff]">
            Sign Up
          </Button>
        </div>
      </div>

      {/* Desktop right side buttons */}
      <div className="hidden lg:flex space-x-4">
        <Button variant="default" size="lg" className="border-black dark:border-white shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#ffffff]">
          Sign In
        </Button>
        <Button  variant="default" size="lg" className="border-black dark:border-white shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#ffffff]">
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
