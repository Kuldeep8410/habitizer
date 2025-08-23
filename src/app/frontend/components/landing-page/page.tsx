"use client"

import Spline from '@splinetool/react-spline';
import { motion } from "framer-motion";

import React, { useState, useEffect } from 'react';
import {
    Trophy,
    Target,
    Users,
    Zap,
    Smartphone,
    Star,
    Calendar,
    Award,
    MessageCircle,
    Wifi,
    WifiOff,
    ArrowRight,
    Play,
    CheckCircle
} from 'lucide-react';

import Link from 'next/link';

interface AnimatedCounterProps {
    end: number;
    duration: number;
    suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration, suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const startTime = Date.now();
        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * end));

            if (progress >= 1) {
                clearInterval(timer);
            }
        }, 16);

        return () => clearInterval(timer);
    }, [end, duration]);

    return <span>{count}{suffix}</span>;
};

const HabitTrackerLanding: React.FC = () => {
    const [currentFeature, setCurrentFeature] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % 4);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: Target,
            title: "Smart Habit Tracking",
            description: "Create daily, weekly, or monthly goals with custom reminders and streak counters",
            color: "from-blue-500 to-cyan-500",
            url: "frontend/tools/smart-habit"
        },
        {
            icon: Star,
            title: "Gamified Avatar System",
            description: "Earn XP, unlock outfits, and level up your character as you build better habits",
            color: "from-purple-500 to-pink-500",
            url: "frontend/tools/Gamified-Avatar"
        },
        {
            icon: Users,
            title: "Social Leaderboards",
            description: "Compete with friends, join groups, and motivate each other with real-time rankings",
            color: "from-green-500 to-emerald-500",
            url: "frontend/tools/smart-habit"
        },
        {
            icon: Zap,
            title: "Mini Challenges",
            description: "Complete short-term challenges for bonus rewards and extra motivation",
            color: "from-orange-500 to-red-500",
            url: "frontend/tools/smart-habit"
        }
    ];

    const stats = [
        { number: 50000, suffix: '+', label: 'Active Users' },
        { number: 2500000, suffix: '+', label: 'Habits Completed' },
        { number: 98, suffix: '%', label: 'User Retention' },
        { number: 156, suffix: '', label: 'Countries' }
    ];

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden pt-10">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
            </div>

            {/* Navigation */}
            <main className="relative w-full h-screen">
                {/* Background Spline */}
                <Spline scene="https://prod.spline.design/SLGZ9TWC5JIeeBUg/scene.splinecode" />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/40 backdrop-blur-60">
            
                        <h1 className="text-5xl font-bold mb-4">Welcome to Habitizer</h1>
                    
                    <p className="text-lg max-w-xl mb-6">
                        Build better habits, track your progress, and stay consistent every day.
                        Turn your goals into reality 🚀
                    </p>
                    <div className="flex gap-4">
                        <Link href="/signup">
                            <button
                                className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all"
                            >
                                Get Started
                            </button>
                        </Link>
                        <Link href="/signin">
                            <button
                                className="px-6 py-3 rounded-full border border-white font-semibold hover:bg-white/10 transition-all"
                            >
                                Sign In
                            </button>
                        </Link>
                    </div>
                </div>
            </main>


            {/* Hero Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-12 md:pt-20">
                <div className="text-center mb-16">
                    <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        Level Up Your
                        <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Life Journey
                        </span>
                    </h1>
                    <p className={`text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        Transform habits into an epic adventure. Track progress, unlock achievements, and compete with friends in the most engaging habit tracker ever created.
                    </p>
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold flex items-center space-x-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 group">
                            <span>Start Your Quest</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="border-2 border-white/20 px-8 py-4 rounded-full text-lg font-semibold flex items-center space-x-2 hover:bg-white/10 transition-all duration-300">
                            <Play className="w-5 h-5" />
                            <span>Watch Demo</span>
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                                <AnimatedCounter end={stat.number} duration={2000} suffix={stat.suffix} />
                            </div>
                            <div className="text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Features Showcase */}
                <div id="features" className="mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                        Powerful Features for
                        <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Epic Growth
                        </span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div
                                        key={index}
                                        className={`p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${currentFeature === index
                                            ? 'bg-white/10 border-white/30 shadow-2xl'
                                            : 'bg-white/5 border-white/10 hover:bg-white/8'
                                            }`}
                                        onClick={() => setCurrentFeature(index)}
                                    >
                                        <Link href={`/${feature.url}`} className="flex items-center space-x-4" passHref>
                                            <div className="flex items-start space-x-4 w-full">
                                                <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color}`}>
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                                    <p className="text-gray-300">{feature.description}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                                <div className="text-center">
                                    <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${features[currentFeature].color} flex items-center justify-center`}>
                                        {React.createElement(features[currentFeature].icon, { className: "w-12 h-12 text-white" })}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{features[currentFeature].title}</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                                            <span>Daily Streak</span>
                                            <span className="font-bold text-cyan-400">15 Days</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                                            <span>XP Earned</span>
                                            <span className="font-bold text-purple-400">2,450 XP</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                                            <span>Rank</span>
                                            <span className="font-bold text-yellow-400">#23</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Core Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <Calendar className="w-12 h-12 text-blue-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-3">Flexible Scheduling</h3>
                        <p className="text-gray-300">Set daily, weekly, or monthly goals with smart reminders that adapt to your lifestyle.</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <Award className="w-12 h-12 text-purple-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-3">Achievement System</h3>
                        <p className="text-gray-300">Unlock badges, level up your avatar, and earn rewards for consistent progress.</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <MessageCircle className="w-12 h-12 text-green-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-3">Community Support</h3>
                        <p className="text-gray-300">Connect with like-minded people, share progress, and motivate each other.</p>
                    </div>
                </div>

                {/* PWA Section */}
                <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 mb-20">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-3xl font-bold mb-6">Works Everywhere, Anytime</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Smartphone className="w-6 h-6 text-cyan-400" />
                                    <span>Progressive Web App - Install on any device</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <WifiOff className="w-6 h-6 text-green-400" />
                                    <span>Full offline functionality</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Wifi className="w-6 h-6 text-blue-400" />
                                    <span>Automatic sync when online</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-6 h-6 text-purple-400" />
                                    <span>Native app experience in your browser</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-white/10 rounded-2xl p-6 inline-block">
                                <Smartphone className="w-20 h-20 text-cyan-400 mx-auto mb-4" />
                                <p className="font-semibold">Available on all platforms</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10 mb-20">
                    <h2 className="text-4xl font-bold mb-6">Ready to Start Your Adventure?</h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of users who have transformed their lives through gamified habit building. Your journey to a better you starts now.
                    </p>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-12 py-4 rounded-full text-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 group">
                        Begin Your Quest
                        <ArrowRight className="w-6 h-6 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 py-12">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                                <Trophy className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xl font-bold">HabitQuest</span>
                        </div>
                        <div className="text-gray-400">
                            © 2024 HabitQuest. Level up your life.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HabitTrackerLanding;