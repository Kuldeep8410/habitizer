"use client"

import React, { useState, useEffect } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 50) return 'Name must be less than 50 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        break;
      case 'phone':
        if (!value.trim()) return 'Phone is required';
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(value.replace(/\D/g, ''))) return 'Please enter a valid phone number (10-15 digits)';
        break;
      case 'address':
        if (!value.trim()) return 'Address is required';
        if (value.trim().length < 10) return 'Address must be at least 10 characters';
        if (value.trim().length > 200) return 'Address must be less than 200 characters';
        break;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    
    if (!validateForm()) {
      setErrorMessage('Please fill in all fields correctly.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:3000/post-all/signup2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim()
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        setSuccessMessage('Account created successfully! Welcome aboard! 🎉');
        setFormData({ name: '', email: '', phone: '', address: '' });
        setErrors({});
      } else {
        const error = await response.text();
        console.error('Server error:', error);
        setErrorMessage(`Server error: ${error || 'Please try again later.'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrorMessage('Network error: Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-hide messages after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-30" style={{
      background: 'black'
    }}>
      <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
            </div>
      <div className="w-full max-w-sm h-half">
        <div 
        className="bg-black/20 p-10 text-white rounded-3xl shadow-xl border border-white/30 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          style={{
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Header */}
          <div className="text-center text-white mb-8">
            <h1 
              className="text-4xl font-bold mb-3"
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Join Us
            </h1>
            <p className="text-gray-600">Create your account to get started</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-5 p-4 bg-green-100 border border-green-200 text-green-800 rounded-lg text-center font-semibold">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-4 bg-red-100 border border-red-200 text-red-800 rounded-lg text-center font-semibold">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <div className="space-y-6 w-full">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-white font-semibold mb-2 text-sm">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={`w-full px-5 py-4 border-2 rounded-xl text-white transition-all duration-300 focus:outline-none focus:-translate-y-1 focus:shadow-lg ${
                  errors.name 
                    ? 'border-red-400 focus:border-red-500' 
                    : formData.name && !errors.name
                    ? 'border-green-400 focus:border-green-500'
                    : 'border-gray-200 focus:border-blue-400'
                }`}
                style={{
                  boxShadow: errors.name ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 
                            formData.name && !errors.name ? '0 0 0 3px rgba(34, 197, 94, 0.1)' :
                            'none'
                }}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-white font-semibold mb-2 text-sm">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className={`w-full px-5 py-4 border-2 rounded-xl text-white transition-all duration-300 focus:outline-none focus:-translate-y-1 focus:shadow-lg ${
                  errors.email 
                    ? 'border-red-400 focus:border-red-500' 
                    : formData.email && !errors.email
                    ? 'border-green-400 focus:border-green-500'
                    : 'border-gray-200 focus:border-blue-400'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-white font-semibold mb-2 text-sm">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className={`w-full px-5 py-4 border-2 rounded-xl text-white transition-all duration-300 focus:outline-none focus:-translate-y-1 focus:shadow-lg ${
                  errors.phone 
                    ? 'border-red-400 focus:border-red-500' 
                    : formData.phone && !errors.phone
                    ? 'border-green-400 focus:border-green-500'
                    : 'border-gray-200 focus:border-blue-400'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Address Field */}
            <div>
              <label htmlFor="address" className="block text-white font-semibold mb-2 text-sm">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className={`w-full px-5 py-4 border-2 rounded-xl text-white transition-all duration-300 focus:outline-none focus:-translate-y-1 focus:shadow-lg ${
                  errors.address 
                    ? 'border-red-400 focus:border-red-500' 
                    : formData.address && !errors.address
                    ? 'border-green-400 focus:border-green-500'
                    : 'border-gray-200 focus:border-blue-400'
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-4 px-6 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none uppercase tracking-wide"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: isLoading ? 'none' : '0 10px 25px rgba(102, 126, 234, 0.3)'
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div 
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                  />
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;