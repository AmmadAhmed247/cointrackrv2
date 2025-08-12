import React, { useEffect, useState } from "react";
import axios from "axios";
import RektSection from "../components/RektSection.jsx"

export default function LiveList({ limit = 200, interval = 1500, apiBase = "http://localhost:3000" }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiBase}/api/liquidations?limit=${limit}`);
        if (!mounted) return;
        setItems(res.data || []);
      } catch (err) {
        console.error("fetch error:", err.message);
      }
    };

    fetchData();
    const id = setInterval(fetchData, interval);
    return () => { mounted = false; clearInterval(id); };
  }, [limit, interval, apiBase]);

  return (
   <div className="w-fit h-fit mt-12 border-2 rounded-md border-zinc-700 text-sm font-medium">
  <h5 className="text-xl px-2 py-3">Real-Time Liquidations</h5>


  <div className="grid grid-cols-6 font-semibold border-b border-zinc-700 py-1 px-2 text-left bg-zinc-900 text-white">
    <div>Time</div>
    <div>Symbol</div>
    <div className="ml-7">Side</div>
    <div className="ml-2">Price</div>
    <div>Qty</div>
    <div>USD</div>
  </div>


  {items.slice().reverse().map((it, i) => {
    const ts = it.time ?? it.ts ?? Date.now();
    const price = parseFloat(it.price ?? it.p ?? 0);
    const qty = parseFloat(it.size ?? it.qty ?? it.volume ?? 0);
    const usd = (qty && price) ? qty * price : 0;

    return (
      <div
        key={i}
        className="grid grid-cols-6 items-center border-b gap-5 whitespace-nowrap border-white/10 py-1 px-2 text-sm text-white"
      >
        <div className="w-16">{new Date(ts).toLocaleTimeString()}</div>
        <div className="w-full" >{(it.symbol || "").toUpperCase()}</div>
        <div>
          <div
            className={`px-2 ml-7 py-[2px] text-[12px] rounded font-semibold w-fit
              ${it.side === "Buy" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
          >
            {it.side}
          </div>
        </div>
        <div className="ml-1">{price ? price.toLocaleString() : "-"}</div>
        <div>{qty || "-"}</div>
        <div>${usd ? Math.round(usd).toLocaleString() : "-"}</div>
      </div>
    );
  })}
</div>

  );
}
