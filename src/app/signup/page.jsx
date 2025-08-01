"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function SignUp() {
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('United States');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  return (
    <div className="relative flex justify-center px-10 py-28 items-center min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
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
          background: radial-gradient(circle, rgba(255,215,0,0.6) 90%, rgba(255,255,255,0) 10%);
          border-radius: 50%;
          animation: shimmer 2.5s infinite;
        }
          .shimmer:nth-child(1) { top: 15%; left: 25%; animation-delay: 0s; }
        .shimmer:nth-child(2) { top: 35%; left: 75%; animation-delay: 0.6s; }
        .shimmer:nth-child(3) { top: 65%; left: 15%; animation-delay: 1.2s; }
        .shimmer:nth-child(4) { top: 85%; left: 65%; animation-delay: 1.8s; }
        .shimmer:nth-child(5) { top: 20%; left: 50%; animation-delay: 0.3s; }
        .shimmer:nth-child(6) { top: 50%; left: 30%; animation-delay: 0.9s; }
        .shimmer:nth-child(7) { top: 70%; left: 90%; animation-delay: 1.5s; }
        .shimmer:nth-child(8) { top: 40%; left: 10%; animation-delay: 2.1s; }
      `}</style>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="relative p-8 bg-white rounded-xl shadow-lg max-w-3xl w-full text-center border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="mt-0 text-2xl font-serif text-gray-800">Create new account</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6 font-light">
          Create your account to be part of the INDIAN B2C world, discover our new collections and receive news from the Maison.
        </p>
        <div className="space-y-4">
          {/* <select
            className="w-full p-3 border border-gray-200 rounded-md text-gray-800 focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          >
            <option value="">Insert your title</option>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Mrs">Mrs</option>
            <option value="Dr">Dr</option>
          </select> */}
          <input
            type="text"
            placeholder="Insert your Name"
            className="w-full p-3 border border-gray-200 rounded-md text-gray-800 focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {/* <input
            type="text"
            placeholder="Insert your last name"
            className="w-full p-3 border border-gray-200 rounded-md text-gray-800 focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          /> */}
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
          {/* <input
            type="email"
            placeholder="Insert your email"
            className="w-full p-3 border border-gray-200 rounded-md text-gray-800 focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> */}
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
              I consent to receiving marketing communications from Bulgari regarding product care, services, events, and new collections.
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
  );
}