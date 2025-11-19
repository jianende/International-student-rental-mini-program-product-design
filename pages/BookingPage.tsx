import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Check, CreditCard, ShieldCheck, UploadCloud, FileText, Lock, HelpCircle, X, AlertCircle, Plane, Edit2, User, CheckCircle } from 'lucide-react';
import { LISTINGS } from '../mockData';
import ContractViewer from '../components/ContractViewer';

const BookingPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const listing = LISTINGS.find(l => l.id === id);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    wechat: ''
  });
  const [signature, setSignature] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('WeChat Pay');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-scroll to active step
  useEffect(() => {
      if (scrollRef.current) {
         // basic smooth scroll if needed, but default behavior usually fine
      }
  }, [currentStep]);

  if (!listing) return <div>房源不存在</div>;

  const handleBack = () => {
      if (location.key !== 'default') {
          navigate(-1);
      } else {
          navigate(`/detail/${id}`);
      }
  };

  const handleSubmitPayment = () => {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep(4);
      }, 1500);
  };

  const renderSection = (
      stepNumber: number, 
      title: string, 
      icon: any,
      isActive: boolean, 
      isCompleted: boolean,
      content: React.ReactNode, 
      summary?: React.ReactNode
  ) => {
      const Icon = icon;
      return (
          <div className={`rounded-2xl border transition-all duration-300 overflow-hidden mb-4 shadow-sm ${isActive ? 'bg-white border-primary ring-1 ring-primary/20' : isCompleted ? 'bg-white border-green-200' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
              {/* Header */}
              <div 
                className={`p-4 flex items-center justify-between cursor-pointer ${isActive ? 'bg-orange-50/30' : ''}`}
                onClick={() => isCompleted && setCurrentStep(stepNumber)}
              >
                  <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-xs font-bold transition-colors ${
                          isActive ? 'bg-primary text-white' : 
                          isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                          {isCompleted ? <Check size={16} /> : stepNumber}
                      </div>
                      <div className="flex flex-col">
                          <span className={`font-bold text-sm ${isActive ? 'text-gray-900' : isCompleted ? 'text-green-800' : 'text-gray-500'}`}>{title}</span>
                          {isCompleted && summary && <div className="text-xs text-gray-500 mt-0.5">{summary}</div>}
                      </div>
                  </div>
                  {isCompleted && !isActive && (
                      <button className="text-primary p-2 hover:bg-orange-50 rounded-full transition-colors">
                          <Edit2 size={14} />
                      </button>
                  )}
                  {!isActive && !isCompleted && (
                      <Lock size={14} className="text-gray-300" />
                  )}
              </div>

              {/* Content */}
              {isActive && (
                  <div className="p-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                      {content}
                  </div>
              )}
          </div>
      );
  };

  if (currentStep === 4) {
      return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Check size={48} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">预订成功！</h2>
            <p className="text-sm text-gray-500 mt-2 text-center max-w-[250px]">
                您的房间已锁定。电子合同已发送至您的邮箱，请注意查收。
            </p>
            
            {/* Order Info */}
            <div className="bg-gray-50 p-5 rounded-2xl w-full mt-8 border border-gray-100">
                <div className="flex justify-between items-center mb-3 border-b border-gray-200 pb-3">
                    <span className="text-xs text-gray-500">订单编号</span>
                    <span className="text-xs font-mono font-bold text-gray-900">ORD-2025-8823</span>
                </div>
                 <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">预订房源</span>
                    <span className="text-xs font-bold text-gray-900">{listing.title}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">支付定金</span>
                    <span className="text-xs font-bold text-primary">{listing.currency}{listing.price}</span>
                </div>
            </div>

            {/* Guide Card */}
            <div 
                onClick={() => navigate(`/guide/${listing.id}`)}
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-5 mt-6 shadow-lg relative overflow-hidden cursor-pointer active:scale-95 transition-transform"
            >
                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <div className="flex items-center mb-1">
                            <Plane size={20} className="mr-2 text-orange-400" />
                            <h3 className="font-bold text-lg">查看行前指南</h3>
                        </div>
                        <p className="text-xs text-gray-300">定制化 Checklist、签证攻略</p>
                    </div>
                    <div className="bg-white/10 rounded-full p-2">
                        <ChevronLeft size={20} className="rotate-180" />
                    </div>
                </div>
            </div>

            <button 
                onClick={() => navigate('/')}
                className="mt-8 w-full border border-gray-200 text-gray-600 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
            >
                返回首页
            </button>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] sticky top-0 z-30">
          <div className="flex items-center justify-between mb-6">
             <button onClick={handleBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
                <ChevronLeft size={20} className="text-gray-700" />
             </button>
             <h1 className="font-bold text-base text-gray-900">确认预订 (Checkout)</h1>
             <div className="w-8"></div>
          </div>
          {/* Minimal Progress Bar */}
          <div className="flex items-center gap-2 px-1">
               <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${currentStep >= 1 ? 'bg-primary' : 'bg-gray-200'}`}></div>
               <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
               <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium px-1">
              <span className={currentStep >= 1 ? 'text-primary' : ''}>实名认证</span>
              <span className={currentStep >= 2 ? 'text-primary' : ''}>签署合同</span>
              <span className={currentStep >= 3 ? 'text-primary' : ''}>支付定金</span>
          </div>
      </div>

      <div className="flex-1 p-4 pb-32 overflow-y-auto" ref={scrollRef}>
        {/* Listing Summary Small Card */}
        <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center mb-6 shadow-sm">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 mr-3 relative">
                 <img src={listing.image} className="w-full h-full object-cover" alt="Room" />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-gray-900 truncate">{listing.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{listing.type} · {listing.leaseTerms[0]}</p>
                <div className="flex items-center mt-1.5">
                    <span className="text-primary font-bold text-sm mr-2">{listing.currency}{listing.price}/月</span>
                    <span className="text-[10px] bg-orange-50 text-primary px-1.5 py-0.5 rounded border border-orange-100 font-medium">全包价</span>
                </div>
            </div>
        </div>

        {/* Step 1: Identity */}
        {renderSection(
            1, 
            "身份信息 (Identity)", 
            User,
            currentStep === 1, 
            currentStep > 1,
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">真实姓名 (Legal Name)</label>
                    <input 
                        type="text" 
                        placeholder="与护照一致 (拼音)"
                        className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium transition-all"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">手机号 (Phone)</label>
                        <input 
                            type="tel" 
                            placeholder="+86"
                            className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">微信 (WeChat)</label>
                        <input 
                            type="text" 
                            placeholder="ID"
                            className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium"
                            value={formData.wechat}
                            onChange={e => setFormData({...formData, wechat: e.target.value})}
                        />
                    </div>
                </div>
                
                <div className="pt-2">
                    <label className="block text-xs font-bold text-gray-700 mb-2">证件上传 (I-20 / Passport)</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 cursor-pointer hover:bg-white hover:border-primary/50 transition-all group">
                        <div className="bg-white p-3 rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
                            <UploadCloud size={20} className="text-primary" />
                        </div>
                        <span className="text-xs font-medium">点击或拖拽上传文件</span>
                        <span className="text-[10px] mt-1 text-gray-300">支持 JPG, PDF (Max 5MB)</span>
                    </div>
                </div>

                <button 
                    onClick={() => setCurrentStep(2)}
                    disabled={!formData.name || !formData.phone}
                    className={`w-full py-3.5 rounded-xl font-bold mt-2 transition-all shadow-lg ${!formData.name || !formData.phone ? 'bg-gray-200 text-gray-400 shadow-none' : 'bg-primary text-white shadow-orange-200 active:scale-95'}`}
                >
                    下一步：预览合同
                </button>
            </div>,
            <div className="flex items-center gap-2 text-xs font-medium text-gray-900">
                <span className="bg-gray-100 px-2 py-0.5 rounded">{formData.name}</span>
                <span className="text-gray-300">|</span>
                <span>{formData.phone}</span>
            </div>
        )}

        {/* Step 2: Contract */}
        {renderSection(
            2, 
            "合同签署 (Contract)", 
            FileText,
            currentStep === 2, 
            currentStep > 2,
            <div className="space-y-4">
                <div className="h-[480px] border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <ContractViewer signature={signature} onSignatureChange={setSignature} />
                </div>
                <button 
                    onClick={() => setCurrentStep(3)}
                    disabled={!signature}
                    className={`w-full py-3.5 rounded-xl font-bold mt-2 transition-all shadow-lg ${!signature ? 'bg-gray-200 text-gray-400 shadow-none' : 'bg-primary text-white shadow-orange-200 active:scale-95'}`}
                >
                    确认签名并支付
                </button>
            </div>,
            <span className="text-green-600 font-bold text-xs flex items-center bg-green-50 px-2 py-0.5 rounded-lg self-start">
                <CheckCircle size={10} className="mr-1"/> 已完成电子签名
            </span>
        )}

        {/* Step 3: Payment */}
        {renderSection(
            3, 
            "支付定金 (Payment)", 
            CreditCard,
            currentStep === 3, 
            false,
            <div className="space-y-6">
                {/* Trust Banner */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4 relative overflow-hidden">
                    <div className="flex items-start relative z-10">
                        <div className="bg-white p-1.5 rounded-full shadow-sm mr-3 mt-0.5">
                            <ShieldCheck className="text-green-600" size={18} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-green-900 text-sm mb-1">无忧退订保障 (Risk-Free)</h3>
                            <p className="text-xs text-green-800 leading-relaxed opacity-90">
                                若因 <span className="font-bold border-b border-green-300">签证被拒</span> 或 <span className="font-bold border-b border-green-300">学校录取变动</span> 导致无法入学，提供官方证明可申请 <span className="font-bold">100% 全额退款</span>。
                            </p>
                            <button 
                                onClick={() => setShowPolicyModal(true)}
                                className="text-[10px] font-bold text-green-700 mt-2 flex items-center hover:underline"
                            >
                                <HelpCircle size={10} className="mr-1"/> 查看完整政策
                            </button>
                        </div>
                    </div>
                    <div className="absolute -right-6 -top-6 w-20 h-20 bg-green-200/20 rounded-full blur-xl"></div>
                </div>

                {/* Invoice Card */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-500">费用明细</span>
                        <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded">首月租金</span>
                    </div>
                    <div className="p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">定金 (Security Deposit)</span>
                            <span className="text-sm font-medium text-gray-900">{listing.currency}{listing.price}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">平台服务费 (Service Fee)</span>
                            <div className="text-right">
                                <span className="text-sm font-medium text-gray-900 line-through text-gray-400 block">{listing.currency}200</span>
                                <span className="text-xs text-green-600 font-bold">限时减免 -$200</span>
                            </div>
                        </div>
                        <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center">
                            <span className="font-bold text-gray-900">实付总额 (Total)</span>
                            <span className="text-xl font-bold text-primary">{listing.currency}{listing.price}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div>
                    <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-3">选择支付方式</h4>
                    <div className="space-y-2">
                        {[
                            { id: 'WeChat Pay', icon: '💬', label: '微信支付 (WeChat Pay)' }, 
                            { id: 'Alipay', icon: '💙', label: '支付宝 (Alipay)' }, 
                            { id: 'Credit Card', icon: '💳', label: '信用卡 (Credit/Debit)' }
                        ].map(method => (
                            <label 
                                key={method.id} 
                                className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all hover:border-gray-300 ${paymentMethod === method.id ? 'border-primary bg-orange-50 ring-1 ring-primary/20' : 'border-gray-200 bg-white'}`}
                            >
                                <div className="flex items-center">
                                    <span className="text-xl mr-3">{method.icon}</span>
                                    <span className="text-sm font-bold text-gray-800">{method.label}</span>
                                </div>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${paymentMethod === method.id ? 'border-primary bg-primary' : 'border-gray-300 bg-white'}`}>
                                    {paymentMethod === method.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                </div>
                                <input 
                                    type="radio" 
                                    name="payment" 
                                    className="hidden"
                                    checked={paymentMethod === method.id}
                                    onChange={() => setPaymentMethod(method.id)}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={handleSubmitPayment}
                    disabled={isProcessing}
                    className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-xl hover:bg-black active:scale-95 transition-all flex items-center justify-center"
                >
                    {isProcessing ? (
                        <span className="flex items-center gap-2">
                             <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                             支付处理中...
                        </span>
                    ) : (
                        <span className="flex items-center">
                            立即支付 {listing.currency}{listing.price} <ChevronLeft size={16} className="rotate-180 ml-1"/>
                        </span>
                    )}
                </button>
                <div className="flex justify-center items-center gap-2 opacity-50">
                    <ShieldCheck size={12} className="text-gray-500"/>
                    <span className="text-[10px] text-gray-500">SSL 安全加密支付 · 资金由第三方银行托管</span>
                </div>
            </div>
        )}

      </div>

      {/* Policy Modal */}
      {showPolicyModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-900">无忧退订政策详情</h3>
                    <button onClick={() => setShowPolicyModal(false)}><X size={20} className="text-gray-400 hover:text-gray-600"/></button>
                </div>
                <div className="p-6 text-sm text-gray-600 space-y-4">
                    <p className="text-xs leading-relaxed font-medium text-gray-800">
                        平台承诺：在 2025年7月31日 前，如遇以下不可抗力，押金及租金将在 14 个工作日内 <span className="text-green-600 font-bold">全额退回</span>。
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                        <div className="flex items-start">
                            <CheckCircle size={14} className="text-green-500 mt-0.5 mr-2 flex-shrink-0"/>
                            <span className="text-xs">签证被拒 (Visa Denial)</span>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle size={14} className="text-green-500 mt-0.5 mr-2 flex-shrink-0"/>
                            <span className="text-xs">学校录取被撤回 (Admission Withdrawn)</span>
                        </div>
                         <div className="flex items-start">
                            <CheckCircle size={14} className="text-green-500 mt-0.5 mr-2 flex-shrink-0"/>
                            <span className="text-xs">严重的医疗状况 (Medical Emergency)</span>
                        </div>
                    </div>
                    <div className="text-[10px] text-gray-400 border-t pt-3">
                        * 需提供官方证明文件 (如拒签信)。个人原因改变行程不在此保障范围内。
                    </div>
                </div>
                <div className="p-4 border-t bg-gray-50">
                    <button onClick={() => setShowPolicyModal(false)} className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-transform">
                        我已了解
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;