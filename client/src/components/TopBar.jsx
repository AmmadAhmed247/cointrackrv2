import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function formatNumber(num) {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(2) + 'T';
  } else if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'B';
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M';
  } else {
    return num.toLocaleString(); 
  }
}



const TopBar = () => {
  const [open, setopen] = useState(false)
  const [fearData, setFearData] = useState("")
  const { data, isLoading, isError } = useQuery({
    queryKey: ['topbar'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/coins/topbar`)
      return res.data;
    },
    retry:1,
  })
  useEffect(() => {
  const fetchFearGreed = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/coins/feargreedvalue`);
      setFearData(res.data);
    } catch (error) {
      console.error("Error fetching Fear & Greed Index:", error);
    }
  };

  fetchFearGreed();
}, []);


  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading top bar data</div>

  return (
    <div className="justify-between border-b-2 border-zinc-100 flex">
      <div className="h-14 flex items-center flex-row gap-4 px-2">
        <h6 className="text-zinc-600 whitespace-nowrap font-semibold">
          Cryptos: <span className="text-blue-600 font-semibold">{data.totalCryptocurrencies}</span>
        </h6>
        <h6 className="text-zinc-600 whitespace-nowrap font-semibold">
          Exchanges: <span className="text-blue-600 font-semibold">{data.totalExchanges}</span>
        </h6>
        <h6 className="text-zinc-600 whitespace-nowrap font-semibold">
          Market Cap: <span className="text-blue-600 font-semibold">{formatNumber(data.marketCap)}</span>
        </h6>
        <h6 className="text-zinc-600 whitespace-nowrap font-semibold">
          Dominance:{' '}
          <span className="text-blue-600 font-semibold">
            BTC: {data.btcDominance.toFixed(2)} ETH: {data.ethDominance.toFixed(2)}
          </span> 
        </h6>
        <h6 className="text-zinc-600 whitespace-nowrap font-semibold">
          Fear & Greed: <span className="text-blue-600 font-semibold">{fearData.value}/100</span>
        </h6>
      </div>

      <div className="flex items-center px-10 relative">
        <button
          className="px-4 h-10 font-semibold bg-zinc-100 whitespace-nowrap rounded-xl"
          onClick={() => setopen(!open)}
        >
          Get Started
        </button>
        {open && (
          <div className="absolute top-16 shadow-2xl bg-white rounded-md gap-4 flex flex-col">
            <Link className="px-4 font-semibold text-lg rounded-md py-3 hover:bg-zinc-100">
              Cryptocurrency
            </Link>
            <Link className="px-4 font-semibold text-lg rounded-md py-3 hover:bg-zinc-100">
              Exchange
            </Link>
            <Link className="px-4 font-semibold text-lg rounded-md py-3 hover:bg-zinc-100">
              Page updates
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopBar
