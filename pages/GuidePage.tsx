
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LISTINGS, CITIES } from '../mockData';
import { ChevronLeft, CheckCircle, Plane, CreditCard, Smartphone, Shield, Home, Package, Truck, ExternalLink, ShoppingBag } from 'lucide-react';

// Mock Data for Shopping Items
const SHOPPING_ITEMS = [
  {
    id: 1,
    name: '留学生专属床品四件套 (Twin XL)',
    price: 89,
    originalPrice: 129,
    image: 'https://images.unsplash.com/photo-1522771753037-810ce968b816?auto=format&fit=crop&w=400&q=80',
    tags: ['校区配送', '100%全棉'],
    link: '#'
  },
  {
    id: 2,
    name: '新手厨具大礼包 (12件套)',
    price: 129,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=400&q=80',
    tags: ['电磁炉通用', '包含刀具'],
    link: '#'
  },
  {
    id: 3,
    name: '卫浴洗漱套装 (毛巾/地垫/浴帘)',
    price: 45,
    originalPrice: 59,
    image: 'https://images.unsplash.com/photo-1563293726-2687e2e59328?auto=format&fit=crop&w=400&q=80',
    tags: ['吸水速干', '防滑'],
    link: '#'
  },
  {
    id: 4,
    name: '美国 5G 电话卡 (首月无限流量)',
    price: 25,
    originalPrice: 45,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    tags: ['落地激活', '无限通话'],
    link: '#'
  },
   {
    id: 5,
    name: '宿舍滤水壶 (含2滤芯)',
    price: 35,
    originalPrice: 49,
    image: 'https://images.unsplash.com/photo-1544030288-e6e6108867f6?auto=format&fit=crop&w=400&q=80',
    tags: ['直饮水', '必备'],
    link: '#'
  },
   {
    id: 6,
    name: '多功能电饭煲 (3L)',
    price: 69,
    originalPrice: 89,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80',
    tags: ['智能预约', '不粘内胆'],
    link: '#'
  }
];

const GuidePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = LISTINGS.find(l => l.id === id);
  const city = CITIES.find(c => c.id === listing?.cityId);

  const [activeTab, setActiveTab] = useState<'checklist' | 'guide' | 'shopping'>('checklist');
  
  // Interactive Checklist State
  const [checklist, setChecklist] = useState([
    { id: 1, category: '证件准备', title: '检查 I-20 表格签字有效期', checked: false },
    { id: 2, category: '证件准备', title: '护照有效期需大于 6 个月', checked: false },
    { id: 3, category: '证件准备', title: '打印租房合同 (Lease Agreement)', checked: false },
    { id: 4, category: '资金准备', title: '准备少量美金现金 ($1000以内)', checked: false },
    { id: 5, category: '资金准备', title: '开通国内双币信用卡的境外支付功能', checked: false },
    { id: 6, category: '行李打包', title: '确认转换插头 (美标)', checked: false },
    { id: 7, category: '行前事项', title: '购买留学生保险', checked: false },
    { id: 8, category: '入住准备', title: '确认 Leasing Office 办公时间', checked: false },
  ]);

  const toggleCheck = (id: number) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const progress = Math.round((checklist.filter(i => i.checked).length / checklist.length) * 100);

  if (!listing || !city) return <div>Loading...</div>;

  const GuideCard = ({ icon: Icon, title, children }: any) => (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm mb-4">
        <div className="flex items-center mb-3">
            <div className="bg-orange-50 p-2 rounded-lg mr-3">
                <Icon size={20} className="text-primary" />
            </div>
            <h3 className="font-bold text-gray-900">{title}</h3>
        </div>
        <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
            {children}
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header Image */}
      <div className="relative h-48 w-full">
        <img src={city.image} alt={city.name} className="w-full h-full object-cover brightness-75" />
        <div className="absolute top-0 left-0 right-0 p-4 pt-12 flex items-center text-white">
            <button onClick={() => navigate('/')} className="bg-black/30 p-2 rounded-full backdrop-blur-md mr-3">
                <ChevronLeft size={20} />
            </button>
            <div>
                <h1 className="font-bold text-xl text-white">行前指南 & 城市生活</h1>
                <p className="text-xs opacity-90">Destination: {city.name}</p>
            </div>
        </div>
        
        {/* Tabs */}
        <div className="absolute -bottom-6 left-4 right-4 bg-white rounded-xl shadow-lg p-1 flex z-10">
             <button 
                onClick={() => setActiveTab('checklist')}
                className={`flex-1 py-3 rounded-lg text-xs font-bold transition-colors ${activeTab === 'checklist' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
             >
                 行前清单
             </button>
             <button 
                onClick={() => setActiveTab('guide')}
                 className={`flex-1 py-3 rounded-lg text-xs font-bold transition-colors ${activeTab === 'guide' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
             >
                 抵达指南
             </button>
             <button 
                onClick={() => setActiveTab('shopping')}
                 className={`flex-1 py-3 rounded-lg text-xs font-bold transition-colors ${activeTab === 'shopping' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
             >
                 生活好物
             </button>
        </div>
      </div>

      <div className="mt-10 px-4">
          {activeTab === 'checklist' ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  {/* Progress Bar */}
                  <div className="bg-white p-4 rounded-xl border shadow-sm mb-6">
                      <div className="flex justify-between items-end mb-2">
                          <span className="text-sm font-bold text-gray-900">准备进度</span>
                          <span className="text-2xl font-bold text-primary">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">完成所有项以确保顺利入境入住。</p>
                  </div>

                  {/* List Groups */}
                  <div className="space-y-3">
                      {checklist.map(item => (
                          <div 
                            key={item.id} 
                            onClick={() => toggleCheck(item.id)}
                            className={`p-4 rounded-xl border flex items-center cursor-pointer transition-all active:scale-[0.99] ${item.checked ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100'}`}
                          >
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${item.checked ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}>
                                  {item.checked && <CheckCircle size={14} />}
                              </div>
                              <div>
                                  <p className={`text-sm font-medium ${item.checked ? 'text-green-800 line-through' : 'text-gray-800'}`}>{item.title}</p>
                                  <span className="text-[10px] text-gray-400">{item.category}</span>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          ) : activeTab === 'guide' ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="mb-4 p-3 bg-blue-50 text-blue-800 text-xs rounded-lg border border-blue-100">
                      📍 以下信息为 <b>{city.name}</b> 地区专属指南
                  </div>

                  <GuideCard icon={Home} title="办理入住 (Check-in)">
                      <p>1. <b>办公时间：</b>通常为周一至周五 9:00-18:00。若在非工作时间抵达，请务必提前3天发邮件给公寓确认 Key Pickup 流程。</p>
                      <p>2. <b>所需文件：</b>护照原件、I-20、租房合同打印件、租客保险证明 (Renters Insurance)。</p>
                      <p>3. <b>房屋检查：</b>入住时领取 Inventory List，在48小时内仔细检查房间设施，如有损坏拍照并发送给管理处备案，以免退房时被扣押金。</p>
                  </GuideCard>

                  <GuideCard icon={Plane} title="机场交通 (Arrival)">
                      <p>1. <b>网约车：</b>推荐下载 Uber 或 Lyft。LAX/JFK 机场有专门的 "Ride App Pickup" 区域，请跟随指示牌前往。</p>
                      <p>2. <b>接机服务：</b>柚子找房提供新生优惠接机，可提前在“我的-服务中心”预约。</p>
                      <p>3. <b>地址填写：</b>确保护照上的地址与公寓 Lease 上的地址一致。</p>
                  </GuideCard>

                  <GuideCard icon={CreditCard} title="银行开户 (Banking)">
                      <p>推荐银行：<b>Chase (大通银行)</b> 或 <b>Bank of America</b>。</p>
                      <p>所需材料：护照、I-20、学生证 (Student ID)、租房合同 (作为地址证明)、起存现金 (建议$100)。</p>
                      <p className="text-xs text-gray-500 mt-1">*大部分银行需要提前在官网预约 Appointment。</p>
                  </GuideCard>

                  <GuideCard icon={Smartphone} title="手机通讯 (Sim Card)">
                      <p>1. <b>实体卡：</b>T-Mobile, AT&T, Verizon 是三大运营商。推荐 Mint Mobile (性价比较高)。</p>
                      <p>2. <b>eSIM：</b>如果手机支持 eSIM，可在国内提前购买美国预付费套餐，落地即用。</p>
                  </GuideCard>

                  <GuideCard icon={Shield} title="安全须知 (Safety)">
                      <p>1. <b>紧急电话：</b>911 (报警/急救/火警)。</p>
                      <p>2. <b>校园安全：</b>下载学校的 Safety App (如 USC 的 LiveSafe)，夜间在校园周边可免费呼叫 Campus Cruiser 护送。</p>
                  </GuideCard>
              </div>
          ) : (
              // SHOPPING CONTENT
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-4 mb-6 shadow-lg">
                      <div className="flex items-start justify-between">
                          <div>
                              <h3 className="font-bold text-lg mb-1">新生落地生活包</h3>
                              <p className="text-xs text-white/90 mb-2">一站式备齐，公寓直送，拎包入住</p>
                              <div className="flex gap-2 mt-2">
                                  <span className="bg-white/20 text-[10px] px-2 py-1 rounded flex items-center backdrop-blur-sm"><Truck size={10} className="mr-1"/> 免费配送</span>
                                  <span className="bg-white/20 text-[10px] px-2 py-1 rounded flex items-center backdrop-blur-sm"><Shield size={10} className="mr-1"/> 严选品质</span>
                              </div>
                          </div>
                          <Package size={40} className="text-white/80" />
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pb-8">
                      {SHOPPING_ITEMS.map(item => (
                          <div key={item.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                              <div className="aspect-square relative bg-gray-100">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                  <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
                                      <ShoppingBag size={14} className="text-gray-700" />
                                  </div>
                              </div>
                              <div className="p-3 flex flex-col flex-1">
                                  <h4 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1">{item.name}</h4>
                                  <div className="flex flex-wrap gap-1 mb-2">
                                      {item.tags.map(t => (
                                          <span key={t} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{t}</span>
                                      ))}
                                  </div>
                                  <div className="mt-auto flex items-end justify-between">
                                      <div>
                                          <span className="text-primary font-bold text-base">${item.price}</span>
                                          <span className="text-xs text-gray-400 line-through ml-1">${item.originalPrice}</span>
                                      </div>
                                      <a 
                                        href={item.link} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="bg-gray-900 text-white p-1.5 rounded-lg hover:bg-primary transition-colors active:scale-95"
                                        title="去购买"
                                      >
                                          <ExternalLink size={14} />
                                      </a>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
                  
                  <div className="mt-2 text-center pb-6">
                      <p className="text-xs text-gray-400">合作供应商提供物流与售后支持 · 柚子严选</p>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};

export default GuidePage;
