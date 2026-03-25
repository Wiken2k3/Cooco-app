import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Globe, ArrowRight, Loader2, Link as LinkIcon } from "lucide-react";

export default function ImportWebsite() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImport = () => {
    if (!url) return;
    setLoading(true);
    // Giả lập quét dữ liệu từ web trong 2 giây
    setTimeout(() => {
      setLoading(false);
      navigate("/app/recipes");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-6 pt-14">
      <header className="flex justify-between items-center mb-8">
        <button onClick={() => navigate(-1)} className="text-[var(--color-main)] font-bold flex items-center gap-1">
          <ChevronLeft size={24} /> Back
        </button>
        <h1 className="text-[17px] font-black">Add from Web</h1>
        <div className="w-10" /> 
      </header>

      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-[32px] p-8 text-center shadow-sm">
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[var(--color-main)]">
          <Globe size={32} />
        </div>
        <h2 className="text-2xl font-[900] mb-2">Import Recipe</h2>
        <p className="text-[15px] text-[var(--color-text-muted)] mb-8 px-4">
          Paste a link to any recipe website and we'll automatically extract the details for you.
        </p>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <LinkIcon size={18} className="text-gray-400" />
          </div>
          <input
            type="url"
            placeholder="https://example.com/recipe"
            className="w-full h-14 bg-gray-50 dark:bg-zinc-800/50 border border-[var(--color-border)] rounded-2xl pl-12 pr-4 text-[15px] focus:ring-2 focus:ring-[var(--color-main)]/30 outline-none transition"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <button
          disabled={!url || loading}
          onClick={handleImport}
          className={`w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-black text-lg transition-all ${
            url ? "bg-[var(--color-main)] text-white shadow-lg shadow-blue-500/20" : "bg-gray-100 dark:bg-zinc-800 text-gray-400"
          }`}
        >
          {loading ? <Loader2 className="animate-spin" /> : <>Import <ArrowRight size={20} /></>}
        </button>
      </div>

      <div className="mt-10 px-4">
        <h3 className="text-[13px] font-black text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Supported Sites</h3>
        <div className="flex flex-wrap gap-3 opacity-50">
          {["Allrecipes", "NYT Cooking", "Food Network", "Bon Appétit"].map(site => (
            <span key={site} className="px-3 py-1 bg-[var(--color-card)] border border-[var(--color-border)] rounded-full text-xs font-bold">{site}</span>
          ))}
        </div>
      </div>
    </div>
  );
}