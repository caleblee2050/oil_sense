
import { db } from "@/db";
import { fuelData } from "@/db/schema";
import { desc } from "drizzle-orm";
import { predictNextWeekPrice } from "@/lib/analysis";
import { PriceCard } from "@/components/dashboard/price-card";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { Droplet, DollarSign, TrendingUp } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const prices = await db.select().from(fuelData).orderBy(desc(fuelData.date)).limit(90);
  const sortedPrices = [...prices].reverse();
  const latest = sortedPrices[sortedPrices.length - 1];
  const yesterday = sortedPrices[sortedPrices.length - 2];

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

  const gasolineTrend = latest && yesterday ? (latest.gasolinePrice || 0) - (yesterday.gasolinePrice || 0) : 0;
  const dieselTrend = latest && yesterday ? (latest.dieselPrice || 0) - (yesterday.dieselPrice || 0) : 0;

  // Format for Chart
  const chartData = sortedPrices.map(p => ({
    date: p.date,
    gasoline: p.gasolinePrice || 0,
    diesel: p.dieselPrice || 0
  }));

  // Add prediction point to chart
  if (latest && prediction) {
    // Add mostly just for visual continuity if needed, or rely on the prediction card
    // Ideally we add a "Next Week" point
    // But adding it to the same series might be confusing without styling.
    // We will skip adding it to the chart series for now, kept it clean.
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Oil Sense
            </h1>
            <p className="text-gray-400 mt-2">국내 유가 예측 및 분석 대시보드</p>
          </div>
          <div className="text-right text-xs text-gray-500">
            Data based on Opinet & Global Market Trends
            <br />
            Updated: {latest ? latest.date : "-"}
          </div>
        </header>

        {latest ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PriceCard
                title="오늘의 휘발유"
                price={latest.gasolinePrice || 0}
                trend={gasolineTrend}
                prediction={prediction?.gasoline}
                icon={<Droplet size={20} />} // Use Droplet for oil/gas
                className="bg-white/5 border-blue-500/20"
              />
              <PriceCard
                title="오늘의 경유"
                price={latest.dieselPrice || 0}
                trend={dieselTrend}
                prediction={prediction?.diesel}
                icon={<Droplet size={20} className="text-emerald-400" />}
                className="bg-white/5 border-emerald-500/20"
              />
              <PriceCard
                title="국제 유가 (Dubai)"
                price={latest.dubaiCrudePrice || 0}
                unit="$"
                trend={latest.dubaiCrudePrice && yesterday.dubaiCrudePrice ? Number((latest.dubaiCrudePrice - yesterday.dubaiCrudePrice).toFixed(2)) : 0}
                icon={<DollarSign size={20} className="text-yellow-400" />}
                className="bg-white/5 border-yellow-500/20"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TrendChart data={chartData} />
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6 text-gray-300 font-medium">
                  <TrendingUp size={20} />
                  <h3>분석 리포트</h3>
                </div>
                <div className="space-y-4 text-sm text-gray-400">
                  <p>
                    <strong className="text-white block mb-1">가격 변동 요인</strong>
                    최근 두바이유 가격은 <span className="text-white">{latest.dubaiCrudePrice}불</span>로,
                    {latest.dubaiCrudePrice! > 80 ? " 높은 수준을 유지하고 있습니다." : " 안정세를 보이고 있습니다."}
                    환율은 <span className="text-white">{latest.exchangeRate}원</span>으로 국내 도입 가격에 영향을 미치고 있습니다.
                  </p>
                  <p>
                    <strong className="text-white block mb-1">다음 주 전망</strong>
                    모델 분석 결과, 휘발유 가격은
                    <span className={prediction && prediction.gasoline > (latest.gasolinePrice || 0) ? " text-red-400 font-bold" : " text-blue-400 font-bold"}>
                      {prediction && prediction.gasoline > (latest.gasolinePrice || 0) ? " 상승" : " 하락"}
                    </span>할 것으로 예상됩니다.
                    (신뢰도: {prediction ? prediction.confidence * 100 : 0}%)
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-500">
            데이터가 없습니다.
          </div>
        )}
      </div>
    </main>
  );
}
