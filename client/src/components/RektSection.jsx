import React from 'react';

const formatNumber = (n) => {
  if (!n) return "0";
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return Math.round(n).toLocaleString();
};

const RektSection = ({ data }) => {
  console.log('RektSection received data:', data);
  console.log('Data length:', data?.length);
  console.log('First item structure:', data?.[0]);

  if (!data || data.length === 0) {
    return (
      <div className="w-120 pr-4">
        <div className="bg-gray-700 text-white p-4 rounded-lg">
          No data available
        </div>
      </div>
    );
  }

  const filteredByHour = (hours) => {
    const now = Date.now();
    const cutoff = now - hours * 60 * 60 * 1000;
    
    return data.filter(item => {
      // Try multiple possible timestamp fields
      const ts = item.time ?? item.ts ?? item.timestamp ?? item.data?.updatedTime ?? item.data?.time ?? Date.now();
      const isRecent = ts >= cutoff;
      
      if (hours === 1) { // Debug log for 1h filter
        console.log(`Item timestamp: ${ts}, cutoff: ${cutoff}, isRecent: ${isRecent}`);
      }
      
      return isRecent;
    });
  };

  const getStats = (filtered) => {
    let long = 0, short = 0;
    
    console.log(`Processing ${filtered.length} filtered items`);
    
    for (const item of filtered) {
      // Try multiple possible field locations
      const price = parseFloat(
        item.price ?? 
        item.p ?? 
        item.data?.price ?? 
        0
      );
      
      const qty = parseFloat(
        item.size ?? 
        item.qty ?? 
        item.volume ?? 
        item.data?.size ?? 
        item.data?.qty ?? 
        0
      );
      
      const side = (
        item.side ?? 
        item.s ?? 
        item.data?.side ?? 
        ""
      ).toString().toLowerCase();
      
      const usd = price * qty;
      
      console.log(`Item: price=${price}, qty=${qty}, side=${side}, usd=${usd}`);
      
      if (side.includes("buy") || side.includes("long")) {
        long += usd;
      } else if (side.includes("sell") || side.includes("short")) {
        short += usd;
      }
    }
    
    return { total: long + short, long, short };
  };

  const timeFrames = [1, 4, 12, 24];
  
  return (
    <div className="w-150  h-fit rounded-md  pr-4">
      <h3 className="text-white text-lg mb-6 font-semibold">Total Liquidations</h3>
      <div className="grid grid-cols-2 gap-2">
        {timeFrames.map(hours => {
          const filtered = filteredByHour(hours);
          const stats = getStats(filtered);
          

          
          return (
            <div key={hours} className="bg-zinc-800 border-2 border-zinc-600 gap-4 px-2 py-1 rounded-md h-fit flex flex-col">
              <div className="flex justify-between">
                <span className="text-white font-semibold">{hours}h</span>
                <span className="text-white">${formatNumber(stats.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white text-sm">Long</span>
                <span className="text-white text-sm">${formatNumber(stats.long)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white text-sm">Short</span>
                <span className="text-white text-sm">${formatNumber(stats.short)}</span>
              </div>
             
            </div>
          );
        })}
      </div>
      
    
      
    </div>
  );
};

export default RektSection;