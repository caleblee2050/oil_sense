
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Home, Settings, Newspaper, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const NAV_ITEMS = [
    { label: "대시보드", href: "/", icon: Home },
    { label: "상세 분석", href: "/analysis", icon: BarChart3 }, // Assuming new page or placeholder
    { label: "뉴스 & 인사이트", href: "/news", icon: Newspaper }, // Placeholder
    { label: "설정", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 bg-slate-900/90 rounded-full border border-slate-700 text-white shadow-lg backdrop-blur-md"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Sidebar Container */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 bg-[#0f172a]/80 backdrop-blur-xl border-r border-slate-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full p-6">
                    <div className="flex items-center gap-2 mb-10 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="font-bold text-white text-lg">O</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight text-white">Oil Sense</h1>
                            <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-1.5 py-0.5 rounded ml-1">Pro</span>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-1">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                                        isActive
                                            ? "bg-blue-600/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)] border border-blue-500/20"
                                            : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                                    )}
                                >
                                    <item.icon size={18} className={cn("transition-colors", isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300")} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-slate-800">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-xl border border-slate-700/50">
                            <p className="text-xs text-slate-400 mb-2">데이터 업데이트</p>
                            <div className="flex items-center gap-2">
                                <div className="relative w-2 h-2">
                                    <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                                    <div className="relative w-2 h-2 bg-emerald-500 rounded-full"></div>
                                </div>
                                <span className="text-xs font-mono text-emerald-400">실시간 연동 중</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
