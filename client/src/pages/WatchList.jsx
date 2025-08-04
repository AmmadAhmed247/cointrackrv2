import React from 'react'
import Search from "../components/Search.jsx"
import { useState } from 'react';
const WatchList = () => {
  const [timeframe, setTimeFrame] = useState("1d")
  const[style,setStyle]=useState("Line")
  const[open,setopen]=useState(false)
  const timeframes = [
    { label: "1 Minute", value: "1m" },
    { label: "5 Minutes", value: "5m" },
    { label: "15 Minutes", value: "15m" },
    { label: "1 Hour", value: "1h" },
    { label: "4 Hours", value: "4h" },
    { label: "1 Day", value: "1d" },
    { label: "1 Week", value: "1w" },
    { label: "1 Month", value: "1M" },
  ];
  return (
    <div className="flex flex-col min-h-screen ">
      <div className="h-16 gap-2 px-2 bg-zinc-100 flex items-center justify-between ">
        <div className="flex flex-row gap-2">    
        <Search placeholder={"BTCUSDT"} />
        <div className="flex gap-4 bg-white z-10 rounded-xl px-4 py-1">
          {timeframes.map((tf) => (
            <button onClick={() => setTimeFrame(tf.value)} className={`px-2 py-1 font-semibold rounded-xl transition-all ${timeframe === tf.value ? 'bg-blue-400 text-white  ' : 'bg-white hover:bg-zinc-100'
            }`} key={tf.label} >{tf.value}</button>
          ))}
        </div>
          </div>
        <div className="relative bg-white rounded-xl ">
          <button onClick={()=>setopen(!open)} className='font-semibold w-30  px-4 py-2' >{style}</button>
          {open && (          
          <div className="absolute py-2 bg-white rounded-md flex-col gap-2 flex top-12">
          <button onClick={()=>{setStyle("Line") , setopen(false)} }  className='px-4 bg-white w-30 rounded-md py-2 font-semibold hover:bg-zinc-100 ' >Line</button>
          <button onClick={()=>{setStyle("Candle") ,setopen(false)  }} className='px-4 bg-white w-30 rounded-md py-2 font-semibold hover:bg-zinc-100 ' >Candle</button>
          </div>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-20 bg-red-400 min-h-screen"></div>
        <div className="flex-3 bg-red-500 min-h-screen">
         
        </div>
        <div className="flex-1 bg-red-200 min-h-screen"></div>
      </div>
    </div>
  )
}

export default WatchList