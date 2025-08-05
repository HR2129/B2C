"use client";

import { useState } from 'react';
import Link from 'next/link';
import Galaxy from '@/components/react-bits/galaxy';

export default function Page() {
  const [firstName, setFirstName] = useState('');
  const [country, setCountry] = useState('United States');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Galaxy transparent={true} mouseInteraction={true} />
      </div>


      <div className="relative z-10 flex justify-center px-10 py-28 items-center min-h-screen w-full  pointer-events-none">
        <div className="p-8 bg-white rounded-xl shadow-lg max-w-3xl w-full text-center border border-gray-200 pointer-events-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="mt-0 text-2xl font-serif text-gray-800">Create new account</h2>
          </div>
          <p className="text-sm text-gray-500 mb-6 font-light">
            Create your account to be part of the INDIAN B2C world, discover our new collections and receive news from the Maison.
          </p>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Insert your Name"
              className="w-full p-3 border border-gray-200 rounded-md text-gray-800 focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <select
              className="w-full p-3 border border-gray-200 rounded-md text-gray-800 focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="United States">India</option>
              <option value="United Kingdom">Mumbai</option>
              <option value="Canada">Delhi</option>
              <option value="India">Hyderabad</option>
            </select>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-200 rounded-md text-gray-800 focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Insert your password"
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
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                className="w-full p-3 border border-gray-200 rounded-md text-gray-800 focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300 pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-yellow-500 transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </span>
            </div>
            <div className="text-left text-sm text-gray-600 mt-4">
              <p>Having read and understood the Privacy Information Notice, I declare that I am over 16 years of age and:</p>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  className="mr-2 accent-yellow-400"
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                />
                I agree to share information regarding my interests, preferences and purchasing habits (profiling) based on my purchases made at Bulgari and other LVMH Maisons.
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  className="mr-2 accent-yellow-400"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                />
                I consent to receiving marketing communications from INDIAN B2C regarding product care, services, events, and new collections.
              </label>
              <p className="text-xs text-gray-500 mt-2">*Required fields</p>
            </div>
            <button className="w-full bg-black text-white cursor-pointer p-3 mt-6 rounded-md hover:bg-gray-800 transition-all duration-300 font-medium">
              SUBMIT NOW
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Do you have an account? <Link href="/login" className="text-yellow-500 hover:text-yellow-600 cursor-pointer">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
