
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLauncher } from "../../Components/app-launcher";
import React from "react";


export const NavBarAccueil = React.memo(function NavBarAccueil() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAppLauncherOpen, setIsAppLauncherOpen] = useState(false);

    const mobileMenuRef = useRef(null);
    const appLauncherRef = useRef(null);

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
    const toggleAppLauncher = () => setIsAppLauncherOpen(prev => !prev);

    // Fermer AppLauncher et menu mobile au clic extérieur
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
            if (appLauncherRef.current && !appLauncherRef.current.contains(event.target)) {
                setIsAppLauncherOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="fixed top-0 z-50 w-full bg-white/90 text-slate-600 backdrop-blur-lg backdrop-saturate-150 shadow-sm">
            {/* Navbar */}
            <div className="flex items-center justify-between px-4 py-2">
                {/* Left: Logo + Hamburger */}
                <div className="flex items-center">
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 text-slate-600 rounded-md hover:bg-gray-100 lg:hidden"
                        title="Menu mobile"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-2 ml-4">
                        <p className="text-2xl"><img src='img/icones/Factures.png'  style={{ width: 25, height: 25, objectFit: 'contain' }} className='mb-1 w-9'/></p>
                        <p className="text-2xl font-semibold text-gray-700">Facture</p>
                    </div>
                </div>

                {/* Right: AppLauncher */}
                <div className="flex items-center space-x-2">
                    <div className="relative" ref={appLauncherRef}>
                        <button
                            onClick={toggleAppLauncher}
                            className="p-2 text-slate-600 rounded-full hover:bg-gray-100"
                            title="Lancer une application"
                        >
                              <svg
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                fill="currentColor"
                                aria-hidden="true"
                                className="xfx01vb x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq"
                                style={{ "--color": "var(--accent)" }}
                            >
                                <path d="M18.5 1A1.5 1.5 0 0 0 17 2.5v3A1.5 1.5 0 0 0 18.5 7h3A1.5 1.5 0 0 0 23 5.5v-3A1.5 1.5 0 0 0 21.5 1h-3zm0 8a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 21.5 9h-3zm-16 8A1.5 1.5 0 0 0 1 18.5v3A1.5 1.5 0 0 0 2.5 23h3A1.5 1.5 0 0 0 7 21.5v-3A1.5 1.5 0 0 0 5.5 17h-3zm8 0A1.5 1.5 0 0 0 9 18.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm8 0a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm-16-8A1.5 1.5 0 0 0 1 10.5v3A1.5 1.5 0 0 0 2.5 15h3A1.5 1.5 0 0 0 7 13.5v-3A1.5 1.5 0 0 0 5.5 9h-3zm0-8A1.5 1.5 0 0 0 1 2.5v3A1.5 1.5 0 0 0 2.5 7h3A1.5 1.5 0 0 0 7 5.5v-3A1.5 1.5 0 0 0 5.5 1h-3zm8 0A1.5 1.5 0 0 0 9 2.5v3A1.5 1.5 0 0 0 10.5 7h3A1.5 1.5 0 0 0 15 5.5v-3A1.5 1.5 0 0 0 13.5 1h-3zm0 8A1.5 1.5 0 0 0 9 10.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 13.5 9h-3z"></path>
                            </svg>
                        </button>

                        <AnimatePresence>
                            {isAppLauncherOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 z-10"
                                >
                                    <AppLauncher />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        ref={mobileMenuRef}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden overflow-hidden px-4 py-2 bg-white border-t border-gray-200 shadow"
                    >
                        <ul className="space-y-2">
                            <li>
                                <button className="w-full text-left text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md">
                                    Tableau de bord
                                </button>
                            </li>
                            <li>
                                <button className="w-full text-left text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md">
                                    Paramètres
                                </button>
                            </li>
                            <li>
                                <button className="w-full text-left text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md">
                                    Déconnexion
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
})
