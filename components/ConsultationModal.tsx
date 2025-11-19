import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  listingTitle?: string;
}

const ConsultationModal: React.FC<Props> = ({ isOpen, onClose, listingTitle }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate CRM API call (Delay < 500ms per requirement)
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-xs overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-gray-900">咨询管家</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-gray-600 mb-2">
                {listingTitle ? `咨询房源: ${listingTitle}` : '告诉我您的租房需求'}
              </p>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">目标学校</label>
                <input required type="text" placeholder="例: USC, NYU" className="w-full text-sm p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">入学时间</label>
                    <input type="month" className="w-full text-sm p-2 border rounded-lg outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">预算范围</label>
                    <select className="w-full text-sm p-2 border rounded-lg outline-none">
                        <option>$1000-1500</option>
                        <option>$1500-2000</option>
                        <option>$2000+</option>
                    </select>
                </div>
              </div>
              
              <div>
                 <label className="block text-xs font-medium text-gray-700 mb-1">微信 ID (用于联系您)</label>
                 <input required type="text" placeholder="WeChat ID" className="w-full text-sm p-2 border rounded-lg outline-none" />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-2 active:bg-primary-dark transition-colors"
              >
                {loading ? '提交中...' : '联系管家 (实时响应)'}
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900">提交成功</h4>
              <p className="text-sm text-gray-500 mt-2">您的专属管家将在 10 分钟内添加您的微信。</p>
              <button 
                onClick={onClose}
                className="mt-6 w-full bg-gray-100 text-gray-900 font-bold py-2 rounded-lg"
              >
                关闭
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;