
import { Sparkline } from "@/components/ui/sparkline";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProStatCardProps {
    title: string;
    value: string | number;
    unit: string;
    trend: number; // change value
    trendPercent: number;
    history: number[]; // for sparkline
    icon?: React.ReactNode;
    className?: string;
}

export function ProStatCard({ title, value, unit, trend, trendPercent, history, icon, className }: ProStatCardProps) {
    const isUp = trend > 0;
    const isNeutral = trend === 0;
    const trendColor = isUp ? "text-red-500" : isNeutral ? "text-slate-400" : "text-blue-500";
    const trendIcon = isUp ? <ArrowUp size={14} /> : isNeutral ? <Minus size={14} /> : <ArrowDown size={14} />;

    return (
        <div className={cn("relative overflow-hidden rounded-2xl bg-[#0f172a]/40 border border-slate-700/50 backdrop-blur-xl p-5 hover:bg-[#0f172a]/60 transition-all duration-300 group", className)}>
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-blue-500/10 transition-all"></div>

            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                    {icon && <span className="p-1.5 rounded-md bg-slate-800/50 text-slate-300">{icon}</span>}
                    {title}
                </div>
                {/* Sparkline placeholder for layout */}
                <Sparkline data={history} trend={isUp ? "up" : "down"} />
            </div>

            <div className="flex items-end gap-1.5 mt-1">
                <span className="text-3xl font-bold text-white tracking-tight font-mono">{typeof value === 'number' ? value.toLocaleString() : value}</span>
                <span className="text-sm text-slate-500 font-medium mb-1.5">{unit}</span>
            </div>

            <div className={cn("flex items-center gap-1 mt-3 text-xs font-semibold px-2 py-1 rounded-full w-fit bg-slate-800/50 border border-slate-700", trendColor)}>
                {trendIcon}
                <span>{Math.abs(trend).toLocaleString()} ({Math.abs(trendPercent).toFixed(2)}%)</span>
                <span className="text-slate-500 font-normal ml-1">vs yesterday</span>
            </div>
        </div>
    );
}
