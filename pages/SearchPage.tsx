
import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Map, List, X, Filter, Check, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LISTINGS } from '../mockData';
import ListingCard from '../components/ListingCard';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  
  // Filter States
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState({
      maxPrice: 5000,
      roomTypes: [] as string[],
      flexibleLease: false, // Support short term / exchange student lease
  });

  // Derived Filtered Listings
  const filteredListings = useMemo(() => {
      return LISTINGS.filter(listing => {
          // Price Filter
          if (listing.price > filters.maxPrice) return false;
          
          // Room Type Filter
          if (filters.roomTypes.length > 0) {
              // Simple string matching for prototype (e.g., check if type includes 'Studio')
              const matchesType = filters.roomTypes.some(t => listing.type.toLowerCase().includes(t.toLowerCase()));
              if (!matchesType) return false;
          }

          // Lease Filter (Short Term / Exchange)
          if (filters.flexibleLease) {
              const isFlexible = listing.leaseTerms.some(term => 
                  term.includes('Short') || 
                  term.includes('Semester') || 
                  term.includes('Month') && parseInt(term) < 12
              );
              if (!isFlexible) return false;
          }

          return true;
      });
  }, [filters]);

  const toggleRoomType = (type: string) => {
      setFilters(prev => {
          if (prev.roomTypes.includes(type)) {
              return { ...prev, roomTypes: prev.roomTypes.filter(t => t !== type) };
          } else {
              return { ...prev, roomTypes: [...prev.roomTypes, type] };
          }
      });
  };

  // Calculate dynamic map center based on filtered results (Mock logic)
  const mapCenterUrl = useMemo(() => {
      if (filteredListings.length > 0) {
          const l = filteredListings[0];
          // Using Mapbox static image API format with mock access token
          return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${l.location.lng},${l.location.lat},13,0/600x800?access_token=mock`;
      }
      // Default LA center
      return 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-118.2851,34.0224,13,0/600x800?access_token=mock';
  }, [filteredListings]);

  // Helper to position markers randomly for the prototype
  // In a real app, these would be projected from lat/lng to screen coordinates
  const getMarkerPosition = (index: number) => {
    const positions = [
        { top: '40%', left: '50%' },
        { top: '55%', left: '35%' },
        { top: '30%', left: '60%' },
        { top: '60%', left: '75%' },
        { top: '45%', left: '45%' },
        { top: '50%', left: '65%' }
    ];
    return positions[index % positions.length];
  };

  return (
    <div className="pb-20 min-h-screen bg-gray-50 flex flex-col">
      {/* Top Search Bar */}
      <div className="bg-white px-4 pt-12 pb-2 sticky top-0 z-30 border-b shadow-sm">
        <div className="bg-gray-100 rounded-lg h-9 flex items-center px-3 text-gray-500 mb-3">
          <Search size={16} className="mr-2" />
          <input 
            type="text" 
            placeholder="输入公寓名或学校" 
            className="bg-transparent w-full text-sm outline-none text-gray-800"
          />
        </div>
        
        {/* Filter Tabs */}
        <div className="flex justify-between items-center text-xs text-gray-600 pb-2">
          <div className="flex gap-4">
            <button 
                onClick={() => setShowFilterPanel(true)}
                className="flex items-center font-medium text-gray-800"
            >
              筛选/租期 <ChevronDown size={12} className="ml-1" />
            </button>
            <button onClick={() => setShowFilterPanel(true)} className="flex items-center">
              价格 <ChevronDown size={12} className="ml-1" />
            </button>
          </div>
          <button 
            onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
            className="text-primary flex items-center font-medium"
          >
            {viewMode === 'list' ? <Map size={16} /> : <List size={16} />}
            <span className="ml-1">{viewMode === 'list' ? '地图' : '列表'}</span>
          </button>
        </div>
      </div>

      {/* Filter Panel (Overlay) */}
      {showFilterPanel && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
              <div 
                className="flex-1"
                onClick={() => setShowFilterPanel(false)}
              ></div>
              <div className="bg-white rounded-t-2xl p-5 w-full max-w-md mx-auto animate-in slide-in-from-bottom duration-300">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg">筛选房源</h3>
                      <div className="flex items-center gap-4">
                         {/* Clear All Button */}
                         <button 
                            onClick={() => setFilters({ maxPrice: 5000, roomTypes: [], flexibleLease: false })}
                            className="text-xs font-medium text-gray-500 flex items-center hover:text-primary transition-colors bg-gray-100 px-3 py-1.5 rounded-full"
                         >
                             <RotateCcw size={12} className="mr-1.5"/> 重置
                         </button>
                         <button onClick={() => setShowFilterPanel(false)} className="p-1 hover:bg-gray-100 rounded-full">
                             <X size={24} className="text-gray-400"/>
                         </button>
                      </div>
                  </div>

                  <div className="space-y-8">
                      {/* Room Type */}
                      <div>
                          <label className="text-sm font-bold text-gray-900 mb-3 block">房型 (Room Type)</label>
                          <div className="flex flex-wrap gap-2">
                              {['Studio', '1B', '2B', '3B'].map(type => (
                                  <button 
                                    key={type}
                                    onClick={() => toggleRoomType(type)}
                                    className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all shadow-sm active:scale-95 ${
                                        filters.roomTypes.includes(type) 
                                        ? 'bg-gray-900 text-white border-gray-900' 
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                    }`}
                                  >
                                      {type}
                                  </button>
                              ))}
                          </div>
                      </div>

                      {/* Price Range */}
                      <div>
                          <div className="flex justify-between mb-4 items-end">
                             <label className="text-sm font-bold text-gray-900">预算上限</label>
                             <div className="text-primary font-bold text-xl">
                                ${filters.maxPrice}
                                <span className="text-xs text-gray-400 font-normal ml-1">/月</span>
                             </div>
                          </div>
                          <input 
                            type="range" 
                            min="1000" 
                            max="5000" 
                            step="100"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                            className="w-full accent-primary h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium">
                              <span>$1,000</span>
                              <span>$5,000+</span>
                          </div>
                      </div>

                      {/* Lease Term */}
                      <div>
                          <label className="text-sm font-bold text-gray-900 mb-3 block">租期偏好</label>
                          <div 
                            onClick={() => setFilters({...filters, flexibleLease: !filters.flexibleLease})}
                            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                                filters.flexibleLease 
                                ? 'bg-orange-50 border-primary shadow-sm' 
                                : 'bg-white border-gray-200'
                            }`}
                          >
                              <div className="flex flex-col">
                                  <span className={`text-sm font-bold ${filters.flexibleLease ? 'text-primary' : 'text-gray-800'}`}>灵活租期 / 短租</span>
                                  <span className="text-[10px] text-gray-500 mt-0.5">适用于交换生、寒暑假 (Semester/Short-term)</span>
                              </div>
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${filters.flexibleLease ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}`}>
                                  {filters.flexibleLease && <Check size={12} className="text-white"/>}
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="mt-8 pt-4 border-t">
                      <button 
                        onClick={() => setShowFilterPanel(false)}
                        className="w-full bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-200 active:scale-95 transition-transform flex justify-center items-center gap-2"
                      >
                          查看 {filteredListings.length} 套房源
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto relative">
        {/* Active Filters Badge Display */}
        {(filters.maxPrice < 5000 || filters.roomTypes.length > 0 || filters.flexibleLease) && (
            <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
                {filters.flexibleLease && (
                    <span className="text-[10px] bg-primary text-white px-2 py-1 rounded flex items-center flex-shrink-0">
                        灵活租期 <X size={10} className="ml-1 cursor-pointer" onClick={() => setFilters({...filters, flexibleLease: false})}/>
                    </span>
                )}
                {filters.roomTypes.map(t => (
                    <span key={t} className="text-[10px] bg-gray-800 text-white px-2 py-1 rounded flex items-center flex-shrink-0">
                        {t} <X size={10} className="ml-1 cursor-pointer" onClick={() => toggleRoomType(t)}/>
                    </span>
                ))}
                {filters.maxPrice < 5000 && (
                    <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-1 rounded flex items-center flex-shrink-0">
                        &lt; ${filters.maxPrice}
                    </span>
                )}
            </div>
        )}

        {viewMode === 'list' ? (
          <div className="p-4">
             {filteredListings.length > 0 ? (
                 filteredListings.map(listing => (
                   <ListingCard key={listing.id} listing={listing} />
                 ))
             ) : (
                 <div className="text-center py-20 text-gray-400">
                     <Filter size={40} className="mx-auto mb-2 opacity-20" />
                     <p>没有找到符合条件的房源</p>
                     <button onClick={() => setFilters({ maxPrice: 5000, roomTypes: [], flexibleLease: false })} className="text-primary text-xs mt-2 underline">清除筛选</button>
                 </div>
             )}
             {filteredListings.length > 0 && <div className="text-center text-gray-400 text-xs mt-4">没有更多房源了</div>}
          </div>
        ) : (
          <div 
            className="h-full w-full bg-gray-200 relative overflow-hidden"
            onClick={() => setSelectedListingId(null)}
          >
             {/* Mock Map Background - Dynamic based on filters */}
             <div 
                className="absolute inset-0 bg-cover opacity-90 grayscale-[20%] transition-all duration-500"
                style={{ backgroundImage: `url('${mapCenterUrl}')` }}
             ></div>
             
             {/* Interactive Markers */}
             {filteredListings.map((listing, index) => {
                 const pos = getMarkerPosition(index);
                 const isSelected = selectedListingId === listing.id;
                 
                 return (
                    <button 
                        key={listing.id}
                        type="button"
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full group animate-in zoom-in duration-300"
                        style={{ top: pos.top, left: pos.left, zIndex: isSelected ? 30 : 20 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedListingId(listing.id);
                        }}
                        aria-label={`查看房源 ${listing.title}, 价格 ${listing.currency}${listing.price}`}
                        aria-pressed={isSelected}
                    >
                        {/* Price Tag Marker */}
                        <span className={`
                            flex items-center justify-center px-2.5 py-1.5 rounded-full shadow-lg border
                            transition-transform duration-200
                            ${isSelected 
                                ? 'bg-gray-900 text-white border-gray-900 scale-110' 
                                : 'bg-white text-gray-900 border-white group-hover:scale-105'}
                        `}>
                            <span className="text-xs font-bold">{listing.currency}{listing.price}</span>
                        </span>
                        
                        {/* Marker Pointer Triangle */}
                        <span className={`
                            block w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] mx-auto -mt-[1px]
                            border-l-transparent border-r-transparent
                            ${isSelected ? 'border-t-gray-900' : 'border-t-white'}
                        `}></span>
                    </button>
                 );
             })}

             {/* Popover Card */}
             {selectedListingId && (
                 <div className="absolute bottom-6 left-4 right-4 z-40 animate-in slide-in-from-bottom-4 duration-300">
                     {(() => {
                         const listing = LISTINGS.find(l => l.id === selectedListingId);
                         if (!listing) return null;
                         return (
                             <div 
                                role="button"
                                tabIndex={0}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden p-3 border border-gray-100 relative active:scale-[0.99] transition-transform outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/detail/${listing.id}`);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        navigate(`/detail/${listing.id}`);
                                    }
                                }}
                                aria-label={`进入 ${listing.title} 详情页`}
                             >
                                 <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedListingId(null);
                                    }}
                                    className="absolute top-2 right-2 bg-gray-100 text-gray-500 rounded-full p-1 z-10 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    aria-label="关闭详情"
                                 >
                                     <X size={14} />
                                 </button>
                                 
                                 <div className="flex gap-3">
                                     <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 relative">
                                         <img src={listing.image} className="w-full h-full object-cover" alt="" aria-hidden="true" />
                                         {listing.tags.includes('拎包入住') && (
                                             <div className="absolute top-1 left-1 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm font-bold">
                                                 拎包入住
                                             </div>
                                         )}
                                     </div>
                                     <div className="flex flex-col justify-between py-1 flex-1">
                                         <div>
                                             <h3 className="font-bold text-gray-900 text-sm line-clamp-1 mr-6">{listing.title}</h3>
                                             <div className="flex items-center text-xs text-gray-500 mt-1">
                                                <span className="truncate">{listing.distanceToSchool}</span>
                                             </div>
                                             <div className="flex gap-1 mt-2">
                                                <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                                                    {listing.type}
                                                </span>
                                             </div>
                                         </div>
                                         <div className="flex items-baseline justify-between mt-1">
                                            <div className="flex items-baseline text-primary font-bold">
                                                <span className="text-xs">{listing.currency}</span>
                                                <span className="text-lg">{listing.price}</span>
                                                <span className="text-[10px] text-gray-400 font-normal ml-1">/月</span>
                                            </div>
                                            <span className="text-[10px] text-gray-400">详情 &gt;</span>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         );
                     })()}
                 </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
