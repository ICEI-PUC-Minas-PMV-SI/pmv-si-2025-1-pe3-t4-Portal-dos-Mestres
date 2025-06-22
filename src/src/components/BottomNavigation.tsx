
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, User, MessageSquare, Grid2x2 } from 'lucide-react';

const BottomNavigation = () => {
  const navItems = [
    { icon: Grid2x2, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Grupos', path: '/groups' },
    { icon: MessageSquare, label: 'Fórum', path: '/forum' },
    { icon: User, label: 'Perfil', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary/20 px-4 py-2 z-50 md:relative md:border-t-0 md:bg-transparent md:px-0 md:py-0">
      <div className="flex justify-around max-w-md mx-auto md:hidden">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-secondary/60 hover:text-primary hover:bg-primary/5'
              }`
            }
          >
            <Icon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex md:flex-col md:space-y-2 md:w-64 md:p-6">
        <h2 className="text-lg font-bold text-secondary mb-4">Navegação</h2>
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary bg-primary/10 font-medium'
                  : 'text-secondary/60 hover:text-primary hover:bg-primary/5'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
