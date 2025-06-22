
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import BottomNavigation from '@/components/BottomNavigation';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ 
  children, 
  sidebar,
  className = ""
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-primary-lighter/10 to-white pb-20 ${className}`}>
        {children}
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-primary-lighter/10 to-white ${className}`}>
      <div className="flex max-w-7xl mx-auto">
        {/* Desktop Sidebar */}
        {sidebar && (
          <div className="w-64 border-r border-primary/20">
            {sidebar}
          </div>
        )}
        
        {/* Main Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveLayout;
