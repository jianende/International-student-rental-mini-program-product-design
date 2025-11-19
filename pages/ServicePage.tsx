
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Wrench, Plus, Camera, Clock, CheckCircle, AlertCircle, DollarSign, FileText, ClipboardList, Calendar, MapPin, Users, PartyPopper } from 'lucide-react';

interface RepairRequest {
  id: string;
  type: string;
  desc: string;
  status: 'submitted' | 'dispatched' | 'processing' | 'completed';
  date: string;
  image?: string;
}

interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  type: 'Social' | 'Career' | 'Wellness';
  status: 'upcoming' | 'ended';
  participants: number;
}

const MOCK_REPAIRS: RepairRequest[] = [
  { id: 'R-2025-001', type: '水电设施', desc: '洗手间水龙头漏水，且热水出水很慢。', status: 'processing', date: '2025-11-10', image: 'https://images.unsplash.com/photo-1633700423016-7d34052ce806?auto=format&fit=crop&w=400&q=80' },
  { id: 'R-2025-002', type: '家具家电', desc: '微波炉无法加热', status: 'completed', date: '2025-10-05' },
];

const MOCK_EVENTS: CommunityEvent[] = [
  {
    id: '1',
    title: '公寓天台烧烤派对 (Rooftop BBQ)',
    date: '11月25日 (周六)',
    time: '18:00 - 21:00',
    location: 'Sky Deck (R层)',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    type: 'Social',
    status: 'upcoming',
    participants: 32
  },
  {
    id: '2',
    title: '秋招简历修改 Workshop',
    date: '11月10日 (周五)',
    time: '14:00 - 16:00',
    location: 'Study Room A',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
    type: 'Career',
    status: 'ended',
    participants: 45
  }
];

const ServicePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Determine initial tab safely
  const tabParam = queryParams.get('tab');
  const initialTab = (['repair', 'deposit', 'events'].includes(tabParam || '') ? tabParam : 'repair') as 'repair' | 'deposit' | 'events';
  
  const [activeTab, setActiveTab] = useState<'repair' | 'deposit' | 'events'>(initialTab);
  const [repairs, setRepairs] = useState<RepairRequest[]>(MOCK_REPAIRS);
  const [showNewRepair, setShowNewRepair] = useState(false);

  // New Repair Form State
  const [newRepair, setNewRepair] = useState({ type: '水电设施', desc: '' });

  const handleSubmitRepair = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: RepairRequest = {
      id: `R-2025-${Math.floor(Math.random() * 1000)}`,
      type: newRepair.type,
      desc: newRepair.desc,
      status: 'submitted',
      date: new Date().toISOString().split('T')[0]
    };
    setRepairs([newReq, ...repairs]);
    setShowNewRepair(false);
    setNewRepair({ type: '水电设施', desc: '' });
  };

  const renderRepairStatus = (status: string) => {
    switch(status) {
        case 'submitted': return <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">已提交</span>;
        case 'dispatched': return <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">已派单</span>;
        case 'processing': return <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-bold animate-pulse">维修中</span>;
        case 'completed': return <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">已完成</span>;
        default: return null;
    }
  };

  const RepairView = () => (
    <div className="p-4 pb-20 animate-in slide-in-from-right-4 duration-300">
        {/* Active Repairs List */}
        <div className="space-y-4">
            {repairs.map(req => (
                <div key={req.id} className="bg-white rounded-xl p-4 border shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900">{req.type}</span>
                                {renderRepairStatus(req.status)}
                            </div>
                            <span className="text-[10px] text-gray-400">单号: {req.id} · {req.date}</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 bg-gray-50 p-2 rounded">{req.desc}</p>
                    
                    {/* Progress Bar for Active */}
                    {req.status !== 'completed' && (
                         <div className="mt-3">
                            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                                <span className={req.status === 'submitted' ? 'text-primary font-bold' : ''}>提交</span>
                                <span className={req.status === 'dispatched' ? 'text-primary font-bold' : ''}>派单</span>
                                <span className={req.status === 'processing' ? 'text-primary font-bold' : ''}>维修</span>
                                <span>评价</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-primary transition-all duration-500"
                                    style={{ 
                                        width: req.status === 'submitted' ? '25%' : 
                                               req.status === 'dispatched' ? '50%' : 
                                               req.status === 'processing' ? '75%' : '100%' 
                                    }}
                                ></div>
                            </div>
                            <p className="text-[10px] text-primary mt-2 flex items-center">
                                <Clock size={10} className="mr-1" /> 预计 24 小时内响应
                            </p>
                         </div>
                    )}
                </div>
            ))}
        </div>

        {/* FAB */}
        <button 
            onClick={() => setShowNewRepair(true)}
            className="fixed bottom-6 right-6 bg-gray-900 text-white p-4 rounded-full shadow-xl active:scale-90 transition-transform z-30"
        >
            <Plus size={24} />
        </button>

        {/* New Repair Modal */}
        {showNewRepair && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
                <div className="bg-white w-full sm:max-w-sm sm:rounded-2xl rounded-t-2xl p-5 animate-in slide-in-from-bottom duration-300">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">新增报修</h3>
                        <button onClick={() => setShowNewRepair(false)} className="text-gray-400">取消</button>
                    </div>
                    <form onSubmit={handleSubmitRepair} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">故障类型</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['水电设施', '家具家电', '门窗锁具', '网络问题', '公共区域'].map(t => (
                                    <button 
                                        key={t}
                                        type="button"
                                        onClick={() => setNewRepair({...newRepair, type: t})}
                                        className={`text-xs py-2 rounded-lg border ${newRepair.type === t ? 'bg-orange-50 border-primary text-primary font-bold' : 'border-gray-200 text-gray-600'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">问题描述</label>
                            <textarea 
                                required
                                className="w-full p-3 bg-gray-50 border rounded-xl text-sm h-24 outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="请详细描述故障情况..."
                                value={newRepair.desc}
                                onChange={e => setNewRepair({...newRepair, desc: e.target.value})}
                            />
                        </div>
                        <div>
                             <label className="block text-xs font-bold text-gray-700 mb-1">上传照片 (可选)</label>
                             <div className="border-2 border-dashed border-gray-300 rounded-xl h-20 flex flex-col items-center justify-center text-gray-400">
                                 <Camera size={20} />
                                 <span className="text-[10px] mt-1">点击拍照或上传</span>
                             </div>
                        </div>
                        <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-2">提交报修</button>
                    </form>
                </div>
            </div>
        )}
    </div>
  );

  const DepositView = () => {
    const steps = [
        { title: '提交退租申请', date: '2026-07-01', status: 'pending' },
        { title: '房屋检查 (Inspection)', date: '2026-07-28', status: 'pending' },
        { title: '定损与确认', date: '2026-08-05', status: 'pending' },
        { title: '押金退还', date: '2026-08-15', status: 'pending' }
    ];

    return (
        <div className="p-4 pb-20 animate-in slide-in-from-right-4 duration-300">
            {/* Deposit Card */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-5 shadow-lg mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-gray-400 mb-1">当前押金 (Security Deposit)</p>
                        <h2 className="text-3xl font-bold flex items-baseline">
                            <span className="text-lg mr-1">$</span>1,850.00
                        </h2>
                    </div>
                    <div className="bg-white/10 p-2 rounded-lg">
                        <DollarSign size={24} className="text-green-400" />
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex gap-4 text-xs text-gray-300">
                     <div>
                         <span className="block opacity-50">租约到期</span>
                         <span className="font-mono">2026-07-31</span>
                     </div>
                     <div>
                         <span className="block opacity-50">退款状态</span>
                         <span className="text-green-400 font-bold">保障中</span>
                     </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl p-5 border shadow-sm mb-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    <Clock size={18} className="mr-2 text-primary" /> 
                    退租与押金进度
                </h3>
                <div className="space-y-6 relative pl-2">
                    <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-gray-100"></div>
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative flex gap-4">
                            <div className={`
                                w-3 h-3 rounded-full mt-1.5 z-10 flex-shrink-0
                                ${idx === 0 ? 'bg-primary ring-4 ring-primary/20' : 'bg-gray-300'}
                            `}></div>
                            <div>
                                <h4 className={`font-bold text-sm ${idx === 0 ? 'text-gray-900' : 'text-gray-400'}`}>{step.title}</h4>
                                <p className="text-xs text-gray-400 mt-0.5">预计: {step.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Move-out Checklist */}
            <div className="bg-white rounded-xl p-5 border shadow-sm">
                 <div className="flex justify-between items-center mb-3">
                     <h3 className="font-bold text-gray-900 flex items-center">
                        <ClipboardList size={18} className="mr-2 text-primary" />
                        退租检查标准 (Transparency)
                     </h3>
                     <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold">98% 全额退款率</span>
                 </div>
                 <div className="space-y-2">
                     {[
                        '墙面无明显污渍或人为破损',
                        '地毯已进行专业蒸汽清洗',
                        '所有个人物品已清空',
                        '钥匙/门禁卡归还齐全'
                     ].map((item, i) => (
                         <div key={i} className="flex items-start text-xs text-gray-600 bg-gray-50 p-2 rounded">
                             <CheckCircle size={14} className="mr-2 text-gray-400 mt-0.5" />
                             {item}
                         </div>
                     ))}
                 </div>
                 <button className="mt-4 w-full text-primary text-xs font-bold flex items-center justify-center py-2 border border-orange-100 rounded-lg bg-orange-50">
                     查看完整《房屋归还指南 PDF》
                 </button>
            </div>
        </div>
    );
  };

  const EventsView = () => (
      <div className="p-4 pb-20 animate-in slide-in-from-right-4 duration-300">
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6 flex items-start">
               <PartyPopper size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
               <div>
                   <h3 className="font-bold text-gray-900 text-sm">社区公告栏</h3>
                   <p className="text-xs text-gray-600 mt-1">这里发布公寓最新的官方活动，认识新邻居的好机会！每月更新 1-2 场。</p>
               </div>
          </div>

          <div className="space-y-6">
              {MOCK_EVENTS.map(event => (
                  <div key={event.id} className="bg-white rounded-2xl overflow-hidden border shadow-sm group">
                      <div className="relative h-40">
                          <img src={event.image} alt={event.title} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${event.status === 'ended' ? 'grayscale' : ''}`} />
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-800">
                              {event.type}
                          </div>
                          {event.status === 'ended' && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                  <span className="text-white font-bold border-2 border-white px-4 py-1 rounded transform -rotate-12">已结束</span>
                              </div>
                          )}
                      </div>
                      <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                              <h3 className={`font-bold text-lg ${event.status === 'ended' ? 'text-gray-500' : 'text-gray-900'}`}>{event.title}</h3>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                              <div className="flex items-center text-xs text-gray-500">
                                  <Calendar size={14} className="mr-2 w-4" />
                                  <span>{event.date} {event.time}</span>
                              </div>
                              <div className="flex items-center text-xs text-gray-500">
                                  <MapPin size={14} className="mr-2 w-4" />
                                  <span>{event.location}</span>
                              </div>
                              <div className="flex items-center text-xs text-gray-500">
                                  <Users size={14} className="mr-2 w-4" />
                                  <span>{event.participants} 人已报名</span>
                              </div>
                          </div>

                          <button 
                            disabled={event.status === 'ended'}
                            className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${
                                event.status === 'ended' 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'bg-gray-900 text-white hover:bg-primary shadow-lg active:scale-95'
                            }`}
                          >
                              {event.status === 'ended' ? '活动回顾' : '立即报名 (RSVP)'}
                          </button>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-2 shadow-sm sticky top-0 z-20">
        <div className="flex items-center mb-4">
           <button onClick={() => navigate('/me')} className="mr-3 p-1 rounded-full hover:bg-gray-100">
              <ChevronLeft size={24} />
           </button>
           <h1 className="font-bold text-xl">住户服务中心</h1>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
            <button 
                onClick={() => setActiveTab('repair')}
                className={`flex-1 pb-3 text-sm font-bold relative transition-colors ${activeTab === 'repair' ? 'text-primary' : 'text-gray-400'}`}
            >
                <span className="flex items-center justify-center gap-1"><Wrench size={16}/> 在线报修</span>
                {activeTab === 'repair' && <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-primary rounded-t-full"></div>}
            </button>
            <button 
                onClick={() => setActiveTab('deposit')}
                className={`flex-1 pb-3 text-sm font-bold relative transition-colors ${activeTab === 'deposit' ? 'text-primary' : 'text-gray-400'}`}
            >
                <span className="flex items-center justify-center gap-1"><DollarSign size={16}/> 退租 & 押金</span>
                {activeTab === 'deposit' && <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-primary rounded-t-full"></div>}
            </button>
            <button 
                onClick={() => setActiveTab('events')}
                className={`flex-1 pb-3 text-sm font-bold relative transition-colors ${activeTab === 'events' ? 'text-primary' : 'text-gray-400'}`}
            >
                <span className="flex items-center justify-center gap-1"><PartyPopper size={16}/> 社区活动</span>
                {activeTab === 'events' && <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-primary rounded-t-full"></div>}
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {activeTab === 'repair' && <RepairView />}
        {activeTab === 'deposit' && <DepositView />}
        {activeTab === 'events' && <EventsView />}
      </div>
    </div>
  );
};

export default ServicePage;
