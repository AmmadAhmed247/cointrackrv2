import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const LiveChart = () => {
  const [theme,setTheme]=useState("light")
  return (
    <Link to="/livechart">
      <div className="h-screen w-full relative">
        <button onClick={()=>setTheme("dark")} className={`px-2 w-fit absolute top-2 right-18 ${theme==="dark" ? "text-white " :" text-black" } `} >Switch mode</button>
        <iframe
          title="TradingView Chart"
          src={`https://www.tradingview.com/widgetembed/?frameElementId=tradingview_xxx&symbol=BINANCE:BTCUSDT&interval=30&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=${theme}&style=1&timezone=Etc/UTC&withdateranges=1&hide_side_toolbar=0&allow_symbol_change=1&calendar=1&hotlist=1`}
          style={{ width: "100%", height: "100%", border: "none" }}
          allowFullScreen
        />
      </div>
    </Link>
  );
};

export default LiveChart;
