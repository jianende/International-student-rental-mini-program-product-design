import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, MapPin } from 'lucide-react';
import { CITIES, LISTINGS } from '../mockData';
import ListingCard from '../components/ListingCard';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header / Location */}
      <div className="bg-white px-4 pt-12 pb-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center text-gray-800">
          <MapPin size={18} className="text-primary mr-1" />
          <span className="font-bold text-lg">洛杉矶</span>
          <span className="text-xs text-gray-400 ml-2">当前定位</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-4 bg-white">
        <div 
          onClick={() => navigate('/search')}
          className="bg-gray-100 rounded-full h-10 flex items-center px-4 text-gray-400 cursor-pointer"
        >
          <Search size={18} className="mr-2" />
          <span className="text-sm">搜索公寓名称、学校...</span>
        </div>
      </div>

      {/* AI Entry Banner */}
      <div className="px-4 my-2">
        <div 
          onClick={() => navigate('/ai-chat')}
          className="bg-gradient-to-r from-primary to-orange-400 rounded-2xl p-4 text-white flex items-center justify-between shadow-lg shadow-orange-200 cursor-pointer relative overflow-hidden"
        >
            <div className="relative z-10">
                <div className="flex items-center mb-1">
                    <Sparkles size={20} className="mr-2 animate-pulse" />
                    <h2 className="font-bold text-lg">AI 智能找房</h2>
                </div>
                <p className="text-xs opacity-90">告诉我不懂的，只要说出你的需求</p>
            </div>
            <div className="relative z-10 bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <div className="text-xs font-bold px-2">Try it</div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute right-12 -top-8 w-20 h-20 bg-white/10 rounded-full"></div>
        </div>
      </div>

      {/* Hot Cities */}
      <div className="mt-6 px-4">
        <h3 className="font-bold text-lg mb-3 text-gray-800">热门留学城市</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {CITIES.map(city => (
            <div key={city.id} onClick={() => navigate('/search')} className="flex-shrink-0 flex flex-col items-center w-20 cursor-pointer">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-colors">
                <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs mt-2 text-gray-600 font-medium">{city.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Listings */}
      <div className="mt-6 px-4">
        <div className="flex justify-between items-end mb-4">
            <h3 className="font-bold text-lg text-gray-800">品牌房源精选</h3>
            <span className="text-xs text-gray-400 mb-1">拎包入住 · 全包服务</span>
        </div>
        
        <div>
          {LISTINGS.filter((_, i) => i < 3).map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>

      {/* Floating AI Button (for quick access anywhere on home) */}
      <button
        onClick={() => navigate('/ai-chat')}
        className="fixed bottom-20 right-4 bg-black text-white rounded-full p-4 shadow-2xl z-40 border-2 border-primary hover:scale-105 transition-transform"
      >
        <Sparkles size={24} className="text-primary" />
      </button>

    </div>
  );
};

export default Home;