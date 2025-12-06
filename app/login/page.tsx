'use client';

import React, { useState } from 'react';
import { Roboto } from 'next/font/google';
import Link from 'next/link';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Job Applicant');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Redirect or show success message
      // For now, we'll just redirect to a dashboard or home page
      // Since we don't have a dashboard yet, maybe just alert or log
      console.log('Login successful:', data);
      // window.location.href = '/dashboard'; 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${roboto.variable} font-[family-name:var(--font-roboto)] min-h-screen bg-[#f0f6ff] flex items-center justify-center p-4`}>
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-2xl flex overflow-hidden">
        {/* Left Side - Illustration */}
        <div className="hidden md:flex w-1/2 bg-[#DBEAFE] p-12 flex-col justify-center items-center relative">
          <img
            alt="Illustration of a person with a clipboard connecting with another person, symbolizing networking and social impact"
            className="w-full max-w-sm z-10"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgO_z1kxkM0oShCl2MEK2v6jn2ZRATOhLjjBxhXwY99CbRkxOmPFNQKK6sFFvG-7gJNNcQa0-MDOCFSEGP83r8cS7iNbLRfbrhmOXjR367B6vPNaq5vP2L9InzaFUHI-xfaetly7gKWYXQ3lYSSInnGziBl0fV-66bE99rtAf5vjgMoCk1AFehWWCBE8Ag2vv_POTvqnCKdm61QZeNpEDTPFjDIVB7OnBqL_qy2mQXFiI6E12tnel1RjjkyqgyzQZi6nhWkk8mF1Q"
          />
          <div className="mt-8 text-center z-10">
            <h1 className="text-4xl font-bold text-gray-800">Welcome to ImpactHub</h1>
            <p className="text-gray-600 mt-2">Connecting students and corporations for social impact.</p>
          </div>
          <div className="absolute top-8 left-8 w-12 h-12 bg-blue-200 rounded-full opacity-50"></div>
          <div className="absolute bottom-8 right-8 w-20 h-20 bg-blue-200 rounded-lg opacity-50 transform rotate-45"></div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.6,12.71a1,1,0,0,0,1.4,1.41l8-8A1,1,0,0,0,18.59,4.29Z"></path>
                <path d="M12.4,18,9.55,15.15a1,1,0,0,0-1.41,0L3.29,20.15a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l4-4,2.5,2.5a1,1,0,0,0,1.41-1.42Z"></path>
              </svg>
              <h2 className="text-2xl font-bold text-gray-800">ImpactHub</h2>
            </div>

            <form onSubmit={handleLogin}>
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                  {error}
                </div>
              )}

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="email">
                  Username or E-mail
                </label>
                <input
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded text-gray-900 focus:ring-primary focus:border-primary outline-none focus:ring-2"
                  id="email"
                  placeholder="your.email@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded text-gray-900 focus:ring-primary focus:border-primary outline-none focus:ring-2"
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="role">
                  I am a
                </label>
                <select
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded text-gray-900 focus:ring-primary focus:border-primary outline-none focus:ring-2"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>Job Applicant</option>
                  <option>Job Poster</option>
                </select>
              </div>

              <button
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300 cursor-pointer disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Logging In...' : 'Log In'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Do Not Have Account?{' '}
                <Link className="font-medium text-primary hover:underline" href="/signup">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
