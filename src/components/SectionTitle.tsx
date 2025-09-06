import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      {subtitle && <p className="text-who-orange font-semibold text-sm tracking-wider uppercase">{subtitle}</p>}
      <h2 className="text-3xl md:text-4xl font-bold text-who-blue mt-2">{title}</h2>
      <div className="flex justify-center mt-4">
        <div className="w-24 h-1 bg-who-orange rounded-full"></div>
      </div>
    </div>
  );
};

export default SectionTitle;
