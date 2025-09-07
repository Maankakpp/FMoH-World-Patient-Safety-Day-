import React from 'react';

const RegisterButton: React.FC<{ className?: string }> = ({ className }) => {
  const scrollToRegistration = () => {
    const el = document.getElementById('registration');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToRegistration}
      className={`bg-gradient-to-r from-who-blue to-who-orange text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-blue-500/50 hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 border border-white/20 text-shadow-md ${className}`}
    >
      Register Now
    </button>
  );
};

export default RegisterButton;
