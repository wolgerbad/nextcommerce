'use client';

import { useState } from 'react';
import { signIn, signUp } from '../lib/actions';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';

export default function LoginClient() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [signupError, setSignUpError] = useState('');

  const router = useRouter();

  async function handleSignIn(formData: any) {
    setError('');
    const email = formData.get('email');
    const password = formData.get('password');
    const result = await signIn({ email, password });

    if (result?.user) router.refresh();

    if (!result?.user) setError(result);
  }

  async function handleSignUp(formData: any) {
    setSignUpError('');
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    const result = await signUp({ name, email, password });
    if (result?.user) router.refresh();
    if (!result?.user) setSignUpError(result);
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🔐</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isSignUp ? 'Create Account' : 'Welcome to kitapsepeti.com'}
        </h1>
        <p className="text-gray-600">
          {isSignUp
            ? 'Sign up to get started ordering'
            : 'Sign in to access your account'}
        </p>
      </div>

      {/* Toggle Buttons */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setIsSignUp(false)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            !isSignUp
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setIsSignUp(true)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            isSignUp
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Sign In Form */}
      {!isSignUp && (
        <form className="space-y-4" action={handleSignIn}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-red-800">{error}</p>}
          <SignInButton />
        </form>
      )}

      {/* Sign Up Form */}
      {isSignUp && (
        <form action={handleSignUp} className="space-y-4">
          <div>
            <label
              htmlFor="signup-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="signup-name"
              name="name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label
              htmlFor="signup-email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="signup-email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="signup-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="signup-password"
              name="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Create a password"
            />
            {signupError && <p className="text-red-800">{signupError}</p>}
          </div>
          <SignUpButton />
        </form>
      )}

      <p className="text-sm text-gray-500 mt-6 text-center">
        Secure authentication with email and password
      </p>
    </div>
  );
}

function SignInButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={` ${
        pending
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-purple-400 to-purple-700 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg'
      } w-full  text-white font-semibold py-3 px-6 rounded-lg `}
    >
      {pending ? 'Signing in...' : 'Sign In'}
    </button>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`${
        pending
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-purple-400 to-purple-700 hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg'
      } w-full  text-white font-semibold py-3 px-6 rounded-lg`}
    >
      {pending ? 'Creating Account...' : 'Create Account'}
    </button>
  );
}
