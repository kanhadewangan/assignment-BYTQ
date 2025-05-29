import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const SignInPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setIsSubmitted(true);
    };

    const resetModal = () => {
        setIsModalOpen(false);
        setEmail('');
        setIsSubmitted(false);
        setIsLoading(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
        setIsSubmitted(false);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const slideInLeft = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 }
        }
    };

    const slideInRight = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 }
        }
    };

    const floatAnimation = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-20 -left-20 w-20 md:w-40 h-20 md:h-40 bg-orange-200 rounded-full opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute -bottom-20 -right-20 w-40 md:w-60 h-40 md:h-60 bg-orange-300 rounded-full opacity-10"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <motion.div
                className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full relative z-10"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Left Side - Sign In Form */}
                <motion.div
                    className="flex-1 p-6 md:p-12 flex flex-col justify-center"
                    variants={slideInLeft}
                >
                    <motion.div variants={itemVariants}>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8 text-center">Sign In</h2>
                    </motion.div>

                    {/* Social Login Buttons */}
                    <motion.div
                        className="flex justify-center space-x-4 mb-4 md:mb-6"
                        variants={itemVariants}
                    >
                        <motion.button
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-orange-500 border-1 border-orange-500 hover:bg-orange-600 hover:text-white transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-base md:text-lg font-bold">G</span>
                        </motion.button>
                        <motion.button
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-orange-500 border-1 border-orange-500 hover:bg-orange-600 hover:text-white transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-base md:text-lg font-bold">f</span>
                        </motion.button>
                    </motion.div>

                    <motion.p
                        className="text-sm md:text-base text-gray-500 text-center mb-6 md:mb-8"
                        variants={itemVariants}
                    >
                        or use your account
                    </motion.p>

                    {/* Form */}
                    <motion.form className="space-y-4 md:space-y-6" variants={itemVariants}>
                        <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <input
                                required
                                type="text"
                                placeholder="Email or Phone"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-orange-200 focus:border-orange-400 focus:outline-none transition-colors text-sm md:text-base"
                            />
                        </motion.div>

                        <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <input
                                required
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-orange-200 focus:border-orange-400 focus:outline-none transition-colors text-sm md:text-base"
                            />
                        </motion.div>

                        <motion.a
                            href="#"
                            className="block text-orange-500 hover:text-orange-600 text-center transition-colors text-sm md:text-base"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => openModal()}
                        >
                            Forgot your password?
                        </motion.a>

                        <motion.button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm md:text-base"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            variants={itemVariants}
                        >
                            Sign In
                        </motion.button>
                    </motion.form>
                </motion.div>

                <motion.div
                    className="flex-1 bg-gradient-to-br from-orange-400 to-orange-500 p-6 md:p-12 flex flex-col justify-center items-center text-white relative"
                    variants={slideInRight}
                >
                    <motion.div
                        className="text-center"
                        variants={itemVariants}
                    >
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold mb-4 md:mb-6"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            New to BYTO?
                        </motion.h2>

                        <motion.p
                            className="text-base md:text-lg mb-6 md:mb-8 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            Enter your details to create an account
                            <br />
                            and start tracking your shipments
                            <br />
                            easily.
                        </motion.p>

                        <motion.button
                            className="border-2 border-white text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition-all duration-300 text-sm md:text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up
                        </motion.button>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-4 md:bottom-8 right-4 md:right-8"
                        variants={floatAnimation}
                        animate="animate"
                    >
                        <div className="relative">
                            <div className="w-16 md:w-20 h-10 md:h-12 bg-orange-600 rounded-lg relative">
                                <div className="w-6 md:w-8 h-6 md:h-8 bg-orange-700 rounded-lg absolute -left-2 top-1"></div>
                                <div className="w-2 md:w-3 h-2 md:h-3 bg-white rounded-full absolute left-1 top-2"></div>
                            </div>
                            {/* Wheels */}
                            <div className="absolute -bottom-2 left-2">
                                <div className="w-3 md:w-4 h-3 md:h-4 bg-gray-800 rounded-full"></div>
                            </div>
                            <div className="absolute -bottom-2 right-2">
                                <div className="w-3 md:w-4 h-3 md:h-4 bg-gray-800 rounded-full"></div>
                            </div>
                            <motion.div
                                className="absolute left-20 md:left-24 top-3 md:top-4 space-y-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <div className="w-4 md:w-6 h-0.5 bg-white opacity-60"></div>
                                <div className="w-3 md:w-4 h-0.5 bg-white opacity-40"></div>
                                <div className="w-6 md:w-8 h-0.5 bg-white opacity-60"></div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 animate-in slide-in-from-bottom-4">
                                <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-100">
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                        {isSubmitted ? 'Check Your Email' : 'Forgot Password?'}
                                    </h2>
                                    <button
                                        onClick={resetModal}
                                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-full"
                                    >
                                        <X size={20} className="md:w-6 md:h-6" />
                                    </button>
                                </div>

                                <div className="p-4 md:p-6">
                                    {!isSubmitted ? (
                                        <>
                                            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                                                No worries! Enter your email address below and we'll send you a link to reset your password.
                                            </p>

                                            <div className="space-y-4">
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                                                    <input
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="w-full pl-9 md:pl-11 pr-3 md:pr-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm md:text-base"
                                                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                                                    />
                                                </div>

                                                <button
                                                    onClick={handleSubmit}
                                                    disabled={isLoading || !email}
                                                    className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-2 md:py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base"
                                                >
                                                    {isLoading ? (
                                                        <div className="flex items-center justify-center">
                                                            <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white mr-2"></div>
                                                            Sending...
                                                        </div>
                                                    ) : (
                                                        'Send Reset Link'
                                                    )}
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-4">
                                            <div className="mb-4 flex justify-center">
                                                <div className="bg-green-100 p-2 md:p-3 rounded-full">
                                                    <CheckCircle className="text-green-600 w-6 h-6 md:w-8 md:h-8" />
                                                </div>
                                            </div>
                                            <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
                                                We've sent a password reset link to <span className="font-semibold text-gray-800">{email}</span>
                                            </p>
                                            <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                                                Didn't receive the email? Check your spam folder or try again.
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setIsSubmitted(false);
                                                    setEmail('');
                                                }}
                                                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 text-sm md:text-base"
                                            >
                                                Try different email
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="px-4 md:px-6 py-3 md:py-4 bg-gray-50 rounded-b-2xl">
                                    <p className="text-center text-xs md:text-sm text-gray-500">
                                        Remember your password?{' '}
                                        <button
                                            onClick={resetModal}
                                            className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                                        >
                                            Sign in
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SignInPage;