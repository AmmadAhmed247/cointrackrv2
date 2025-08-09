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
    <div className="w-full  border-2 rounded-md border-zinc-700 text-sm font-medium">
      <h5 className="text-xl px-1 py-5" >Real-Time Liquidations</h5>
      <div className="grid grid-cols-6 font-semibold border-b border-zinc-700 py-2 px-2 text-left bg-zinc-900 text-white">
        <div>Time</div>
        <div>Sym</div>
        <div className="ml-6">Side</div>
        <div className="ml-2" >Price</div>
        <div>Qty</div>
        <div>USD</div>
      </div>

      {items.slice().reverse().map((it, i) => {
        const ts = it.time ?? it.ts ?? Date.now();
        const price = parseFloat(it.price ?? it.p ?? 0);
        const qty = parseFloat(it.size ?? it.qty ?? it.volume ?? 0);
        const usd = (qty && price) ? qty * price : 0;
        return (
          <div key={i} className="grid grid-cols-6 items-center border-b gap-2 whitespace-nowrap border-white/10 py-2 px-2 text-md text-white">
            <div className="w-20" >{new Date(ts).toLocaleTimeString()}</div>
            <div className="" >{(it.symbol || "").toUpperCase()}</div>
            <div>
              <div
                className={`px-4 ml-4  py-1  text-[13px] rounded font-semibold w-fit
                  ${it.side === "Buy" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
              >
               { it.side}
              </div>
            </div>
            <div className="ml-2" >{price ? price.toLocaleString() : "-"}</div>
            <div>{qty || "-"}</div>
            <div>${usd ? Math.round(usd).toLocaleString() : "-"}</div>
          </div>
        );
      })}
      
    </div>
  );
}
