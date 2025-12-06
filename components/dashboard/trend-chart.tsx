
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
            <h3 className="text-slate-300 font-bold mb-6 flex justify-between items-center">
                <span>최근 3개월 가격 추이</span>
                <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-xs text-slate-400"><div className="w-2 h-2 rounded-full bg-blue-400"></div>휘발유</span>
                    <span className="flex items-center gap-1 text-xs text-slate-400"><div className="w-2 h-2 rounded-full bg-emerald-400"></div>경유</span>
                </div>
            </h3>
            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorGasoline" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorDiesel" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke="#64748b"
                        fontSize={11}
                        tickFormatter={(str) => format(parseISO(str), "M.d")}
                        minTickGap={40}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        domain={['auto', 'auto']}
                        stroke="#64748b"
                        fontSize={11}
                        width={35}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", color: "#f8fafc", borderRadius: "8px", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)" }}
                        itemStyle={{ fontSize: "12px", fontWeight: 500 }}
                        labelStyle={{ color: "#94a3b8", fontSize: "11px", marginBottom: "4px" }}
                        labelFormatter={(label) => format(parseISO(label), "M월 d일 (EEE)", { locale: ko })}
                    />
                    <Area
                        type="monotone"
                        dataKey="gasoline"
                        name="휘발유"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorGasoline)"
                        activeDot={{ r: 6, strokeWidth: 0, fill: "#3b82f6" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="diesel"
                        name="경유"
                        stroke="#10b981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorDiesel)"
                        activeDot={{ r: 6, strokeWidth: 0, fill: "#10b981" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
