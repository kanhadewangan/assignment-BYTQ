import React, { useState } from 'react';
import SignIn from '../Signin/Signin';
import Signup from '../Signup/Signup';

const Overlay = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-2 sm:p-4">
      <div className={`relative bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[768px] min-h-[520px] z-10 flex flex-col sm:block ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        {/* Sign In Panel */}
        <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out flex flex-col items-center w-full sm:w-1/2 ${isRightPanelActive ? 'left-0 z-5 opacity-0 pointer-events-none' : 'left-0 z-5 opacity-100'}`}>
          <SignIn
            onForgotPasswordOpen={() => setIsForgotOpen(true)}
            onForgotPasswordClose={() => setIsForgotOpen(false)}
          />
        </div>
        <div className={`absolute top-0 right-0 h-full transition-all duration-600 ease-in-out flex flex-col items-center w-full sm:w-1/2 ${isRightPanelActive ? 'z-5 opacity-100' : 'z-5 opacity-0 pointer-events-none'}`}>
          <Signup
            onOtpOpen={() => setIsOtpOpen(true)}
            onOtpClose={() => setIsOtpOpen(false)}
          />
        </div>

        {/* Overlay Panel */}
        {!(isForgotOpen || isOtpOpen) && (
          <div className={`hidden sm:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-100 ${isRightPanelActive ? '-translate-x-full' : 'translate-x-0'}`}>
            <div className={`
    h-full w-full flex flex-col justify-center items-center
    bg-gradient-to-br from-orange-500 via-orange-400 to-orange-300
    shadow-2xl
    transition-transform duration-600 ease-in-out
    ${isRightPanelActive ? 'translate-x-0' : ''}
  `}>
              <div className="flex flex-col items-center justify-center h-full w-full text-center px-4 sm:px-8">
                {isRightPanelActive ? (
                  <>
                    <div className="max-w-[400px] mx-auto ml-0 sm:ml-[100px]">
                      <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 text-white drop-shadow ">Welcome Back!</h1>
                      <p className="text-sm sm:text-base text-white mb-8 opacity-90">
                        Sign in to continue tracking your shipments.
                      </p>
                      <button
                        className="px-6 sm:px-8 py-3 rounded-lg text-base font-semibold transition-all duration-200 bg-white/90 text-orange-500 border-2 border-white hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 shadow"
                        onClick={() => setIsRightPanelActive(false)}
                      >
                        Sign In
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="max-w-[400px] mx-auto ">
                      <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 text-white drop-shadow">New to BYTO?</h1>
                      <p className="text-sm sm:text-base text-white mb-8 opacity-90">
                        Enter your details to create an account and start tracking your shipments easily.
                      </p>
                      <button
                        className="px-6 sm:px-8 py-3 rounded-lg text-base font-semibold transition-all duration-200 bg-white/90 text-orange-500 border-2 border-white hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 shadow"
                        onClick={() => setIsRightPanelActive(true)}
                      >
                        Sign Up
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default Overlay;