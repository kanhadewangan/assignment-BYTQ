import React, { useState } from 'react';

export default function SignIn({ onForgotPasswordOpen, onForgotPasswordClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showForgot, setShowForgot] = useState(false);

    const handleSubmit = () => {
        console.log('Sign in attempted with:', { email, password });
    };

    const handleForgotClick = () => {
        setShowForgot(true);
        if (onForgotPasswordOpen) onForgotPasswordOpen();
    };

    const handleForgotClose = () => {
        setShowForgot(false);
        if (onForgotPasswordClose) onForgotPasswordClose();
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full px-4 sm:px-12 py-6 sm:py-8">
            <div className="w-full max-w-xs sm:max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back!</h1>

                    {/* Social Login Buttons */}
                    <div className="flex gap-4 justify-center mb-6">
                        <button className="w-10 h-10 rounded-full border-2 border-orange-300 flex items-center justify-center hover:bg-orange-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300">
                            <span className="text-orange-500 font-bold text-lg">G</span>
                        </button>
                        <button className="w-10 h-10 rounded-full border-2 border-orange-300 flex items-center justify-center hover:bg-orange-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300">
                            <span className="text-orange-500 font-bold text-lg">f</span>
                        </button>
                    </div>

                    <p className="text-gray-500 text-sm mb-6">or use your email for registration</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-400 transition-colors placeholder-gray-400 text-sm"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-400 transition-colors placeholder-gray-400 text-sm"
                            required
                        />
                    </div>

                    <div className="text-right">
                        <button
                            type="button"
                            className="text-orange-500 text-sm hover:text-orange-600 transition-colors focus:outline-none focus:underline"
                            onClick={handleForgotClick}
                        >
                            Forgot your password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
                    >
                        Sign In
                    </button>
                </form>
            </div>
            {/* Forgot Password Modal */}
            {showForgot && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 w-full max-w-xs sm:max-w-md relative animate-fadeIn">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none"
                            onClick={handleForgotClose}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-extrabold text-center mb-4 text-gray-800">Forgot Password?</h2>
                        <p className="text-gray-600 text-center mb-6">No worries! Enter your email address below and we'll send you a link to reset your password.</p>
                        <form onSubmit={e => { e.preventDefault(); /* handle reset logic here */ }}>
                            <input
                                type="email"
                                placeholder="Enter your Email"
                                className="w-full px-4 py-3 mb-6 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 text-base"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-lg font-semibold text-lg shadow hover:from-orange-500 hover:to-orange-600 transition-colors"
                            >
                                Send Reset Link
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}