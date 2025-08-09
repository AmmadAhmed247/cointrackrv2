import React, { useState } from 'react'
import TopBar from '../components/TopBar'
import Trending from "../components/Trending.jsx"
import Defi from "../components/Defi.jsx"
import TopGainers from '../components/TopGainers.jsx'
import SmallFourFeatured from "../components/SmallFourFeatured.jsx"
import Dexscan from '../components/dexScan.jsx'
import TopLoser from "../components/toplooser.jsx"
import CoinSection from '../components/coinSection.jsx'
import CoinData from '../components/coinData.jsx'
const mainpage = () => {
  const[open,setopen]=useState(false)
  return (
    <div className="flex flex-col w-full overflow-x-auto">
      <TopBar />
      <div className="hidden xl:flex flex-row ">
        
      <Trending />
      <TopGainers />
      <TopLoser />
      <Defi />
      <Dexscan /> 
    </div>
    <div className="">
      <SmallFourFeatured /> 
    </div>
      <CoinSection />
      <CoinData />
      
      </div>
  )
}

export default mainpage