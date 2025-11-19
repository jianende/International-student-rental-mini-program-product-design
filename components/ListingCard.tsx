
import React from 'react';
import { Listing } from '../types';
import { MapPin, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  listing: Listing;
  compact?: boolean;
}

const ListingCard: React.FC<Props> = ({ listing, compact }) => {
  const navigate = useNavigate();

  // Status Badge Logic
  const getStatusBadge = () => {
    if (listing.status === 'sold_out') {
      return <span className="bg-gray-500 text-white text-[10px] px-2 py-1 rounded-md font-bold shadow-sm">已售罄</span>;
    }
    if (listing.status === 'low_stock') {
      return <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-md font-bold shadow-sm flex items-center"><AlertCircle size={10} className="mr-1"/>仅剩{listing.stockCount}间</span>;
    }
    return listing.tags.includes('拎包入住') ? (
       <span className="bg-primary text-white text-[10px] px-2 py-1 rounded-md font-bold shadow-sm">拎包入住</span>
    ) : null;
  };

  return (
    <div 
      onClick={() => navigate(`/detail/${listing.id}`)}
      className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 active:scale-95 transition-transform duration-100 mb-4 cursor-pointer relative`}
    >
      <div className="relative aspect-video">
        <img src={listing.image} alt={listing.title} className={`w-full h-full object-cover ${listing.status === 'sold_out' ? 'grayscale' : ''}`} />
        
        {/* Top Left Badge */}
        <div className="absolute top-2 left-2 flex gap-1">
            {getStatusBadge()}
        </div>

        {/* Type Badge */}
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
            {listing.type}
        </div>
      </div>
      
      <div className="p-3">
        <h3 className={`font-bold text-gray-900 text-base truncate ${listing.status === 'sold_out' ? 'text-gray-400' : ''}`}>{listing.title}</h3>
        
        <div className="flex items-center text-gray-500 text-xs mt-1">
          <MapPin size={12} className="mr-1" />
          <span className="truncate">{listing.distanceToSchool}</span>
        </div>

        {!compact && (
            <div className="flex flex-wrap gap-1 mt-2">
                {listing.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded border border-orange-100">
                        {tag}
                    </span>
                ))}
            </div>
        )}

        <div className="mt-3 flex items-end justify-between">
            <div className="flex flex-col">
                <div className={`flex items-baseline font-bold ${listing.status === 'sold_out' ? 'text-gray-400' : 'text-primary'}`}>
                    <span className="text-xs">{listing.currency}</span>
                    <span className="text-lg">{listing.price}</span>
                    <span className="text-xs text-gray-400 font-normal ml-1">/月</span>
                </div>
                {!compact && (
                    <span className="text-[10px] text-gray-400 transform -mt-0.5">含税费/服务费/家具</span>
                )}
            </div>
            {!compact && <span className="text-[10px] text-gray-400">{listing.sqft} sqft</span>}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
