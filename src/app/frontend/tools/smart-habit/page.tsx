"use client"
import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Calendar, 
  Clock, 
  Bell, 
  Flame, 
  Plus, 
  Check, 
  Edit3, 
  Trash2,
  TrendingUp,
  Star,
  Award,
  ChevronRight,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  X
} from 'lucide-react';

interface Habit {
  id: string;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  streak: number;
  completedToday: boolean;
  reminderTime?: string;
  reminderEnabled: boolean;
  category: string;
  color: string;
  totalCompleted: number;
  createdAt: Date;
}

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle, onEdit, onDelete }) => {
  const getFrequencyIcon = () => {
    switch (habit.frequency) {
      case 'daily': return <Calendar className="w-4 h-4" />;
      case 'weekly': return <Calendar className="w-4 h-4" />;
      case 'monthly': return <Calendar className="w-4 h-4" />;
    }
  };

  const getStreakColor = () => {
    if (habit.streak >= 30) return 'from-yellow-400 to-orange-500';
    if (habit.streak >= 7) return 'from-purple-400 to-pink-500';
    return 'from-cyan-400 to-blue-500';
  };

  return (
    <div className={`bg-gradient-to-r ${habit.color} p-0.5 rounded-2xl group hover:shadow-lg transition-all duration-300`}>
      <div className="bg-gray-900 rounded-2xl p-6 h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-gray-400 capitalize flex items-center space-x-1">
                {getFrequencyIcon()}
                <span>{habit.frequency}</span>
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">{habit.title}</h3>
            <p className="text-gray-400 text-sm">{habit.description}</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit(habit)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4 text-gray-400 hover:text-white" />
            </button>
            <button 
              onClick={() => onDelete(habit.id)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
            </button>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`bg-gradient-to-r ${getStreakColor()} p-2 rounded-lg`}>
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{habit.streak}</div>
              <div className="text-xs text-gray-400">day streak</div>
            </div>
          </div>
          
          {habit.reminderEnabled && habit.reminderTime && (
            <div className="flex items-center space-x-2 text-gray-400">
              <Bell className="w-4 h-4" />
              <span className="text-sm">{habit.reminderTime}</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Progress</span>
            <span>{habit.totalCompleted} completed</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${habit.color} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${Math.min((habit.streak / 30) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onToggle(habit.id)}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
            habit.completedToday
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
          }`}
        >
          {habit.completedToday ? (
            <>
              <Check className="w-5 h-5" />
              <span>Completed Today!</span>
            </>
          ) : (
            <>
              <PlayCircle className="w-5 h-5" />
              <span>Mark Complete</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

interface CreateHabitForm {
  title: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  category: string;
  color: string;
  reminderEnabled: boolean;
  reminderTime: string;
}

const CreateHabitModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (habit: CreateHabitForm) => void;
  editingHabit?: Habit | null;
}> = ({ isOpen, onClose, onSave, editingHabit }) => {
  const [formData, setFormData] = useState<CreateHabitForm>({
    title: '',
    description: '',
    frequency: 'daily',
    category: 'Wellness',
    color: 'from-purple-500 to-pink-500',
    reminderEnabled: false,
    reminderTime: '09:00'
  });

  const [errors, setErrors] = useState<Partial<CreateHabitForm>>({});

  useEffect(() => {
    if (editingHabit) {
      setFormData({
        title: editingHabit.title,
        description: editingHabit.description,
        frequency: editingHabit.frequency,
        category: editingHabit.category,
        color: editingHabit.color,
        reminderEnabled: editingHabit.reminderEnabled,
        reminderTime: editingHabit.reminderTime || '09:00'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        frequency: 'daily',
        category: 'Wellness',
        color: 'from-purple-500 to-pink-500',
        reminderEnabled: false,
        reminderTime: '09:00'
      });
    }
    setErrors({});
  }, [editingHabit, isOpen]);

  const categories = [
    { name: 'Wellness', icon: '🧘', color: 'from-purple-500 to-pink-500' },
    { name: 'Learning', icon: '📚', color: 'from-cyan-500 to-blue-500' },
    { name: 'Fitness', icon: '💪', color: 'from-green-500 to-emerald-500' },
    { name: 'Finance', icon: '💰', color: 'from-orange-500 to-red-500' },
    { name: 'Productivity', icon: '⚡', color: 'from-yellow-500 to-orange-500' },
    { name: 'Social', icon: '👥', color: 'from-pink-500 to-red-500' },
    { name: 'Creative', icon: '🎨', color: 'from-indigo-500 to-purple-500' },
    { name: 'Health', icon: '❤️', color: 'from-red-500 to-pink-500' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateHabitForm> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.reminderEnabled && !formData.reminderTime) {
      newErrors.reminderTime = 'Reminder time is required when reminders are enabled';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleCategorySelect = (category: typeof categories[0]) => {
    setFormData(prev => ({
      ...prev,
      category: category.name,
      color: category.color
    }));
  };

  if (!isOpen) return null;

  return (
    <div className=" fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {editingHabit ? 'Edit Habit' : 'Create New Habit'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-white font-medium mb-2">Habit Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Morning Exercise, Read 30 minutes..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your habit and why it matters to you..."
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
            />
            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-white font-medium mb-3">Frequency</label>
            <div className="grid grid-cols-3 gap-3">
              {(['daily', 'weekly', 'monthly'] as const).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, frequency: freq }))}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 capitalize ${
                    formData.frequency === freq
                      ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400'
                      : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40'
                  }`}
                >
                  <div className="text-center">
                    <Calendar className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-medium">{freq}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-white font-medium mb-3">Category</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category) => (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => handleCategorySelect(category)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    formData.category === category.name
                      ? `border-transparent bg-gradient-to-r ${category.color}`
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <div className="text-sm font-medium text-white">{category.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Reminder Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-white font-medium">Enable Reminders</label>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, reminderEnabled: !prev.reminderEnabled }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  formData.reminderEnabled ? 'bg-cyan-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    formData.reminderEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {formData.reminderEnabled && (
              <div>
                <label className="block text-white font-medium mb-2">Reminder Time</label>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <input
                    type="time"
                    value={formData.reminderTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, reminderTime: e.target.value }))}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                {errors.reminderTime && <p className="text-red-400 text-sm mt-1">{errors.reminderTime}</p>}
              </div>
            )}
          </div>

          {/* Preview */}
          <div>
            <label className="block text-white font-medium mb-3">Preview</label>
            <div className={`bg-gradient-to-r ${formData.color} p-0.5 rounded-xl`}>
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-gray-400 capitalize">{formData.frequency}</span>
                </div>
                <h3 className="font-semibold text-white mb-1">
                  {formData.title || 'Your Habit Title'}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {formData.description || 'Your habit description will appear here'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-white font-medium">0 day streak</span>
                  </div>
                  {formData.reminderEnabled && (
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Bell className="w-4 h-4" />
                      <span className="text-sm">{formData.reminderTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              {editingHabit ? 'Update Habit' : 'Create Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SmartHabitTracking: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      title: 'Morning Meditation',
      description: 'Start the day with 10 minutes of mindfulness',
      frequency: 'daily',
      streak: 15,
      completedToday: true,
      reminderTime: '7:00 AM',
      reminderEnabled: true,
      category: 'Wellness',
      color: 'from-purple-500 to-pink-500',
      totalCompleted: 45,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Read for 30 minutes',
      description: 'Expand knowledge through daily reading',
      frequency: 'daily',
      streak: 8,
      completedToday: false,
      reminderTime: '8:00 PM',
      reminderEnabled: true,
      category: 'Learning',
      color: 'from-cyan-500 to-blue-500',
      totalCompleted: 23,
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Weekly Workout Plan',
      description: 'Complete 3 gym sessions this week',
      frequency: 'weekly',
      streak: 4,
      completedToday: false,
      reminderEnabled: false,
      category: 'Fitness',
      color: 'from-green-500 to-emerald-500',
      totalCompleted: 12,
      createdAt: new Date()
    },
    {
      id: '4',
      title: 'Budget Review',
      description: 'Review and adjust monthly budget',
      frequency: 'monthly',
      streak: 3,
      completedToday: false,
      reminderTime: '1st of month',
      reminderEnabled: true,
      category: 'Finance',
      color: 'from-orange-500 to-red-500',
      totalCompleted: 3,
      createdAt: new Date()
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [filter, setFilter] = useState<'all' | 'daily' | 'weekly' | 'monthly'>('all');

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id 
        ? { 
            ...habit, 
            completedToday: !habit.completedToday,
            streak: !habit.completedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1),
            totalCompleted: !habit.completedToday ? habit.totalCompleted + 1 : habit.totalCompleted
          }
        : habit
    ));
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const editHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowCreateForm(true);
  };

  const saveHabit = (habitData: CreateHabitForm) => {
    if (editingHabit) {
      // Update existing habit
      setHabits(prev => prev.map(habit => 
        habit.id === editingHabit.id 
          ? { ...habit, ...habitData }
          : habit
      ));
    } else {
      // Create new habit
      const newHabit: Habit = {
        id: Date.now().toString(),
        ...habitData,
        streak: 0,
        completedToday: false,
        totalCompleted: 0,
        createdAt: new Date()
      };
      setHabits(prev => [...prev, newHabit]);
    }
    setEditingHabit(null);
  };

  const closeModal = () => {
    setShowCreateForm(false);
    setEditingHabit(null);
  };

  const filteredHabits = habits.filter(habit => 
    filter === 'all' || habit.frequency === filter
  );

  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);
  const completedToday = habits.filter(habit => habit.completedToday).length;
  const averageStreak = habits.length > 0 ? Math.round(totalStreak / habits.length) : 0;

  return (
    <div className="pt-26 min-h-screen bg-black/50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Smart Habit Tracking</h1>
              <p className="text-gray-400">Create goals, set reminders, and build streaks</p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{completedToday}</div>
                  <div className="text-gray-400 text-sm">Completed Today</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{totalStreak}</div>
                  <div className="text-gray-400 text-sm">Total Streaks</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{averageStreak}</div>
                  <div className="text-gray-400 text-sm">Avg. Streak</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{habits.length}</div>
                  <div className="text-gray-400 text-sm">Active Habits</div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Filter Tabs */}
            <div className="flex bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10">
              {(['all', 'daily', 'weekly', 'monthly'] as const).map((freq) => (
                <button
                  key={freq}
                  onClick={() => setFilter(freq)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                    filter === freq
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>

            {/* Add Habit Button */}
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-xl text-white font-semibold flex items-center space-x-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Habit</span>
            </button>
          </div>
        </div>

        {/* Create/Edit Habit Modal */}
        <CreateHabitModal
          isOpen={showCreateForm}
          onClose={closeModal}
          onSave={saveHabit}
          editingHabit={editingHabit}
        />

        {/* Habit Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={toggleHabit}
              onEdit={editHabit}
              onDelete={deleteHabit}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredHabits.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No habits found</h3>
            <p className="text-gray-400 mb-6">Create your first habit to start building streaks!</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-xl text-white font-semibold"
            >
              Create Your First Habit
            </button>
          </div>
        )}

        {/* Create/Edit Habit Modal */}
        <CreateHabitModal
          isOpen={showCreateForm}
          onClose={closeModal}
          onSave={saveHabit}
          editingHabit={editingHabit}
        />

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">View Achievements</div>
                <div className="text-gray-400 text-sm">See your earned badges</div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
            </button>
            
            <button className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Analytics</div>
                <div className="text-gray-400 text-sm">Track your progress</div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
            </button>
            
            <button className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Reminder Settings</div>
                <div className="text-gray-400 text-sm">Manage notifications</div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHabitTracking;