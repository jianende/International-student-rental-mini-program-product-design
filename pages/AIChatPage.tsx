
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Send, Sparkles, User, MessageCircle, MapPin } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import ListingCard from '../components/ListingCard';
import ConsultationModal from '../components/ConsultationModal';

const AIChatPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConsultModal, setShowConsultModal] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'model',
      text: '👋 你好！我是柚子找房的 AI 助手。告诉我你想去的**学校**（如 USC, NYU）和**预算**，我来帮你找最适合的“拎包入住”房源！'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setIsLoading(true);

    // Add user message
    const newMessages = [
      ...messages, 
      { id: Date.now().toString(), role: 'user' as const, text: userText }
    ];
    setMessages(newMessages);

    // API Call
    // Convert internal message format to Gemini history format
    const history = newMessages.slice(0, -1).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    const response = await sendMessageToGemini(history, userText);

    setMessages(prev => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text,
        relatedListings: response.listings,
        groundingChunks: response.groundingChunks
      }
    ]);
    setIsLoading(false);
  };

  const handleBack = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-3 flex items-center shadow-sm z-10">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center">
          <div className="bg-gradient-to-tr from-primary to-orange-300 w-8 h-8 rounded-full flex items-center justify-center text-white mr-2">
            <Sparkles size={16} />
          </div>
          <div>
             <h1 className="font-bold text-base">AI 智能找房</h1>
             <p className="text-[10px] text-green-600 flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                在线中 (Google Maps Supported)
             </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
               
               {/* Text Bubble */}
               <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                 msg.role === 'user' 
                   ? 'bg-primary text-white rounded-tr-none' 
                   : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
               }`}>
                 {msg.text}
               </div>
               
               {/* Maps Grounding Sources */}
               {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                 <div className="mt-2 flex flex-wrap gap-2">
                    {msg.groundingChunks.map((chunk: any, i: number) => {
                        // Handle Web Source
                        if (chunk.web) {
                            return (
                                <a key={i} href={chunk.web.uri} target="_blank" rel="noreferrer" className="text-[10px] bg-gray-100 text-blue-600 px-2 py-1 rounded border flex items-center hover:bg-gray-200 transition-colors">
                                    🔗 {chunk.web.title}
                                </a>
                            );
                        }
                        // Handle Maps Source
                        // Checking both SDK standard format and typical response format
                        const mapData = chunk.maps || (chunk.googleMapsMetadata && chunk.googleMapsMetadata.place);
                        if (mapData) {
                             return (
                                <a key={i} href={mapData.uri || '#'} target="_blank" rel="noreferrer" className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100 flex items-center hover:bg-green-100 transition-colors">
                                    <MapPin size={10} className="mr-1" /> {mapData.title || 'Google Maps Location'}
                                </a>
                            );
                        }
                        return null;
                    })}
                 </div>
               )}

               {/* Listings Cards inside Chat */}
               {msg.relatedListings && msg.relatedListings.length > 0 && (
                 <div className="mt-3 w-full space-y-3 animate-in fade-in slide-in-from-bottom-2">
                    {msg.relatedListings.map(listing => (
                        <div key={`chat-list-${listing.id}`} className="bg-white rounded-xl p-2 shadow-sm border w-64">
                            <ListingCard listing={listing} compact />
                        </div>
                    ))}
                    <button 
                        onClick={() => setShowConsultModal(true)}
                        className="w-64 bg-orange-50 text-primary border border-primary/30 hover:bg-orange-100 font-bold py-2.5 rounded-xl shadow-sm text-xs flex items-center justify-center transition-colors"
                    >
                        <MessageCircle size={14} className="mr-1.5" />
                        一键咨询所有房源
                    </button>
                 </div>
               )}

               {/* CTA Button if it's model response - Only show if NO listings are present to avoid clutter */}
               {msg.role === 'model' && msg.id !== 'init' && (!msg.relatedListings || msg.relatedListings.length === 0) && (
                  <div className="mt-2">
                      <button 
                        onClick={() => setShowConsultModal(true)}
                        className="text-xs text-primary border border-primary/30 bg-orange-50 px-3 py-1.5 rounded-full"
                      >
                        转人工管家咨询
                      </button>
                  </div>
               )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-3 border-t pb-safe fixed bottom-0 left-0 right-0 max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入学校、预算、偏好..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`p-2.5 rounded-full transition-colors ${
                input.trim() ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      <ConsultationModal 
        isOpen={showConsultModal}
        onClose={() => setShowConsultModal(false)}
      />
    </div>
  );
};

export default AIChatPage;
