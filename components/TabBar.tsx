import React from 'react';
import { AppRoute } from '../types';
import { Home, Search, User, MessageSquare } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const TabBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Simple mapping for route matching
  const currentPath = location.pathname.replace('/', '') || AppRoute.HOME;

  const tabs = [
    { id: AppRoute.HOME, label: '首页', icon: Home, path: '/' },
    { id: AppRoute.SEARCH, label: '找房', icon: Search, path: '/search' },
    { id: AppRoute.ME, label: '我的', icon: User, path: '/me' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50 max-w-md mx-auto">
      <div className="flex justify-around items-center h-14">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.id || (tab.id === AppRoute.HOME && currentPath === '');
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <tab.icon
                size={24}
                className={isActive ? 'text-primary' : 'text-gray-400'}
              />
              <span className={`text-[10px] mt-0.5 ${isActive ? 'text-primary font-medium' : 'text-gray-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;