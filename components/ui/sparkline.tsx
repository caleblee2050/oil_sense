
"use client";

import { ResponsiveContainer, AreaChart, Area } from "recharts";

interface SparklineProps {
    data: number[];
    color?: string;
    trend?: "up" | "down" | "neutral";
}

export function Sparkline({ data, color = "#3b82f6", trend }: SparklineProps) {
    const chartData = data.map((val, i) => ({ i, val }));

    // Dynamic color based on trend if not provided?
    // Actually let's trust the prop, but default to accent colors
    const strokeColor = trend === "up" ? "#ef4444" : trend === "down" ? "#3b82f6" : color;
    // Gradient ID needs to be unique if multiple on page, or scoped.
    // Using simple random suffix or ID prop in real app. For now hardcode or use simple logic.
    const id = `gradient-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className="h-12 w-24">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={strokeColor} stopOpacity={0.3} />
                            <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="val"
                        stroke={strokeColor}
                        strokeWidth={2}
                        fill={`url(#${id})`}
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
