
import React from 'react';
import TabBar from '../components/TabBar';
import { Clock, MessageCircle, Settings, ChevronRight, Shield, LogOut, Wrench, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Profile */}
      <div className="bg-white px-6 pt-16 pb-8 shadow-sm">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
             <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=80" alt="User" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">微信用户</h2>
            <p className="text-xs text-gray-400 mt-1">ID: wx_882319</p>
            <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded bg-orange-100 text-primary text-[10px] font-bold">
                <Shield size={10} className="mr-1" /> 这里的住户 (Lorenzo)
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex bg-white mt-3 py-4 justify-around text-center">
         <div>
            <div className="text-lg font-bold text-gray-800">12</div>
            <div className="text-xs text-gray-500">浏览足迹</div>
         </div>
         <div>
            <div className="text-lg font-bold text-gray-800">2</div>
            <div className="text-xs text-gray-500">我的咨询</div>
         </div>
         <div>
            <div className="text-lg font-bold text-gray-800">1</div>
            <div className="text-xs text-gray-500">当前租约</div>
         </div>
      </div>

      {/* Service Center Shortcut */}
      <div className="mt-3 bg-white px-4 py-2">
         <h3 className="text-sm font-bold text-gray-900 py-2">住户服务中心</h3>
         <div className="grid grid-cols-2 gap-3 mt-1 mb-2">
             <div 
                onClick={() => navigate('/service?tab=repair')}
                className="bg-orange-50 p-3 rounded-xl flex items-center cursor-pointer active:scale-95 transition-transform"
             >
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm mr-3">
                     <Wrench size={20} />
                 </div>
                 <div>
                     <div className="text-sm font-bold text-gray-800">在线报修</div>
                     <div className="text-[10px] text-gray-500">实时进度追踪</div>
                 </div>
             </div>
             <div 
                onClick={() => navigate('/service?tab=deposit')}
                className="bg-blue-50 p-3 rounded-xl flex items-center cursor-pointer active:scale-95 transition-transform"
             >
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm mr-3">
                     <Wallet size={20} />
                 </div>
                 <div>
                     <div className="text-sm font-bold text-gray-800">退租/押金</div>
                     <div className="text-[10px] text-gray-500">流程透明化</div>
                 </div>
             </div>
         </div>
      </div>

      {/* Menu List */}
      <div className="mt-3 bg-white px-4">
         <MenuItem icon={Clock} label="浏览历史" />
         <MenuItem icon={MessageCircle} label="我的咨询" badge="1" />
         <MenuItem icon={Shield} label="关于柚子找房" />
         <MenuItem icon={Settings} label="设置" border={false} />
      </div>

      <div className="mt-6 mx-4">
         <button className="w-full py-3 bg-white text-red-500 rounded-lg font-medium shadow-sm flex items-center justify-center">
            <LogOut size={18} className="mr-2" /> 退出登录
         </button>
      </div>

      <div className="mt-8 text-center pb-4">
        <p className="text-xs text-gray-400">Youzihouse v1.4.0</p>
      </div>

      <TabBar />
    </div>
  );
};

const MenuItem: React.FC<{ icon: any, label: string, badge?: string, border?: boolean }> = ({ icon: Icon, label, badge, border = true }) => (
  <div className={`flex items-center justify-between py-4 cursor-pointer ${border ? 'border-b border-gray-100' : ''}`}>
    <div className="flex items-center text-gray-700">
       <Icon size={20} className="mr-3 text-gray-500" />
       <span className="text-sm">{label}</span>
    </div>
    <div className="flex items-center">
       {badge && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full mr-2">{badge}</span>}
       <ChevronRight size={16} className="text-gray-300" />
    </div>
  </div>
);

export default MePage;
