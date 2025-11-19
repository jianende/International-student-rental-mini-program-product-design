import React, { useState } from 'react';
import { Sparkles, X, PenTool, AlertTriangle, CheckCircle2, Info, FileText, ShieldCheck } from 'lucide-react';

interface Props {
  signature: string;
  onSignatureChange: (sig: string) => void;
}

const ContractViewer: React.FC<Props> = ({ signature, onSignatureChange }) => {
  const [showSmartHelp, setShowSmartHelp] = useState(false);

  const smartTerms = [
    { 
      title: 'Security Deposit (押金条款)', 
      content: '押金为1个月租金 ($1,850)。退租后 21 天内，若无房屋结构性损坏将全额退还。', 
      riskLevel: 'medium',
      highlight: '注意：墙面涂鸦、地毯深层污垢或遗留大件垃圾可能导致高额扣款。建议入住时拍摄全屋视频留底。'
    },
    { 
      title: 'Lease Term (固定租期)', 
      content: '合同租期为固定 12 个月 (Aug 1, 2025 - Jul 31, 2026)。', 
      riskLevel: 'high',
      highlight: '高风险：这是一个具有法律约束力的固定期限。中途退租通常需支付剩余租金，或支付 2 个月违约金并自行找到转租人 (Sublease)。' 
    },
    { 
      title: 'Utilities (全包服务)', 
      content: '房东承担：水、电、网、燃气、物业费。租客承担：无。', 
      riskLevel: 'benefit',
      highlight: '权益：所有公用事业费用已包含，无需租客开通账户，无隐形账单。'
    },
    { 
      title: 'Quiet Hours (静音时段)', 
      content: '社区规定每日 10:00 PM 至次日 8:00 AM 为静音时段。', 
      riskLevel: 'low',
      highlight: '多次违反噪音规定可能导致罚款或驱逐。'
    }
  ];

  const getIcon = (level: string) => {
      switch(level) {
          case 'high': return <AlertTriangle size={14} className="text-red-500" />;
          case 'medium': return <Info size={14} className="text-orange-500" />;
          case 'benefit': return <ShieldCheck size={14} className="text-green-500" />;
          default: return <Info size={14} className="text-blue-500" />;
      }
  };

  const getStyle = (level: string) => {
       switch(level) {
          case 'high': return 'bg-red-50 border-red-100 text-red-900';
          case 'medium': return 'bg-orange-50 border-orange-100 text-orange-900';
          case 'benefit': return 'bg-green-50 border-green-100 text-green-900';
          default: return 'bg-blue-50 border-blue-100 text-blue-900';
      }
  };

  return (
    <div className="h-full flex flex-col relative bg-white rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 p-1">
        <h3 className="font-bold text-gray-900 text-sm flex items-center">
            <FileText size={16} className="mr-2 text-gray-500"/>
            租赁合同 (Lease Agreement)
        </h3>
        <button 
          onClick={() => setShowSmartHelp(!showSmartHelp)}
          className={`text-xs px-3 py-1.5 rounded-full flex items-center shadow-sm transition-all border ${showSmartHelp ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-primary border-primary/30 hover:bg-orange-50'}`}
        >
          <Sparkles size={12} className={`mr-1.5 ${showSmartHelp ? 'text-white' : 'text-primary'}`} />
          {showSmartHelp ? '关闭解读' : 'AI 风险解读'}
        </button>
      </div>

      {/* Contract Body Container */}
      <div className="flex-1 border rounded-xl bg-gray-50 overflow-hidden relative flex">
          {/* Contract Text */}
          <div className="flex-1 p-5 overflow-y-auto text-xs leading-relaxed text-gray-600 font-serif">
             <div className="max-w-2xl mx-auto">
                <h1 className="font-bold text-center text-base mb-6 text-black">CALIFORNIA RESIDENTIAL LEASE AGREEMENT</h1>
                
                <div className="space-y-4">
                    <section>
                        <h4 className="font-bold text-black uppercase mb-1">1. PARTIES</h4>
                        <p>THIS LEASE AGREEMENT (hereinafter referred to as the "Agreement") made and entered into this 20th day of November, 2025, by and between <strong>Youzi Management LLC</strong> (hereinafter referred to as "Landlord") and the Tenant named in the booking application (hereinafter referred to as "Tenant").</p>
                    </section>

                    <section>
                        <h4 className="font-bold text-black uppercase mb-1">2. PREMISES</h4>
                        <p>Landlord hereby leases to Tenant and Tenant hereby leases from Landlord the premises located at <strong>Lorenzo Housing, Los Angeles, CA 90007</strong> (the "Premises").</p>
                    </section>
                    
                    <section>
                        <h4 className="font-bold text-black uppercase mb-1">3. TERM</h4>
                        <p>The lease shall commence on <strong>August 1, 2025</strong> and end on <strong>July 31, 2026</strong>. Tenant agrees to vacate the Premises at 12:00 PM on the end date.</p>
                    </section>
                    
                    <section>
                        <h4 className="font-bold text-black uppercase mb-1">4. RENT</h4>
                        <p>Tenant agrees to pay Landlord as base rent the sum of <strong>$1,850.00</strong> per month, due on the 1st day of each month. Late fee of $50.00 applies after the 5th day.</p>
                    </section>
                    
                    <section>
                        <h4 className="font-bold text-black uppercase mb-1">5. SECURITY DEPOSIT</h4>
                        <p>On execution of this Lease, Tenant deposits with Landlord <strong>ONE MONTH RENT</strong> as security deposit for the performance by Tenant of the terms of this lease.</p>
                    </section>
                    
                    <section>
                        <h4 className="font-bold text-black uppercase mb-1">6. UTILITIES</h4>
                        <p>Landlord shall be responsible for the payment of the following utilities: Water, Gas, Electricity, and High-Speed Internet. Tenant shall pay for personal subscriptions.</p>
                    </section>

                     <section>
                        <h4 className="font-bold text-black uppercase mb-1">7. GOVERNING LAW</h4>
                        <p>This Lease shall be construed in accordance with the laws of the State of California.</p>
                    </section>
                </div>
                
                <div className="h-32"></div>
             </div>
          </div>

          {/* AI Analysis Overlay/Sidebar */}
          {showSmartHelp && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-10 overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
                  <div className="sticky top-0 bg-white/90 border-b p-3 flex justify-between items-center backdrop-blur-sm z-20">
                      <span className="font-bold text-sm flex items-center text-gray-900">
                          <Sparkles size={14} className="text-primary mr-2" />
                          AI 智能条款分析
                      </span>
                      <button onClick={() => setShowSmartHelp(false)} className="p-1 hover:bg-gray-100 rounded-full">
                          <X size={18} className="text-gray-400"/>
                      </button>
                  </div>
                  <div className="p-4 space-y-3">
                      {smartTerms.map((term, i) => (
                          <div key={i} className={`p-3 rounded-xl border ${getStyle(term.riskLevel)} shadow-sm`}>
                              <div className="flex justify-between items-start mb-2">
                                  <span className="font-bold text-xs flex items-center gap-1.5">
                                      {getIcon(term.riskLevel)} {term.title}
                                  </span>
                                  {term.riskLevel === 'high' && <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">高风险</span>}
                                  {term.riskLevel === 'benefit' && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">权益保障</span>}
                              </div>
                              <p className="text-xs opacity-90 mb-2 leading-relaxed">{term.content}</p>
                              <div className="text-[10px] font-medium bg-white/60 p-2 rounded-lg flex items-start border border-black/5">
                                  <span className="mr-1.5 mt-0.5">💡</span> 
                                  <span className="leading-relaxed">{term.highlight}</span>
                              </div>
                          </div>
                      ))}
                      <div className="text-center text-[10px] text-gray-400 mt-4">
                          * AI 分析基于通用租赁法生成，仅供参考，不构成法律建议。
                      </div>
                  </div>
              </div>
          )}
      </div>

      {/* Signature Area */}
      <div className="mt-4 pt-2">
         <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-700 flex items-center">
                <PenTool size={12} className="mr-1.5" /> 
                承租人电子签名 (Tenant Signature)
            </label>
            {signature && (
                 <span className="text-[10px] text-green-600 flex items-center bg-green-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 size={10} className="mr-1"/> 已认证
                 </span>
             )}
         </div>
         <div className="relative">
             <input 
               type="text" 
               placeholder="请在此输入您的全名 (拼音)"
               className={`w-full text-center text-lg font-cursive outline-none py-3 border-2 rounded-xl transition-all ${signature ? 'border-green-500 bg-green-50/30' : 'border-dashed border-gray-300 focus:border-primary bg-gray-50'}`}
               style={{ fontFamily: 'cursive' }} 
               value={signature}
               onChange={(e) => onSignatureChange(e.target.value)}
             />
         </div>
         <p className="text-[10px] text-gray-400 mt-2 text-center">
            点击 "同意并继续" 即表示您已阅读并同意上述所有条款，电子签名具有同等法律效力。
         </p>
      </div>
    </div>
  );
};

export default ContractViewer;