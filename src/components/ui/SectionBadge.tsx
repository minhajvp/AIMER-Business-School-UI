
import React from 'react';

interface SectionBadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'charcoal' | 'outline';
  className?: string;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({
  children,
  variant = 'teal',
  className = '',
}) => {
  const variantStyles = {
    teal: 'text-aimer-800 border-aimer-200',
    charcoal: 'text-charcoal-800 border-charcoal-200',
    outline: 'text-aimer-700 border-aimer-300',
  };

  return (
    <div
      className={`
        inline-flex items-center gap-3
        py-1.5 px-0
        border-b-2
        text-[11px] font-bold
        uppercase tracking-[0.22em]
        rounded-none
        ${variantStyles[variant]}
        ${className}
      `}
    >
      <span
            aria-hidden="true"
            className="inline-block w-7 h-px bg-aimer-700 origin-left transition-transform duration-700 ease-out"
            
          />
      {children}
    </div>
  );
};

export default SectionBadge;
