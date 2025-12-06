
import { db } from "@/db";
import { fuelData } from "@/db/schema";
import { desc } from "drizzle-orm";
import { predictNextWeekPrice } from "@/lib/analysis";
import { PredictionBanner } from "@/components/dashboard/prediction-banner";
import { ProStatCard } from "@/components/dashboard/pro-stat-card";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { Droplet, DollarSign, BarChart2 } from "lucide-react";
import * as motion from "framer-motion/m"; // Using m for motion if available or standard motion
// Actually let's use the motion components we created
import { StaggerContainer, FadeUpItem, HoverCard } from "@/components/ui/motion";
import { motion as motionDiv } from "framer-motion"; // Direct import for one-offs

export const dynamic = 'force-dynamic';

export default async function Home() {
  const prices = await db.select().from(fuelData).orderBy(desc(fuelData.date)).limit(90);
  const sortedPrices = [...prices].reverse();
  const latest = sortedPrices[sortedPrices.length - 1];
  const yesterday = sortedPrices[sortedPrices.length - 2];
  const lastWeek = sortedPrices[sortedPrices.length - 8]; // 7 days ago

  let prediction = null;
  if (latest) {
    try {
      prediction = predictNextWeekPrice(
        sortedPrices.map(p => ({
          date: p.date,
          dubaiCrudePrice: p.dubaiCrudePrice || 0,
          exchangeRate: p.exchangeRate || 1350
        })),
        latest.gasolinePrice || 0,
        latest.dieselPrice || 0
      );
    } catch (e) {
      console.error("Prediction error", e);
    }
  }

  // Calculate trends for cards
  const getTrend = (current: number | null, prev: number | null) => (current || 0) - (prev || 0);
  const getPercent = (current: number | null, prev: number | null) => prev ? ((current || 0) - prev) / prev * 100 : 0;

  const gasTrend = getTrend(latest?.gasolinePrice, yesterday?.gasolinePrice);
  const gasPercent = getPercent(latest?.gasolinePrice, yesterday?.gasolinePrice);

  const dieselTrend = getTrend(latest?.dieselPrice, yesterday?.dieselPrice);
  const dieselPercent = getPercent(latest?.dieselPrice, yesterday?.dieselPrice);

  const dubaiTrend = getTrend(latest?.dubaiCrudePrice, yesterday?.dubaiCrudePrice);
  const dubaiPercent = getPercent(latest?.dubaiCrudePrice, yesterday?.dubaiCrudePrice);

  // Histories for sparklines (last 14 days)
  const historyLimit = 14;
  const recentHistory = sortedPrices.slice(-historyLimit);
  const gasHistory = recentHistory.map(p => p.gasolinePrice || 0);
  const dieselHistory = recentHistory.map(p => p.dieselPrice || 0);
  const dubaiHistory = recentHistory.map(p => p.dubaiCrudePrice || 0);

  // Format main chart data
  const chartData = sortedPrices.map(p => ({
    date: p.date,
    gasoline: p.gasolinePrice || 0,
    diesel: p.dieselPrice || 0
  }));

  if (!latest) {
    return <div className="text-center py-20 text-slate-500">데이터를 불러오는 중입니다...</div>;
  }

  return (
    <StaggerContainer className="space-y-8 max-w-[1600px] mx-auto">
      {/* Hero Prediction Section */}
      {prediction && (
        <FadeUpItem>
          <PredictionBanner
            gasoline={prediction.gasoline}
            diesel={prediction.diesel}
            currentGasoline={latest.gasolinePrice || 0}
            currentDiesel={latest.dieselPrice || 0}
            confidence={prediction.confidence}
          />
        </FadeUpItem>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FadeUpItem>
          <HoverCard>
            <ProStatCard
              title="휘발유 (Gasoline)"
              value={latest.gasolinePrice || 0}
              unit="원/ℓ"
              trend={gasTrend}
              trendPercent={gasPercent}
              history={gasHistory}
              icon={<Droplet size={16} className="text-blue-400" />}
              className="group border border-slate-700/50 bg-slate-900/40 backdrop-blur-md"
            />
          </HoverCard>
        </FadeUpItem>
        <FadeUpItem>
          <HoverCard>
            <ProStatCard
              title="경유 (Diesel)"
              value={latest.dieselPrice || 0}
              unit="원/ℓ"
              trend={dieselTrend}
              trendPercent={dieselPercent}
              history={dieselHistory}
              icon={<Droplet size={16} className="text-emerald-400" />}
              className="group border border-slate-700/50 bg-slate-900/40 backdrop-blur-md"
            />
          </HoverCard>
        </FadeUpItem>
        <FadeUpItem>
          <HoverCard>
            <ProStatCard
              title="국제 유가 (Dubai Crude)"
              value={latest.dubaiCrudePrice || 0}
              unit="$/bbl"
              trend={dubaiTrend}
              trendPercent={dubaiPercent}
              history={dubaiHistory}
              icon={<DollarSign size={16} className="text-amber-400" />}
              className="group border border-slate-700/50 bg-slate-900/40 backdrop-blur-md"
            />
          </HoverCard>
        </FadeUpItem>
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        <FadeUpItem className="lg:col-span-2 h-full">
          <div className="h-full bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-md shadow-xl">
            <TrendChart data={chartData} />
          </div>
        </FadeUpItem>

        <FadeUpItem className="h-full">
          <div className="h-full bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-md flex flex-col shadow-xl hover:border-blue-500/30 transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                <BarChart2 size={20} className="text-slate-400" />
                시장 분석 리포트
              </h3>
              <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded animate-pulse">Live</span>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-colors"
              >
                <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  국제 시장 동향
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  최근 두바이유 가격이 <span className="text-slate-200">{latest.dubaiCrudePrice}달러</span>를 기록하며
                  {Math.abs(dubaiTrend) < 1 ? " 보합세" : dubaiTrend > 0 ? " 상승세" : " 하락세"}를 보이고 있습니다.
                </p>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-colors"
              >
                <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  환율 영향
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  원/달러 환율은 현재 <span className="text-slate-200">{latest.exchangeRate}원</span>으로,
                  수입 원가에 {latest.exchangeRate! > 1350 ? "부담을 주고 있습니다." : "안정적인 흐름을 돕고 있습니다."}
                </p>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-teal-400/20 text-blue-400 text-sm font-bold border border-blue-500/30 hover:from-blue-600/30 hover:to-teal-400/30 transition-all shadow-lg"
            >
              전체 리포트 보기 →
            </motion.button>
          </div>
        </FadeUpItem>
      </div>
    </StaggerContainer>
  );
}
