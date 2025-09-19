'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';

const mobileMenuVariants: Variants = {
    closed: {
        clipPath: "circle(0% at 100% 0%)",
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
    open: {
        clipPath: "circle(150% at 100% 0%)",
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

const containerVariants: Variants = {
    closed: {},
    open: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.4,
        },
    },
};

const itemVariants: Variants = {
    closed: {
        opacity: 0,
        y: 50,
    },
    open: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

const hamburgerVariants: Variants = {
    closed: {
        rotate: 0,
        transition: {
            delay: 0.4,
        },
    },
    open: {
        rotate: 90,
        transition: {
            duration: 0.3,
        },
    },
};

const NAV_ITEMS = [
    { name: 'Dashboard', href: '/' },
    { name: 'Posts', href: '#' },
    { name: 'Users', href: '#' },
];

function NavBar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleMenuClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200`} >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex-shrink-0 cursor-pointer"
                        >
                            <div className="flex items-center space-x-2">
                                <motion.div
                                    className="px-1 bg-gradient-to-r from-red-700 to-black rounded-lg flex items-center justify-center"
                                    whileHover={{
                                        background: "linear-gradient(45deg, #dc2626, #7f1d1d, #000000)",
                                    }}
                                >
                                    <span className="text-white font-bold text-lg">Zettabyte</span>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {NAV_ITEMS.map((item) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0 }}
                                    className="font-medium bg-gradient-to-r from-red-700 to-black bg-clip-text text-transparent"
                                >
                                    {item.name}
                                </motion.a>
                            ))}


                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="cursor-pointer p-2 text-white bg-gradient-to-r from-red-700 to-black rounded-lg"
                            >
                                <User className="w-5 h-5 " />
                            </motion.button>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            variants={hamburgerVariants}
                            animate={isOpen ? "open" : "closed"}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleMenuToggle}
                            className="cursor-pointer md:hidden p-2 text-gray-700 rounded-lg transition-colors duration-200 relative z-50"
                        >
                            <Menu className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>
            </nav>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed inset-0 z-50 bg-gradient-to-r from-red-700 to-black flex items-center justify-center"
                    >

                        <motion.div
                            variants={containerVariants}
                            initial="closed"
                            animate="open"
                            className="absolute top-3 p-1 left-5 rounded px-2 flex space-x-0 bg-gradient-to-r from-red-700 to-black"
                        >
                            {"Zettabyte".split("").map((char, idx) => (
                                <motion.span
                                    key={idx}
                                    variants={itemVariants}
                                    className="text-lg font-bold text-white inline-block"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="text-center space-y-8"
                        >
                            {NAV_ITEMS.map((item) => (
                                <motion.div key={item.name} variants={itemVariants}>
                                    <motion.a
                                        href={item.href}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleMenuClose}
                                        className="block text-4xl md:text-5xl font-bold text-white transition-colors duration-300"
                                    >
                                        {item.name}
                                    </motion.a>
                                </motion.div>
                            ))}

                            <motion.div variants={itemVariants} >
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleMenuClose}
                                    className="cursor-pointer flex items-center justify-center mx-auto space-x-3 text-4xl font-semibold text-white transition-colors duration-300"
                                >
                                    <User className="w-10 h-10" />
                                    <span>Profile</span>
                                </motion.button>
                            </motion.div>
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            onClick={handleMenuClose}
                            className="cursor-pointer absolute top-2 right-5 p-3 text-white hover:bg-white/10 rounded-full transition-colors duration-200"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default NavBar;