
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Heart, Share2, CheckCircle, Info, ShieldCheck, Map as MapIcon, Video, PlayCircle, Shield, Lock, UserCheck, Clock, Footprints, Train, MessageCircle, Box, X, Check, AlertCircle, HelpCircle, ChevronRight, Key } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { LISTINGS } from '../mockData';
import ConsultationModal from '../components/ConsultationModal';

const DetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const listing = LISTINGS.find(l => l.id === id);
  
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const [mediaMode, setMediaMode] = useState<'image' | 'video' | 'vr'>('image');

  if (!listing) return <div className="pt-20 text-center">房源不存在</div>;

  // Mock Data for Price Comparison Chart
  const comparisonData = useMemo(() => {
     // Competitor base rent is typically lower, but they have hidden costs
     const competitorBaseRent = Math.round(listing.price * 0.85); 
     
     const costs = [
        { name: '基础租金 (Base Rent)', youzi: listing.price, competitor: competitorBaseRent },
        { name: '水电网 (Utilities)', youzi: 0, competitor: 150 },
        { name: '家具租赁 (Furniture)', youzi: 0, competitor: 120 },
        { name: '服务费 (Service Fee)', youzi: 0, competitor: 80 },
     ];
     return costs;
  }, [listing]);

  const competitorTotal = comparisonData.reduce((acc, curr) => acc + curr.competitor, 0);

  const isSoldOut = listing.status === 'sold_out';

  // Chart Data with Breakdown Details for Tooltip
  const chartData = [
    { 
        name: '竞品平台', 
        val: competitorTotal, 
        details: comparisonData.map(item => ({ 
            label: item.name, 
            amount: item.competitor,
            isFree: false 
        })).filter(i => i.amount > 0)
    },
    { 
        name: '柚子找房', 
        val: listing.price, 
        details: comparisonData.map(item => ({
            label: item.name,
            amount: item.youzi,
            isFree: item.youzi === 0 && item.name !== '基础租金 (Base Rent)' // Mark utilities/furniture as free
        }))
    },
  ];

  // Enhanced Custom Tooltip Component
  const CustomTooltip = ({ active, payload }: any) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload;
        const isYouzi = data.name === '柚子找房';
        const priceDiff = data.val - listing.price;
        
        return (
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 text-xs z-50 min-w-[200px] animate-in fade-in zoom-in-95 duration-200">
            <div className={`flex items-center mb-3 pb-2 border-b border-gray-100 ${isYouzi ? 'text-primary' : 'text-gray-600'}`}>
                <div className={`w-2.5 h-2.5 rounded-full mr-2 ${isYouzi ? 'bg-primary' : 'bg-gray-400'}`}></div>
                <span className="font-bold text-sm">{data.name} 费用构成</span>
                {isYouzi && <span className="ml-auto text-[10px] bg-orange-100 text-primary px-2 py-0.5 rounded-full font-bold">推荐</span>}
            </div>
            
            <div className="space-y-2.5">
              {data.details.map((item: any, index: number) => (
                <div key={index} className="flex justify-between gap-4 items-center">
                   <span className="text-gray-500 truncate">{item.label.split(' (')[0]}</span>
                   <div className="flex items-center">
                       {item.isFree ? (
                           <span className="font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded text-[10px] flex items-center">
                               <CheckCircle size={8} className="mr-1"/>全包 FREE
                           </span>
                       ) : (
                           <span className="font-medium text-gray-700 font-mono">${item.amount.toLocaleString()}</span>
                       )}
                   </div>
                </div>
              ))}
              
              <div className="border-t border-dashed border-gray-200 pt-3 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">每月总计</span>
                    <span className={`font-mono text-base font-bold ${isYouzi ? 'text-primary' : 'text-gray-900'}`}>
                        ${data.val.toLocaleString()}
                    </span>
                  </div>
                  {!isYouzi && priceDiff > 0 && (
                      <div className="text-right mt-1">
                          <span className="text-[10px] text-red-500 bg-red-50 px-1.5 py-0.5 rounded font-medium">
                              比柚子贵 ${priceDiff} /月
                          </span>
                      </div>
                  )}
              </div>
            </div>
          </div>
        );
      }
      return null;
  };

  const handleBack = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const getSecurityStyle = (feat: string) => {
    const text = feat.toLowerCase();
    
    // Guard / Security
    if (text.includes('安保') || text.includes('guard') || text.includes('doorman') || text.includes('巡逻') || text.includes('security')) {
        return { icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' };
    }
    // CCTV / Monitoring
    if (text.includes('监控') || text.includes('cctv') || text.includes('video') || text.includes('cam') || text.includes('可视')) {
        return { icon: Video, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' };
    }
    // Key / Access / Lock
    if (text.includes('门禁') || text.includes('key') || text.includes('lock') || text.includes('card') || text.includes('access') || text.includes('梯控') || text.includes('识别')) {
        return { icon: Key, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' };
    }
    // Gated / Fence
    if (text.includes('封闭') || text.includes('gated') || text.includes('fence') || text.includes('gate')) {
        return { icon: Lock, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' };
    }
    
    return { icon: Shield, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-100' };
  };

  return (
    <div className="pb-24 min-h-screen bg-white">
      {/* Nav - Fixed/Sticky handling for centered layout */}
      <div className="fixed top-0 left-0 right-0 max-w-md mx-auto z-40 flex justify-between items-center px-4 py-3 pt-12 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <button 
            onClick={handleBack} 
            className="bg-white/90 p-2 rounded-full shadow pointer-events-auto backdrop-blur-md active:scale-90 transition-transform cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-3 pointer-events-auto">
           <button className="bg-white/90 p-2 rounded-full shadow backdrop-blur-md active:scale-90 transition-transform">
             <Heart size={20} />
           </button>
           <button className="bg-white/90 p-2 rounded-full shadow backdrop-blur-md active:scale-90 transition-transform">
             <Share2 size={20} />
           </button>
        </div>
      </div>

      {/* Media Section (VR, Video & Images) */}
      <div className="relative h-72 w-full bg-gray-900">
        {mediaMode === 'video' && listing.videoUrl ? (
           <video controls autoPlay className="w-full h-full object-contain">
              <source src={listing.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
           </video>
        ) : mediaMode === 'vr' && listing.vrUrl ? (
           <div className="w-full h-full relative">
               <iframe 
                  src={listing.vrUrl} 
                  className="w-full h-full border-0"
                  title="3D Tour"
                  allowFullScreen
               />
           </div>
        ) : (
            <>
                <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4">
                    {listing.videoUrl && (
                        <button 
                            onClick={() => setMediaMode('video')}
                            className="bg-black/40 rounded-full p-4 backdrop-blur-sm border border-white/30 hover:bg-black/60 transition-colors"
                        >
                            <PlayCircle size={48} className="text-white" />
                        </button>
                    )}
                    {listing.vrUrl && (
                         <button 
                            onClick={() => setMediaMode('vr')}
                            className="bg-primary/80 rounded-full p-4 backdrop-blur-sm border border-white/30 hover:bg-primary transition-colors animate-pulse"
                        >
                            <Box size={48} className="text-white" />
                            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-[10px] font-bold whitespace-nowrap bg-black/50 px-2 py-0.5 rounded">VR看房</span>
                        </button>
                    )}
                </div>

                <div className="absolute bottom-4 right-4 flex gap-2">
                   <div className="bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md flex items-center">
                       共 {listing.images.length} 张照片
                   </div>
                </div>
            </>
        )}
        
        {/* Close Media Mode Button */}
        {mediaMode !== 'image' && (
            <button 
                onClick={() => setMediaMode('image')}
                className="absolute top-20 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-md z-10"
            >
                <span className="text-xs font-bold">关闭预览</span>
            </button>
        )}
      </div>

      {/* Main Content */}
      <div className="px-5 py-6 -mt-6 bg-white rounded-t-3xl relative z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        
        {/* Header */}
        <h1 className="text-xl font-bold text-gray-900 leading-tight">{listing.title}</h1>
        <div className="flex items-center justify-between mt-2">
            <div className="flex items-center text-gray-500 text-sm">
                <MapIcon size={14} className="mr-1 text-primary" />
                <span className="mr-3">{listing.distanceToSchool}</span>
            </div>
            {/* Prominent VR Button in details section */}
            {listing.vrUrl && (
                 <button 
                    onClick={() => setMediaMode('vr')}
                    className="flex items-center gap-1 text-xs font-bold text-primary bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100 active:bg-orange-100"
                >
                    <Box size={14} />
                    VR 看房
                </button>
            )}
        </div>

        {/* Inventory & Status Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
            {listing.status === 'low_stock' && (
                <div className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-medium border border-red-100 flex items-center">
                    <Clock size={12} className="mr-1"/> 仅剩 {listing.stockCount} 间
                </div>
            )}
             {listing.leaseTerms.map((term, i) => (
                <div key={i} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium border border-blue-100">
                    {term}
                </div>
            ))}
        </div>

        {/* Price Section */}
        <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] px-2 py-1 rounded-bl-lg font-bold">
                拎包入住 · 一价全包
            </div>
            <div className="flex justify-between items-end">
                <div>
                    <div className="flex items-baseline text-primary font-bold">
                        <span className="text-lg">{listing.currency}</span>
                        <span className="text-3xl">{listing.price}</span>
                        <span className="text-sm text-gray-500 font-medium ml-1">/月</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        含: 房租 + 水电网 + 全套家具 + 服务费
                    </div>
                </div>
            </div>
            
            {/* Price Breakdown Toggle */}
            <div 
                onClick={() => setShowPriceDetails(!showPriceDetails)}
                className="mt-3 pt-3 border-t border-orange-200 flex justify-between items-center cursor-pointer"
            >
                <div className="flex items-center text-xs text-gray-600">
                    <Info size={14} className="mr-1 text-primary" />
                    查看价格包含明细
                </div>
                <span className="text-primary text-xs">{showPriceDetails ? '收起' : '展开'}</span>
            </div>

             {/* Detailed Breakdown */}
             {showPriceDetails && (
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-600 animate-in slide-in-from-top-1">
                    <div className="flex items-center"><CheckCircle size={12} className="text-primary mr-1"/> 100% 真实房源</div>
                    <div className="flex items-center"><CheckCircle size={12} className="text-primary mr-1"/> 水费/电费/燃气全免</div>
                    <div className="flex items-center"><CheckCircle size={12} className="text-primary mr-1"/> 1000Mbps 高速WiFi</div>
                    <div className="flex items-center"><CheckCircle size={12} className="text-primary mr-1"/> 品牌家具家电</div>
                </div>
             )}
        </div>

        {/* Flexible Cancellation Policy Banner */}
        <div 
            onClick={() => setShowPolicyModal(true)}
            className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3 flex items-center cursor-pointer active:scale-[0.99] transition-transform"
        >
            <div className="bg-white p-2 rounded-full mr-3 shadow-sm border border-green-100 flex-shrink-0">
                <ShieldCheck size={20} className="text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                     <h3 className="font-bold text-green-900 text-sm">无忧退订 (Flexible Cancellation)</h3>
                     <ChevronRight size={16} className="text-green-700 opacity-50" />
                </div>
                <p className="text-[10px] text-green-800 leading-tight truncate">
                    不可抗力（签证/学校原因）导致无法入学，可申请<span className="font-bold">全额退款</span>。
                </p>
            </div>
        </div>

        {/* Service Promise */}
        <div className="mt-6">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">柚子官方保障</h3>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {listing.s1Benefits.map((benefit, idx) => (
                    <div key={idx} className="flex-shrink-0 bg-gray-50 px-3 py-2 rounded-lg flex items-center border border-gray-100">
                        <ShieldCheck size={14} className="text-green-600 mr-2" />
                        <span className="text-xs font-medium text-gray-700">{benefit}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Security Section */}
        <div className="mt-8 border-t border-gray-100 pt-6">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">社区安全 (Security)</h3>
                <div className="flex items-center text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                    <Shield size={12} className="mr-1 fill-current"/> 安全指数 {listing.safetyRating}.0/5.0
                </div>
             </div>
             <div className="grid grid-cols-2 gap-3">
                 {listing.securityFeatures.map((feat, i) => {
                     const style = getSecurityStyle(feat);
                     const Icon = style.icon;
                     return (
                         <div key={i} className={`flex items-center p-3 rounded-xl border ${style.bg} ${style.border}`}>
                             <div className="bg-white p-2 rounded-full shadow-sm mr-3 flex-shrink-0">
                                <Icon size={18} className={style.color} />
                             </div>
                             <span className="text-xs font-medium text-gray-700">{feat}</span>
                         </div>
                     );
                 })}
             </div>
        </div>

        {/* Commute & Location */}
        <div className="mt-8 border-t border-gray-100 pt-6">
            <h3 className="font-bold text-gray-900 mb-3">通勤与周边</h3>
            {/* Mock Map */}
            <div className="w-full h-40 bg-gray-200 rounded-xl overflow-hidden relative mb-4">
                <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-118.2851,34.0224,14,0/600x300?access_token=mock')] bg-cover opacity-80"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                    <MapIcon size={20} />
                </div>
            </div>
            <div className="space-y-3">
                {listing.commuteTimes.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm border-b border-gray-50 last:border-0 pb-2 last:pb-0">
                        <div className="flex items-center text-gray-700">
                             {item.type === 'walk' ? <Footprints size={16} className="mr-3 text-gray-400"/> : <Train size={16} className="mr-3 text-gray-400"/>}
                             <span>{item.label}</span>
                        </div>
                        <span className="font-bold text-gray-900">{item.duration}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Price Comparison Chart */}
        <div className="mt-8 border-t border-gray-100 pt-6">
            <div className="flex justify-between items-end mb-1">
               <h3 className="font-bold text-gray-900">价格对比</h3>
               <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">悬停柱状图查看明细</span>
            </div>
            <p className="text-xs text-gray-500 mb-4">柚子全包价 vs 市场裸租价+隐形成本</p>
            
            <div className="h-64 w-full bg-gray-50 rounded-xl p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        layout="vertical"
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="#e5e7eb"/>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={70} tick={{fontSize: 12, fill: '#4b5563'}} axisLine={false} tickLine={false} />
                        <Tooltip 
                            cursor={{fill: 'rgba(0,0,0,0.03)'}}
                            content={<CustomTooltip />}
                            wrapperStyle={{ outline: 'none' }}
                            offset={20}
                        />
                        <Bar 
                            dataKey="val" 
                            barSize={24} 
                            radius={[0, 6, 6, 0]}
                            activeBar={{ fill: '#F38D27', opacity: 0.9, stroke: '#F38D27', strokeWidth: 2 }}
                            className="cursor-pointer"
                        >
                           {
                             chartData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.name === '柚子找房' ? '#FF9F43' : '#9CA3AF'} />
                             ))
                           }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-end text-xs mt-2 px-2 gap-4">
                   <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-400 mr-1.5"></div>
                      <span className="text-gray-500">竞品预估: ${competitorTotal.toFixed(0)}</span>
                   </div>
                   <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-1.5"></div>
                      <span className="font-bold text-primary">柚子全包: ${listing.price}</span>
                   </div>
                </div>
            </div>
        </div>

        {/* Description */}
        <div className="mt-8 mb-4 border-t border-gray-100 pt-6">
            <h3 className="font-bold text-gray-900 mb-2">房源介绍</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
                {listing.description}
            </p>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 px-4 pb-safe z-50 max-w-md mx-auto flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
         <div className="flex flex-col mr-4">
             <span className="text-[10px] text-gray-400">最终全包价</span>
             <span className="text-primary font-bold text-xl leading-none">{listing.currency}{listing.price}</span>
         </div>
         <div className="flex gap-2 flex-1">
             <button 
                onClick={() => setShowConsultModal(true)}
                className="flex-1 bg-white text-gray-800 border border-gray-200 font-bold py-3 rounded-xl shadow-sm active:bg-gray-50 transition-all text-xs flex items-center justify-center"
             >
                 <MessageCircle size={16} className="mr-1" /> 咨询管家
             </button>
             <button 
                onClick={() => isSoldOut ? setShowConsultModal(true) : navigate(`/booking/${listing.id}`)}
                className={`flex-[1.5] text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center ${isSoldOut ? 'bg-gray-800' : 'bg-primary shadow-orange-200'}`}
             >
                 {isSoldOut ? '加入候补 (Waitlist)' : '立即预订 (Book Now)'}
             </button>
         </div>
      </div>

      <ConsultationModal 
        isOpen={showConsultModal} 
        onClose={() => setShowConsultModal(false)} 
        listingTitle={listing.title}
      />

      {/* Policy Details Modal */}
      {showPolicyModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-900">无忧退订政策详情</h3>
                    <button onClick={() => setShowPolicyModal(false)}><X size={20} className="text-gray-400"/></button>
                </div>
                <div className="p-5 text-sm text-gray-600 space-y-4 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-2">
                        <h4 className="font-bold text-gray-900 flex items-center"><Check size={14} className="text-green-500 mr-1"/> 适用情况 (Covered)</h4>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                            <li>签证申请被拒 (Visa Denial)</li>
                            <li>学校录取被撤回 (Admission Withdrawn)</li>
                            <li>学校官方延期开学 (Official Deferral)</li>
                        </ul>
                    </div>
                     <div className="space-y-2">
                        <h4 className="font-bold text-gray-900 flex items-center"><AlertCircle size={14} className="text-orange-500 mr-1"/> 申请流程 (Process)</h4>
                        <p className="text-xs">
                            请在知晓结果后的 72 小时内，联系平台专属退款专员，并提交官方证明文件。审核通过后，押金及租金将在 7-14 个工作日内原路退回。
                        </p>
                    </div>
                     <div className="bg-gray-50 p-3 rounded-lg mt-2">
                        <p className="text-xs font-bold text-gray-900 mb-1">退款专员联系方式</p>
                        <p className="text-xs text-primary">Email: refund@youzihouse.com</p>
                        <p className="text-xs text-gray-500">WeChat: Youzi_Refund (24h)</p>
                        <button className="mt-2 w-full bg-white border border-gray-200 text-primary text-xs font-bold py-2 rounded-lg flex items-center justify-center">
                            <HelpCircle size={12} className="mr-1" /> 联系专员
                        </button>
                    </div>
                </div>
                <div className="p-4 border-t">
                    <button onClick={() => setShowPolicyModal(false)} className="w-full bg-primary text-white font-bold py-3 rounded-xl">
                        我已了解
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
