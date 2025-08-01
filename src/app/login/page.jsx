"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      <style jsx global>{`
        @keyframes shimmer {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 0.7; transform: scale(1); }
          100% { opacity: 0; transform: scale(0); }
        }
        .shimmer {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, rgba(255,215,0,0.6) 90%, rgba(255,255,255,0) 20%);
          border-radius: 50%;
          animation: shimmer 2.5s infinite;
        }
        .shimmer:nth-child(1) { top: 15%; left: 25%; animation-delay: 0s; }
        .shimmer:nth-child(2) { top: 35%; left: 75%; animation-delay: 0.6s; }
        .shimmer:nth-child(3) { top: 65%; left: 15%; animation-delay: 1.2s; }
        .shimmer:nth-child(4) { top: 85%; left: 65%; animation-delay: 1.8s; }
      `}</style>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="relative p-8 bg-white rounded-xl shadow-lg max-w-xl w-full text-center border border-gray-200">
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
          />
          <div className="relative mt-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-200 rounded-md text-gray-800 focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-yellow-500 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <div className="flex justify-between mt-3">
            <label className="flex items-center text-sm text-gray-500">
              <input type="checkbox" className="mr-2 accent-yellow-400" /> Remember me
            </label>
            <a href="#" className="text-sm text-yellow-500 hover:text-yellow-600 transition-colors">Forgot password?</a>
          </div>
          <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-3 mt-6 rounded-md hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-medium">
            SIGN IN
          </button>
          {/* <p className="text-sm text-gray-500 mt-6">
            Not a member? <Link href="/signup" className="text-yellow-500 hover:text-yellow-600">Create account</Link>
          </p> */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
            <span className="flex items-center">💎 Create Your Wishlist</span>
            <span className="flex items-center">✨ Exclusive Content</span>
            <span className="flex items-center">📦 Track Your Orders</span>
            <span className="flex items-center">🎉 Early Access</span>
          </div>
          <Link href="/signup">
          <button className="w-full bg-transparent border border-yellow-400 text-yellow-500 p-3 mt-6 rounded-md hover:bg-yellow-50 transition-all duration-300 font-medium">
            CREATE ACCOUNT
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}