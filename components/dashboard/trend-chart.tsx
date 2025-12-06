
"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

interface ChartData {
    date: string;
    gasoline: number;
    diesel: number;
    isPrediction?: boolean;
}

export function TrendChart({ data }: { data: ChartData[] }) {
    return (
        <div className="h-[400px] w-full bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl backdrop-blur-sm">
            <h3 className="text-gray-300 font-medium mb-6">최근 3개월 가격 추이 및 예측</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorGasoline" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorDiesel" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#34D399" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke="#9CA3AF"
                        fontSize={12}
                        tickFormatter={(str) => format(parseISO(str), "M.d")}
                        minTickGap={30}
                    />
                    <YAxis
                        domain={['auto', 'auto']}
                        stroke="#9CA3AF"
                        fontSize={12}
                        width={40}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F3F4F6" }}
                        labelFormatter={(label) => format(parseISO(label), "M월 d일 (EEE)", { locale: ko })}
                    />
                    <Area
                        type="monotone"
                        dataKey="gasoline"
                        name="휘발유"
                        stroke="#60A5FA"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorGasoline)"
                    />
                    <Area
                        type="monotone"
                        dataKey="diesel"
                        name="경유"
                        stroke="#34D399"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorDiesel)"
                    />
                    {/* Add a reference line for today if needed, but styling is complex in recharts dynamic data */}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
