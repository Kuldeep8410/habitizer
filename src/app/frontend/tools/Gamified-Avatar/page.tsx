"use client"
import React, { useState, useEffect } from 'react';
import { Star, Trophy, Zap, Heart, Shield, Crown, Sparkles, Plus } from 'lucide-react';

const HabitizerAvatarSystem = () => {
    const [playerData, setPlayerData] = useState({
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        totalXP: 0,
        coins: 50,
        unlockedOutfits: ['basic'] as ('basic' | 'ninja' | 'wizard' | 'knight' | 'superhero' | 'royal')[],
        currentOutfit: 'basic' as 'basic' | 'ninja' | 'wizard' | 'knight' | 'superhero' | 'royal',
        achievements: []
    });

    const [showLevelUp, setShowLevelUp] = useState(false);
    const [showReward, setShowReward] = useState<{ xp: number; coins: number } | null>(null);

    const outfits = {
        basic: { name: 'Basic', cost: 0, unlocked: true, color: 'bg-blue-400', icon: '👤' },
        ninja: { name: 'Ninja', cost: 100, unlocked: false, color: 'bg-gray-800', icon: '🥷' },
        wizard: { name: 'Wizard', cost: 150, unlocked: false, color: 'bg-purple-600', icon: '🧙' },
        knight: { name: 'Knight', cost: 200, unlocked: false, color: 'bg-yellow-600', icon: '⚔️' },
        superhero: { name: 'Superhero', cost: 300, unlocked: false, color: 'bg-red-500', icon: '🦸' },
        royal: { name: 'Royal', cost: 500, unlocked: false, color: 'bg-pink-500', icon: '👑' }
    } as const;
    type OutfitKey = keyof typeof outfits;

    const achievements = [
        { id: 'first_habit', name: 'First Steps', description: 'Complete your first habit', icon: <Star className="w-4 h-4" />, xpReward: 50 },
        { id: 'streak_7', name: 'Week Warrior', description: '7-day streak', icon: <Trophy className="w-4 h-4" />, xpReward: 100 },
        { id: 'level_5', name: 'Rising Star', description: 'Reach level 5', icon: <Sparkles className="w-4 h-4" />, xpReward: 150 },
        { id: 'outfit_collector', name: 'Style Master', description: 'Unlock 3 outfits', icon: <Crown className="w-4 h-4" />, xpReward: 200 }
    ];

    const habits = [
        { name: 'Morning Exercise', xp: 25, coins: 10 },
        { name: 'Meditate', xp: 30, coins: 12 },
        { name: 'No Social Media (1hr)', xp: 35, coins: 15 },
        { name: 'Read 10 Pages', xp: 40, coins: 20 },
        { name: 'Drink Water (8 Glasses)', xp: 25, coins: 10 },
        { name: 'Muththi-4', xp: 30, coins: 40 },
        { name: 'Green Veggies', xp: 20, coins: 10 },
        { name: 'Milk - 1 Glass', xp: 20, coins: 10 },
        { name: 'Sleep Early', xp: 30, coins: 15 },
        { name: 'Plan Tomorrow', xp: 20, coins: 10 }
    ];
    const [completedHabits, setCompletedHabits] = useState<{ [key: string]: string }>({});
    useEffect(() => {
        const stored = localStorage.getItem("completedHabits");
        if (stored) {
            setCompletedHabits(JSON.parse(stored));
        }
    }, []);


    const completeHabit = (habit: { name: string; xp: number; coins: number }) => {
        const today = new Date().toISOString().split("T")[0];
        if (completedHabits[habit.name] === today) return;
        const newXP = playerData.xp + habit.xp;
        const newCoins = playerData.coins + habit.coins;
        const newTotalXP = playerData.totalXP + habit.xp;

        let newLevel = playerData.level;
        let xpToNextLevel = playerData.xpToNextLevel;
        let leveledUp = false;

        if (newXP >= playerData.xpToNextLevel) {
            newLevel++;
            xpToNextLevel = newLevel * 100;
            leveledUp = true;
        }

        setPlayerData(prev => ({
            ...prev,
            xp: newXP >= prev.xpToNextLevel ? newXP - prev.xpToNextLevel : newXP,
            level: newLevel,
            xpToNextLevel: xpToNextLevel,
            totalXP: newTotalXP,
            coins: newCoins
        }));

        setShowReward({ xp: habit.xp, coins: habit.coins });

        if (leveledUp) {
            setTimeout(() => setShowLevelUp(true), 1000);
        }

        setTimeout(() => setShowReward(null), 2000);
        const updated = { ...completedHabits, [habit.name]: today };
        setCompletedHabits(updated);
        localStorage.setItem("completedHabits", JSON.stringify(updated));

    };


    const buyOutfit = (outfitKey: 'basic' | 'ninja' | 'wizard' | 'knight' | 'superhero' | 'royal') => {
        const outfit = outfits[outfitKey];
        if (playerData.coins >= outfit.cost && !playerData.unlockedOutfits.includes(outfitKey)) {
            setPlayerData(prev => ({
                ...prev,
                coins: prev.coins - outfit.cost,
                unlockedOutfits: [...prev.unlockedOutfits, outfitKey]
            }));
        }
    };

    const equipOutfit = (outfitKey: 'basic' | 'ninja' | 'wizard' | 'knight' | 'superhero' | 'royal') => {
        if (playerData.unlockedOutfits.includes(outfitKey)) {
            setPlayerData(prev => ({
                ...prev,
                currentOutfit: outfitKey
            }));
        }
    };

    const currentOutfitData = outfits[playerData.currentOutfit];
    const xpPercentage = (playerData.xp / playerData.xpToNextLevel) * 100;

    return (
        <div className="max-w-screen mx-auto pt-26 bg-black text-white min-h-screen">
            {/* Header Stats */}
            <div className="bg-gray-900 rounded-xl shadow-lg p-6 mb-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 ${currentOutfitData.color} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                            {currentOutfitData.icon}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Level {playerData.level} Hero</h2>
                            <p className="text-gray-400">{currentOutfitData.name} Outfit</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                            <Star className="w-5 h-5 text-yellow-400" />
                            <span className="font-semibold text-white">{playerData.coins} Coins</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-blue-400" />
                            <span className="font-semibold text-white">{playerData.totalXP} Total XP</span>
                        </div>
                    </div>
                </div>

                {/* XP Progress Bar */}
                <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Level {playerData.level}</span>
                        <span>{playerData.xp}/{playerData.xpToNextLevel} XP</span>
                        <span>Level {playerData.level + 1}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${xpPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Habits Section */}
                <div className="lg:col-span-2">
                    <div className="bg-gray-900 rounded-xl shadow-lg p-6 mb-6 border border-gray-700">
                        <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                            <Heart className="w-5 h-5 text-red-400" />
                            Daily Habits
                        </h3>
                        <div className="space-y-3">
                            {habits.map((habit, index) => {
                                const today = new Date().toISOString().split("T")[0];
                                const isDisabled = completedHabits[habit.name] === today;

                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                            <span className="font-medium text-white">{habit.name}</span>
                                        </div>

                                        <button
                                            onClick={() => completeHabit(habit)}
                                            disabled={isDisabled}
                                            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all duration-200
                                                ${isDisabled
                                                    ? "bg-gray-600 cursor-not-allowed text-gray-400"
                                                    : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                                                }`}
                                        >
                                            <Plus className="w-4 h-4" />
                                            {isDisabled
                                                ? "Completed Today"
                                                : `+${habit.xp} XP | +${habit.coins} Coins`}
                                        </button>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>

                {/* Avatar Customization */}
                <div className="space-y-6">
                    <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-700">
                        <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                            <Shield className="w-5 h-5 text-purple-400" />
                            Avatar Shop
                        </h3>
                        <div className="space-y-3">
                            {(Object.keys(outfits) as OutfitKey[]).map((key) => {
                                const outfit = outfits[key];
                                const isUnlocked = playerData.unlockedOutfits.includes(key);
                                const isEquipped = playerData.currentOutfit === key;
                                const canAfford = playerData.coins >= outfit.cost;

                                return (
                                    <div key={key} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 ${outfit.color} rounded-full flex items-center justify-center text-lg`}>
                                                {outfit.icon}
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{outfit.name}</p>
                                                {!isUnlocked && <p className="text-sm text-gray-400">{outfit.cost} coins</p>}
                                            </div>
                                        </div>
                                        <div>
                                            {isEquipped ? (
                                                <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                                                    Equipped
                                                </span>
                                            ) : isUnlocked ? (
                                                <button
                                                    onClick={() => equipOutfit(key)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                                                >
                                                    Equip
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => buyOutfit(key)}
                                                    disabled={!canAfford}
                                                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${canAfford
                                                            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                                        }`}
                                                >
                                                    Buy
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-700">
                        <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-400" />
                            Achievements
                        </h3>
                        <div className="space-y-3">
                            {achievements.map((achievement) => (
                                <div key={achievement.id} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                                    <div className="text-yellow-400">
                                        {achievement.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm text-white">{achievement.name}</p>
                                        <p className="text-xs text-gray-400">{achievement.description}</p>
                                    </div>
                                    <span className="text-xs bg-yellow-900 text-yellow-300 px-2 py-1 rounded-full">
                                        +{achievement.xpReward} XP
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reward Popup */}
            {showReward && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 rounded-xl p-6 text-center shadow-2xl animate-pulse border border-gray-700">
                        <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                        <h3 className="text-xl font-bold mb-2 text-white">Habit Completed!</h3>
                        <p className="text-gray-400">
                            +{showReward.xp} XP | +{showReward.coins} Coins
                        </p>
                    </div>
                </div>
            )}

            {/* Level Up Popup */}
            {showLevelUp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 rounded-xl p-8 text-center shadow-2xl max-w-sm border border-gray-700">
                        <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2 text-white">Level Up!</h2>
                        <p className="text-gray-400 mb-4">
                            Congratulations! You've reached Level {playerData.level}
                        </p>
                        <button
                            onClick={() => setShowLevelUp(false)}
                            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-200"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HabitizerAvatarSystem;
