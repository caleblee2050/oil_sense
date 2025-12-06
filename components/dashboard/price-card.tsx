
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceCardProps {
    title: string;
    price: number;
    unit?: string;
    trend?: number; // difference from yesterday
    prediction?: number; // next week
    className?: string;
    icon?: React.ReactNode;
}

export function PriceCard({ title, price, unit = "원/ℓ", trend = 0, prediction, className, icon }: PriceCardProps) {
    const isUp = trend > 0;
    const isDown = trend < 0;

    return (
        <div className={cn("rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10 shadow-xl", className)}>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-gray-400 font-medium text-sm">{title}</h3>
                {icon && <div className="text-blue-400">{icon}</div>}
            </div>

            <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {price.toLocaleString()}
                </span>
                <span className="text-gray-500 text-sm">{unit}</span>
            </div>

            <div className="flex items-center gap-4">
                {trend !== 0 && (
                    <div className={cn("flex items-center text-sm font-medium", isUp ? "text-red-400" : "text-blue-400")}>
                        {isUp ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                        <span>{Math.abs(trend)}원 {isUp ? "상승" : "하락"}</span>
                    </div>
                )}

                {prediction && (
                    <div className="text-xs text-gray-400 border-l border-white/10 pl-4 py-1">
                        다음주 예측: <span className="text-white font-semibold">{prediction.toLocaleString()}원</span>
                    </div>
                )}
            </div>
        </div>
    );
}
