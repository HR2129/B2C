"use client";
import { useState } from 'react';
import Link from 'next/link';
import Galaxy from '@/components/react-bits/galaxy';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Galaxy Background */}
      <div className="absolute inset-0 z-0">
        <Galaxy transparent={true} mouseInteraction={true} />
      </div>


      {/* Sign-In Form */}
      <div className="relative z-10 flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-gray-50/80 via-white/80 to-gray-100/80 pointer-events-none">
        <div className="p-8 bg-white rounded-xl shadow-lg max-w-xl w-full text-center border border-gray-200 pointer-events-auto">
          <h2 className="mt-0 text-3xl font-serif text-gray-800">Welcome to Luxe Diamonds</h2>
          <p className="text-sm text-gray-500 mt-2 font-light">
            Embrace timeless elegance. Create an account to explore exclusive collections and receive radiant updates from Luxe Diamonds.
          </p>
          <div className="mt-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 mt-4 border border-gray-200 rounded-md text-gray-800 focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <div className="relative mt-4">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-200 rounded-md text-gray-800 focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-yellow-500 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                role="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
            <div className="flex justify-between mt-3">
              <label className="flex items-center text-sm text-gray-500">
                <input
                  type="checkbox"
                  className="mr-2 accent-yellow-400"
                  aria-label="Remember me"
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-sm text-yellow-500 hover:text-yellow-600 transition-colors"
                aria-label="Forgot password"
              >
                Forgot password?
              </a>
            </div>
            <button
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-3 mt-6 rounded-md hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-medium"
              aria-label="Sign in"
            >
              SIGN IN
            </button>
            <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
              <span className="flex items-center">💎 Create Your Wishlist</span>
              <span className="flex items-center">✨ Exclusive Content</span>
              <span className="flex items-center">📦 Track Your Orders</span>
              <span className="flex items-center">🎉 Early Access</span>
            </div>
            <Link href="/signup">
              <button
                className="w-full bg-transparent border border-yellow-400 text-yellow-500 p-3 mt-6 rounded-md hover:bg-yellow-50 transition-all duration-300 font-medium"
                aria-label="Create account"
              >
                CREATE ACCOUNT
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
