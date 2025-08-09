import React, { useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";
import RektSection from '../components/RektSection';
import LiveList from '../components/LiveList';


export default function HeatmapTreemap({
  apiBase = "http://localhost:3000",
  pollInterval = 1500,
  windowSec = 60,
  top = 60,
}) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchOnce = async () => {
      try {
        const res = await axios.get(`${apiBase}/api/liquidations?limit=1000`);
        if (!mounted) return;
        setEvents(res.data || []);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error("Heatmap fetch error:", err.message);
        setError(err.message);
      }
    };

    fetchOnce();
    const id = setInterval(fetchOnce, pollInterval);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [apiBase, pollInterval]);

  const aggregated = useMemo(() => {
    if (!events || events.length === 0) return [];

    const now = Date.now();
    const cutoff = now - windowSec * 1000;
    const map = new Map();

    for (const e of events) {
      const ts = e.time ?? e.ts ?? Date.now();
      if (ts < cutoff) continue;
      const symbol = (e.symbol || e.s || "UNKNOWN").toString().toUpperCase();
      const sideRaw = (e.side || "").toString().toLowerCase();
      const qty = parseFloat(e.size ?? e.qty ?? e.volume ?? 0) || 0;
      const price = parseFloat(e.price ?? e.p ?? 0) || 0;
      const usd = qty && price ? qty * price : 0;

      if (!map.has(symbol)) {
        map.set(symbol, { symbol, long: 0, short: 0, value: 0, count: 0 });
      }
      const rec = map.get(symbol);

      if (sideRaw.includes("buy")) rec.long += usd;
      else rec.short += usd;

      rec.value += usd;
      rec.count += 1;
    }
    const arr = Array.from(map.values())
      .filter((r) => r.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, top);

    return arr.map((r) => ({
      symbol: r.symbol,
      value: Math.max(1, Math.sqrt(r.value)),
      rawValue: r.value,
      long: r.long,
      short: r.short,
      count: r.count,
      ratio: (r.long - r.short) / (r.long + r.short || 1),
    }));
  }, [events, windowSec, top]);


  const ratioToColor = (ratio) => {
    const g = Math.round(((ratio + 1) / 2) * 220);
    const r = Math.round(((1 - ratio) / 2) * 220);
    return `rgb(${r}, ${g}, 70)`;
  };
  const formatNumber = (n) => {
    if (!n) return "0";
    if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + "B";
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
    return Math.round(n).toLocaleString();
  };

  const nodes = aggregated.map((item) => ({
    name: item.symbol,
    value: item.value,
    rawValue: item.rawValue,
    long: item.long,
    short: item.short,
    count: item.count,
    ratio: item.ratio,
    itemStyle: { color: ratioToColor(item.ratio) },
  }));

  const option = {
    tooltip: {
      trigger: "item",
      formatter: (info) => {
        const d = info.data || {};
        return `
          <div style="min-width:140px  ">
            <strong>${d.name}</strong><br/>
            Liquidation: $${Math.round(d.rawValue || 0).toLocaleString()}<br/>
            Long: $${Math.round(d.long || 0).toLocaleString()}<br/>
            Short: $${Math.round(d.short || 0).toLocaleString()}<br/>
          </div>
        `;
      },
    },
    series: [
      {
        name: "Liquidations",
        type: "treemap",
        roam: false,
        breadcrumb: { show: false },

        upperLabel: { show: false },

        label: {
          show: true,
          position: 'insideTopLeft',
          align: 'left',
          verticalAlign: 'top',



          formatter: (params) => {
            const name = params.name || '';
            const total = params.data.rawValue || 0;

            return `{nameStyle|${name}}\n{valueStyle|$${formatNumber(total)}}`;
          },

          rich: {
            nameStyle: {
              fontSize: 20,

              color: '#ffffff',
              lineHeight: 29,
              padding: [6, 6, 2, 6],
            },
            valueStyle: {
              fontSize: 16,
              fontWeight: '500',
              color: '#d1d5db',
              lineHeight: 16,
              padding: [0, 6, 6, 6],
            }
          }
        },

        itemStyle: { borderColor: "#111827", borderWidth: 1 },
        data: nodes,
      },
    ],


    animation: true,
  };

  return (
    <div className="w-full ">
      {error && (
        <div style={{ padding: 8, background: "#2a2a2a", color: "#fff", marginBottom: 8 }}>
          Error: {error}
        </div>
      )}
      <div className="flex flex-col justify-between h-140">
        
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
     
        


      </div>
       <div className="w-full flex flex-row gap-4 ">
          <div className="bg-zinc-900 flex flex-col rounded-md  text-white shadow-sm">
            <LiveList limit={30} interval={1500} />
          </div>
            <RektSection data={events} />
           
        </div>
    </div>
  );
}
