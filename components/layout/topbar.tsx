
import { DollarSign, TrendingUp, RefreshCw } from "lucide-react";

export function TopBar() {
    return (
        <header className="h-16 border-b border-slate-800/50 bg-[#020617]/50 backdrop-blur-md flex items-center justify-between px-6 lg:ml-64 sticky top-0 z-20">
            <div className="flex items-center gap-6 overflow-hidden">
                {/* Mock Ticker */}
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 animate-pulse">
                    <span className="flex items-center gap-1 text-slate-500"><DollarSign size={12} /> 환율(USD)</span>
                    <span className="text-slate-200">1,345.50</span>
                    <span className="text-red-400 flex items-center">▲ 2.5</span>
                </div>
                <div className="w-px h-4 bg-slate-800"></div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <span className="flex items-center gap-1 text-slate-500"><TrendingUp size={12} /> 두바이유</span>
                    <span className="text-slate-200">$78.42</span>
                    <span className="text-blue-400 flex items-center">▼ 0.35</span>
                </div>
                <div className="w-px h-4 bg-slate-800"></div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <span className="flex items-center gap-1 text-slate-500"><TrendingUp size={12} /> WTI</span>
                    <span className="text-slate-200">$74.11</span>
                    <span className="text-blue-400 flex items-center">▼ 0.12</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
                    <RefreshCw size={14} />
                    <span>Just Now</span>
                </button>
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                    U
                </div>
            </div>
        </header>
    );
}
