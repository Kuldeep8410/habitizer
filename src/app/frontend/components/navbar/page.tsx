"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';   
import {
    Trophy,
    Menu,
    X,
    Home,
    Target,
    Users,
    Award,
    MessageCircle,
    Settings,
    ChevronDown,
    Star,
    Zap,
    User
} from 'lucide-react';
import { Navigate } from 'react-router-dom';

interface NavbarProps {
    className?: string;
}

const HabitQuestNavbar: React.FC<NavbarProps> = ({ className = '' }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setActiveDropdown(null);
    };

    const toggleDropdown = (dropdown: string) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const navItems = [
        { name: 'Home', href: '/', icon: Home },
        {
            name: 'Features',
            href: '#features',
            icon: Target,
            dropdown: [
                { name: 'Habit Tracking', href: '/frontend/tools/smart-habit', icon: Target },
                { name: 'Gamification', href: '/frontend/tools/Gamified-Avatar', icon: Star },
                { name: 'Social Features', href: '#social', icon: Users },
                { name: 'Challenges', href: '#challenges', icon: Zap },
            ]
        },
        {
            name: 'Community', href: '#community', icon: Users,
            dropdown: [
                { name: 'Discord', href: '#tracking', icon: Target },
                { name: 'Github', href: '#gamification', icon: Star },
                { name: 'Instagram Features', href: '#social', icon: Users },
                { name: 'Telegram', href: '#challenges', icon: Zap },
            ]
        },
        { name: 'Leaderboards', href: '#leaderboards', icon: Award },
        { name: 'Support', href: '#support', icon: MessageCircle },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300'
            } ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-black/50 backdrop-blur-lg border-gray-800 border-2 m-2 rounded-4xl">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-3 group cursor-pointer">
                        <div className="relative">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                <Trophy className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                            </div>

                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                HabitQuest
                            </span>
                            <span className="text-xs text-gray-400 hidden lg:block">Level up your life</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <div key={item.name} className="relative">
                                <button
                                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200 group"
                                    onClick={() => {
                                        if (item.dropdown) {
                                            toggleDropdown(item.name);
                                        }
                                        else {
                                            // Navigate to the link if no dropdown
                                            window.location.href = item.href;
                                        }
                                    }}
                                    onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                                    onMouseLeave={() => !isMenuOpen && setActiveDropdown(null)}
                                >
                                    <item.icon className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
                                    <span className="font-medium group-hover:text-cyan-400 transition-colors">{item.name}</span>
                                    {item.dropdown && (
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''
                                            }`} />
                                    )}
                                </button>

                                {/* Dropdown Menu */}
                                {item.dropdown && activeDropdown === item.name && (
                                    <div
                                        className="absolute top-full left-0 mt-2 w-56 bg-indigo-900/95 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg shadow-indigo-500/10 py-2 z-50"
                                        onMouseEnter={() => setActiveDropdown(item.name)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        {item.dropdown.map((dropdownItem) => (
                                            <a
                                                key={dropdownItem.name}
                                                href={dropdownItem.href}
                                                className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 transition-colors group"
                                            >
                                                <dropdownItem.icon className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                                                <span className="group-hover:text-cyan-400 transition-colors">{dropdownItem.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* User Actions */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {/* User Stats */}
                        {/* <div className="flex items-center space-x-4 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                    <Star className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-sm font-semibold text-yellow-400">2,450 XP</span>
                            </div>
                            <div className="w-px h-4 bg-white/20"></div>
                            <div className="flex items-center space-x-2">
                                <Trophy className="w-4 h-4 text-cyan-400" />
                                <span className="text-sm font-semibold text-cyan-400">#23</span>
                            </div>
                        </div> */}

                        {/* Action Buttons */}
                          <Link href="/signup" passHref>
                        <button className="px-4 py-2 text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-200 font-medium">
                            Sign Up
                        </button>
                        </Link>
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105">
                            Start Quest
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="py-4 space-y-2 bg-indigo-900/50 backdrop-blur-sm rounded-xl mt-4 border border-white/10">
                        {/* User Stats Mobile */}
                        <div className="flex items-center justify-between px-4 py-3 bg-white/5 mx-4 rounded-lg mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white">Player Level 15</div>
                                    <div className="text-xs text-gray-400">2,450 XP • Rank #23</div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Navigation Items */}
                        {navItems.map((item) => (
                            <div key={item.name}>
                                <button
                                    className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-white/10 transition-colors"
                                    onClick={() => item.dropdown && toggleDropdown(item.name)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                    {item.dropdown && (
                                        <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''
                                            }`} />
                                    )}
                                </button>

                                {/* Mobile Dropdown */}
                                {item.dropdown && activeDropdown === item.name && (
                                    <div className="ml-8 space-y-1 py-2">
                                        {item.dropdown.map((dropdownItem) => (
                                            <a
                                                key={dropdownItem.name}
                                                href={dropdownItem.href}
                                                className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
                                            >
                                                <dropdownItem.icon className="w-4 h-4" />
                                                <span>{dropdownItem.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Mobile Action Buttons */}
                        <div className="px-4 py-4 space-y-3 border-t border-white/10 mt-4">
                                <button className="w-full py-3 text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-200 font-medium">
                                    Sign Up
                                </button>                          
                            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-full font-semibold text-white">
                                Start Your Quest
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default HabitQuestNavbar;