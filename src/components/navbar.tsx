"use client";

import { useState, MouseEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from "@/components/logo";
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DropdownUser from "@/components/dropdown";  // Import DropdownUser component

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const pathname = usePathname(); // Get the current route

    // Get session data using useSession from next-auth
    const { data: session, status } = useSession();
    const user = session?.user;

    const toggleMenu: MouseEventHandler<HTMLButtonElement> = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Function to check if a link is active
    const isActive = (path: string) => pathname === path;

    return (
        <nav className="w-full py-4 px-8 bg-white dark:bg-darkBg border-b-4 border-black shadow-[5px_5px_0px_#000000] flex justify-between items-center">

            <Logo />

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
                className={`${isMenuOpen ? 'fixed inset-0 z-20 bg-white dark:bg-darkBg flex flex-col justify-center items-center' : 'hidden'
                    } lg:flex lg:space-x-6 lg:text-lg lg:font-semibold lg:text-black lg:dark:text-white lg:items-center lg:static lg:w-auto lg:h-auto`}
            >
                <ul className="flex flex-col items-center space-y-8 text-lg font-semibold text-black dark:text-white lg:flex-row lg:space-x-6 lg:space-y-0">
                    <li>
                        <Link
                            href="/adopt"
                            className={`px-4 py-2 hover:bg-black hover:text-white border-2 border-black dark:border-white transition-all shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#ffffff] ${isActive('/adopt') ? 'bg-black text-white dark:bg-white dark:text-black' : ''
                                }`}
                            onClick={() => setIsMenuOpen(false)} // Close menu on click
                        >
                            Adopt a Pet
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/vets"
                            className={`px-4 py-2 hover:bg-black hover:text-white border-2 border-black dark:border-white transition-all shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#ffffff] ${isActive('/vets') ? 'bg-black text-white dark:bg-white dark:text-black' : ''
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Vets Near You
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/community"
                            className={`px-4 py-2 hover:bg-black hover:text-white border-2 border-black dark:border-white transition-all shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#ffffff] ${isActive('/community') ? 'bg-black text-white dark:bg-white dark:text-black' : ''
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Community
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={`px-4 py-2 hover:bg-black hover:text-white border-2 border-black dark:border-white transition-all shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#ffffff] ${isActive('/about') ? 'bg-black text-white dark:bg-white dark:text-black' : ''
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About Us
                        </Link>
                    </li>
                </ul>

                {/* Right side: Call to Action */}
                <div className="flex flex-col space-y-4 mt-8 lg:hidden">
                    {user ? (
                        <div>
                            <div className="text-center">
                                <Button variant="default" size="lg" className="mt-4">
                                    My Profile
                                </Button>
                            </div>
                            <div className="text-center">
                                <Button variant="default" size="lg" className="mt-4">
                                    Sign Out
                                </Button>
                            </div>
                        </div>

                    ) : (
                        <>
                            <Link href="/auth/signin">
                                <Button variant="default" size="lg" className="border-black dark:border-white shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#ffffff]">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/auth/signup">
                                <Button variant="noShadow" size="lg" className="border-black dark:border-white shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#ffffff]">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Desktop right side buttons */}
            <div className="hidden lg:flex space-x-4">
                {user ? (
                    <DropdownUser />
                ) : (
                    <>
                        <Link href="/auth/signin">
                            <Button variant="default" size="lg" className="border-black dark:border-white shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#ffffff]">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/auth/signup">
                            <Button variant="default" size="lg" className="border-black dark:border-white shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#ffffff]">
                                Sign Up
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
