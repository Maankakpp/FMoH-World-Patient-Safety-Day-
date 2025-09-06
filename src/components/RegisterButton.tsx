import React from 'react';

const RegisterButton: React.FC<{ className?: string }> = ({ className }) => {
  const scrollToRegistration = () => {
    const el = document.getElementById('registration');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToRegistration}
      className={`bg-gradient-to-r from-who-blue to-who-orange text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ${className}`}
    >
      Register Now
    </button>
  );
};

export default RegisterButton;
