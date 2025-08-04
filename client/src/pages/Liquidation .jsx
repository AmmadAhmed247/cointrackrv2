import React from 'react'
import { useState } from 'react'

const Liquidation = () => {
  const [opt, setOpt] = useState("1 hour")
  const options = ["1 hour", "4 hour", "12 hour", "24 hour"];
  const cryptoData = [
    { symbol: 'ETH', amount: 1200000, size: 'xlarge', change: 8.5, color: 'bg-green-500' },
    { symbol: 'XRP', amount: 640970, size: 'large', change: -3.2, color: 'bg-red-500' },
    { symbol: 'BTC', amount: 397140, size: 'large', change: 4.7, color: 'bg-green-600' },
    { symbol: 'Others', amount: 582180, size: 'medium', change: 2.1, color: 'bg-green-700' },
    { symbol: 'MAGIC', amount: 412230, size: 'medium', change: -1.8, color: 'bg-red-600' },
    { symbol: 'SUI', amount: 334130, size: 'medium', change: 6.3, color: 'bg-green-600' },
    { symbol: 'DOGE', amount: 287820, size: 'medium', change: -2.5, color: 'bg-red-600' },
    { symbol: 'SOL', amount: 258920, size: 'medium', change: 3.9, color: 'bg-green-600' },
    { symbol: 'TON', amount: 226570, size: 'medium', change: 1.2, color: 'bg-green-700' },
    { symbol: 'PEPE', amount: 224440, size: 'small', change: 12.8, color: 'bg-green-500' },
    { symbol: 'TRX', amount: 141160, size: 'small', change: -0.7, color: 'bg-red-700' },
    { symbol: 'PENGU', amount: 169180, size: 'small', change: 18.3, color: 'bg-green-400' },
    { symbol: '1000BONK', amount: 196670, size: 'small', change: -6.2, color: 'bg-red-500' },
    { symbol: 'HBAR', amount: 115420, size: 'small', change: 4.1, color: 'bg-green-700' },
    { symbol: 'ZORA', amount: 97230, size: 'small', change: -2.3, color: 'bg-red-700' },
    { symbol: 'SPELL', amount: 86540, size: 'small', change: 5.7, color: 'bg-green-700' },
    { symbol: 'CVX', amount: 78900, size: 'small', change: -1.1, color: 'bg-red-700' },
    { symbol: 'WIF', amount: 71200, size: 'small', change: 9.4, color: 'bg-green-600' },
    { symbol: 'FARTCOIN', amount: 68300, size: 'small', change: 23.7, color: 'bg-green-400' },
    { symbol: 'ONDO', amount: 64500, size: 'small', change: -3.8, color: 'bg-red-600' }
  ];
  const sortedData = [...cryptoData].sort((a, b) => b.amount - a.amount);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between gap-5 border-b-2 border-zinc-100 py-2 px-2 flex-row">
        <div className="flex flex-2 px-4 py-2 bg-zinc-50 gap-4 rounded-lg flex-row">
          <h4 className='font-bold text-2xl items-center flex' >Liquidation Heatmap</h4>
          {options.map((item) => (
            <button onClick={() => setOpt(item)} className={` rounded-md px-3 py-1 font-semibold flex items-center  ${item === opt ? "bg-blue-400 text-white" : "bg-white"} `} >
              {item}
            </button>
          ))}
        </div>
        <div className="flex-1 items-center flex">
          <h4 className='font-bold text-2xl items-center flex' >Total Liquidation</h4>
        </div>
      </div>
      <div className="flex gap-2 flex-col">
        <div className="flex flex-row  w-full">
          <div className="h-[600px] w-full flex flex-col">
           {cryptoData.map((item)=>{
            <div className=""></div>
           })}
          </div>


        </div>
        <div className="flex flex-row h-20 bg-red-400"></div>
        <div className="w-full flex-row flex h-100 mb-10 bg-red-700">
          <div className="flex-1 bg-amber-300 h-full w-1/3 rounded-md "></div>
          <div className="flex-1 bg-yellow-300 rounded-md h-full"></div>
        </div>
      </div>
    </div>
  )
}

export default Liquidation 