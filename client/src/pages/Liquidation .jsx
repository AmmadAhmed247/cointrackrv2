import React, { useState } from 'react';
import RektSection from '../components/RektSection';
import HeatmapDivs from '../components/HeatmapTreemap';
const Liquidation = () => {
  const [opt, setOpt] = useState("1 hour");
  const options = ["1 hour", "4 hour", "12 hour", "24 hour"];
  const windowMap = { "1 hour": 3600, "4 hour": 14400, "12 hour": 43200, "24 hour": 86400 };
  return (
    <div className="flex flex-col  bg-zinc-900 min-h-screen text-white">
      <div className="flex justify-between gap-5 border-b border-gray-700 py-3 px-2">
        <div className="flex items-center gap-4">
          <h4 className='font-bold text-2xl'>Liquidation Heatmap</h4>

          <div className="flex gap-2">
            {options.map((item) => (
              <button
                key={item}
                onClick={() => setOpt(item)}
                className={`rounded-md px-3 py-1 font-semibold ${item === opt ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

       
      </div>

      <div className="mt-4 flex flex-col ">
        <div className='w-full overflow-hidden' >
          <HeatmapDivs />
        </div>
        
      </div>
    </div>
  );
};

export default Liquidation;
