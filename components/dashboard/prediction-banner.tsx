
import { AlertTriangle, TrendingDown, TrendingUp, Calendar, Zap } from "lucide-react";

interface PredictionBannerProps {
    gasoline: number;
    diesel: number;
    currentGasoline: number;
    currentDiesel: number;
    confidence: number;
}

export function PredictionBanner({ gasoline, diesel, currentGasoline, currentDiesel, confidence }: PredictionBannerProps) {
    const gasChange = gasoline - currentGasoline;
    const dieselChange = diesel - currentDiesel;

    const isGasUp = gasChange > 0;

    return (
        <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-slate-900/50 p-8 mb-8 backdrop-blur-md shadow-2xl shadow-blue-900/10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="space-y-4 max-w-lg">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30 uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <Zap size={12} className="fill-blue-300" />
                        AI Prediction
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                        다음 주, 기름값 <br />
                        <span className={isGasUp ? "text-red-400" : "text-blue-400"}>
                            {isGasUp ? "오를 전망입니다." : "내릴 전망입니다."}
                        </span>
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        국제 유가와 환율 변동뿐만 아니라, 최근 3개월간의 시장 추세를 분석한 결과입니다.
                        예측 신뢰도는 <span className="text-emerald-400 font-bold">{Math.round(confidence * 100)}%</span>입니다.
                    </p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    {/* Gasoline Prediction */}
                    <div className="flex-1 md:w-48 bg-[#0f172a]/80 rounded-2xl p-5 border border-slate-700/50 backdrop-blur-xl shadow-lg relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="text-xs text-slate-400 mb-1 flex justify-between">
                            휘발유 예측가
                            {gasChange > 0 ? <TrendingUp size={14} className="text-red-400" /> : <TrendingDown size={14} className="text-blue-400" />}
                        </div>
                        <div className="text-2xl font-bold text-white mb-2">{gasoline.toLocaleString()}원</div>
                        <div className={`text-xs font-semibold px-2 py-1 rounded bg-slate-800 w-fit ${gasChange > 0 ? 'text-red-400' : 'text-blue-400'}`}>
                            {gasChange > 0 ? '+' : ''}{gasChange}원 예상
                        </div>
                    </div>

                    {/* Diesel Prediction */}
                    <div className="flex-1 md:w-48 bg-[#0f172a]/80 rounded-2xl p-5 border border-slate-700/50 backdrop-blur-xl shadow-lg relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="text-xs text-slate-400 mb-1 flex justify-between">
                            경유 예측가
                            {dieselChange > 0 ? <TrendingUp size={14} className="text-red-400" /> : <TrendingDown size={14} className="text-blue-400" />}
                        </div>
                        <div className="text-2xl font-bold text-white mb-2">{diesel.toLocaleString()}원</div>
                        <div className={`text-xs font-semibold px-2 py-1 rounded bg-slate-800 w-fit ${dieselChange > 0 ? 'text-red-400' : 'text-blue-400'}`}>
                            {dieselChange > 0 ? '+' : ''}{dieselChange}원 예상
                        </div>
                    </div>
                </div>
            </div>

            {/* Disclaimer / Date */}
            <div className="mt-8 pt-4 border-t border-slate-700/30 flex items-center gap-2 text-[10px] text-slate-500">
                <Calendar size={12} />
                예측 기준일: {new Date().toLocaleDateString()} · 투자를 비롯한 모든 결정의 책임은 사용자에게 있습니다.
            </div>
        </div>
    );
}
