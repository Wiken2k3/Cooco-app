import React from "react";
import { useNavigate } from "react-router-dom";
import { X, Zap, Image as ImageIcon, ScanText } from "lucide-react";

export default function ScanRecipe() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col">
      {/* Camera Viewfinder Mockup */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800')] bg-cover bg-center" />
      
      {/* Scanning Overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-10">
        <div className="w-full aspect-[3/4] border-2 border-white/50 rounded-3xl relative overflow-hidden">
          {/* Scanning Line Animation */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,1)] animate-scan" />
        </div>
      </div>

      {/* Header Controls */}
      <div className="relative z-10 p-8 pt-14 flex justify-between items-center text-white">
        <button onClick={() => navigate(-1)} className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center"><X size={28} /></button>
        <button className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center"><Zap size={24} /></button>
      </div>

      {/* Footer Controls */}
      <div className="relative z-10 mt-auto p-10 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center gap-8">
        <p className="text-white font-bold text-center px-10">Position the recipe inside the frame to scan ingredients and steps</p>
        
        <div className="flex items-center gap-12">
          <button className="text-white flex flex-col items-center gap-2">
            <ImageIcon size={28} />
            <span className="text-[10px] font-black uppercase tracking-widest">Gallery</span>
          </button>

          <button className="w-20 h-20 bg-white rounded-full border-[6px] border-white/30 flex items-center justify-center active:scale-90 transition shadow-2xl">
            <div className="w-16 h-16 bg-white rounded-full border-2 border-black/10" />
          </button>

          <button className="text-white flex flex-col items-center gap-2">
            <ScanText size={28} />
            <span className="text-[10px] font-black uppercase tracking-widest">OCR Mode</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          from { top: 0%; }
          to { top: 100%; }
        }
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}