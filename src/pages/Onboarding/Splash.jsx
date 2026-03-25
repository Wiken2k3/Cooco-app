import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full bg-[#8fb683] overflow-hidden font-sans select-none">
      
      {/* 1. LAYER NỀN: Trang Today (Xanh lá) */}
      <div className="absolute inset-0 flex flex-col p-6">
        {/* Top bar giả */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex gap-2">
            <span className="bg-white/30 px-4 py-1.5 rounded-lg text-sm text-white font-bold">Home</span>
            <span className="bg-white/30 px-4 py-1.5 rounded-lg text-sm text-white font-bold">Entries</span>
          </div>
          <div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center">
             <div className="grid grid-cols-3 gap-0.5">
                {[...Array(9)].map((_, i) => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
             </div>
          </div>
        </div>

        {/* Nội dung Today bị che một phần */}
        <div className="relative flex-1 border-[3px] border-white/20 rounded-[40px] p-8 flex flex-col">
          <div className="mb-12">
            <h2 className="text-5xl font-black text-white/30 leading-none">14</h2>
            <span className="text-white/30 font-extrabold uppercase tracking-widest text-lg">Jun</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h1 className="text-[64px] font-black text-white/40 leading-[0.9] mb-8">
              Today Isn't <br /> Over Yet
            </h1>
            <div className="w-32 h-1.5 bg-white/30 rounded-full mb-10" />
            <p className="text-white/30 text-xl font-medium leading-relaxed max-w-[280px]">
              Even when I have a horrible day filled with things I'm not proud of in my life...
            </p>
          </div>

          <div className="mt-auto w-full h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <span className="text-white/30 text-3xl font-black italic">Write!</span>
          </div>
        </div>
      </div>

      {/* 2. LAYER PHỦ (OVERLAY): Chỉ nằm bên phải và chứa text hướng dẫn */}
      <div 
        onClick={() => navigate("/faq1")}
        className="absolute inset-y-0 right-0 w-[50%] bg-[#3f51b5]/90 backdrop-blur-[2px] cursor-pointer flex items-center justify-center transition-all active:bg-[#3f51b5]/100 z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.1)]"
      >
        {/* Text hướng dẫn: Nằm chính giữa vùng xanh dương */}
        <div className="px-4 pointer-events-none">
        <h2 className="text-white text-[36px] sm:text-[40px] font-bold leading-[1.1] text-left drop-shadow-2xl">
            Tap to <br />
            <span>go right</span>
        </h2>
        </div>
      </div>

      {/* 3. HIỆU ỨNG TRANG KẾ TIẾP (Peek Effect) */}
      <div className="absolute inset-y-0 -right-[40%] w-[45%] bg-[#2d3b8a] rounded-l-[40px] opacity-40 pointer-events-none z-10" />

    </div>
  );
}