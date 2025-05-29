import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Shield, CheckCircle } from 'lucide-react';

const SignUpPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);
    const inputRefs = useRef([]);
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const handleInputChange = (index, value) => {
        if (value.length > 1) return; // Prevent multiple characters
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === 'Enter' && otp.every(digit => digit)) {
            handleVerify();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newOtp = [...otp];

        for (let i = 0; i < pastedData.length && i < 6; i++) {
            newOtp[i] = pastedData[i];
        }
        setOtp(newOtp);

        // Focus the next empty input or last input
        const nextEmptyIndex = newOtp.findIndex(digit => !digit);
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
        inputRefs.current[focusIndex]?.focus();
    };

    const handleVerify = async () => {
        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setError('OTP must be 6 digits.');
            return;
        }

        setIsVerifying(true);
        setError('');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate success (you can add logic to check actual OTP)
        setIsVerifying(false);
        setIsVerified(true);
    };

    const handleResendOTP = async () => {
        if (resendCooldown > 0) return;

        setResendCooldown(30);
        setOtp(['', '', '', '', '', '']);
        setError('');
        inputRefs.current[0]?.focus();
    };

    const resetModal = () => {
        setIsModalOpen(false);
        setOtp(['', '', '', '', '', '']);
        setIsVerifying(false);
        setIsVerified(false);
        setError('');
        setResendCooldown(0);
    };

    const openModal = () => {
        setIsModalOpen(true);
        setIsVerified(false);
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
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
                {/* Left Side - Welcome Section */}
                <motion.div
                    className="flex-1 bg-gradient-to-br from-orange-400 to-orange-500 p-6 md:p-12 flex flex-col justify-center items-center text-white relative"
                    variants={slideInLeft}
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
                            Welcome Back!
                        </motion.h2>

                        <motion.p
                            className="text-base md:text-lg mb-6 md:mb-8 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            Already have a BYTO account? Sign in
                            <br />
                            here to track your shipments.
                        </motion.p>

                        <motion.button
                            className="border-2 border-white text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            onClick={() => navigate('/login')}
                        >
                            Sign In
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Right Side - Create Account Form */}
                <motion.div
                    className="flex-1 p-6 md:p-12 flex flex-col justify-center"
                    variants={slideInRight}
                >
                    <motion.div variants={itemVariants}>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8 text-center">Create Account</h2>
                    </motion.div>

                    {/* Social Login Buttons */}
                    <motion.div
                        className="flex justify-center space-x-4 mb-4 md:mb-6"
                        variants={itemVariants}
                    >
                        <motion.button
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-orange-300 flex items-center justify-center text-orange-500 hover:bg-orange-500  hover:text-white transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-base md:text-lg font-bold">G</span>
                        </motion.button>
                        <motion.button
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-orange-300 flex items-center justify-center text-orange-500 hover:bg-orange-500  hover:text-white transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-base md:text-lg  font-bold">f</span>
                        </motion.button>
                    </motion.div>

                    <motion.p
                        className="text-sm md:text-base text-gray-500 text-center mb-6 md:mb-8"
                        variants={itemVariants}
                    >
                        or use your email for registration
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
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors text-sm md:text-base"
                            />
                        </motion.div>

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
                                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors text-sm md:text-base"
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
                                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors text-sm md:text-base"
                            />
                        </motion.div>

                        <motion.button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm md:text-base"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            variants={itemVariants}
                            onClick={() => openModal()}
                        >
                            Sign Up
                        </motion.button>
                    </motion.form>
                </motion.div>
            </motion.div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 animate-in slide-in-from-bottom-4">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-100">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                {isVerified ? 'Account Verified!' : 'Verify Your Account'}
                            </h2>
                            <button
                                onClick={resetModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-full"
                            >
                                <X size={20} className="md:w-6 md:h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-4 md:p-6">
                            {!isVerified ? (
                                <>
                                    <div className="text-center mb-4 md:mb-6">
                                        <div className="mb-3 md:mb-4 flex justify-center">
                                            <div className="bg-blue-100 p-2 md:p-3 rounded-full">
                                                <Shield className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
                                            </div>
                                        </div>
                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                            An OTP has been sent to <span className="font-semibold">{email}</span>. Please enter it below.
                                        </p>
                                    </div>

                                    <div className="flex justify-center gap-2 md:gap-3 mb-4">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={el => inputRefs.current[index] = el}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength="1"
                                                value={digit}
                                                onChange={(e) => handleInputChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                onPaste={handlePaste}
                                                className={`w-10 h-10 md:w-12 md:h-12 text-center text-lg md:text-xl font-bold border-2 rounded-lg focus:outline-none transition-all duration-200 ${digit
                                                    ? 'border-orange-400 bg-orange-50 text-orange-600'
                                                    : error
                                                        ? 'border-red-400 bg-red-50'
                                                        : 'border-gray-200 hover:border-gray-300 focus:border-orange-400'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {error && (
                                        <div className="mb-4 p-2 md:p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <p className="text-red-600 text-xs md:text-sm font-medium text-center">{error}</p>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleVerify}
                                        disabled={isVerifying || otp.some(digit => !digit)}
                                        className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-2 md:py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-[1.02] active:scale-[0.98] mb-4 text-sm md:text-base"
                                    >
                                        {isVerifying ? (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white mr-2"></div>
                                                Verifying...
                                            </div>
                                        ) : (
                                            'Verify OTP'
                                        )}
                                    </button>

                                    <div className="text-center">
                                        <button
                                            onClick={handleResendOTP}
                                            disabled={resendCooldown > 0}
                                            className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200 disabled:text-gray-400 disabled:cursor-not-allowed text-sm md:text-base"
                                        >
                                            {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP?'}
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
                                        Your account has been successfully verified!
                                    </p>
                                    <button
                                        onClick={() => {
                                            setIsModalOpen(false)
                                            navigate('/login')
                                        }}
                                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-4 md:px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-sm md:text-base"
                                    >
                                        Continue
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className='absolute bottom-4 md:bottom-8 right-4 md:right-8'>
                <motion.div
                    variants={floatAnimation}
                    animate="animate"
                >
                    <div className="relative">
                        {/* Truck body */}
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
                        {/* Motion lines */}
                        <motion.div
                            className="absolute left-20 md:left-24 top-3 md:top-4 space-y-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <div className="w-4 md:w-6 h-0.5 bg-gray-400 opacity-60"></div>
                            <div className="w-3 md:w-4 h-0.5 bg-gray-400 opacity-40"></div>
                            <div className="w-6 md:w-8 h-0.5 bg-gray-400 opacity-60"></div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SignUpPage;