import React from 'react'
import Customimage from "./customImage"
import { Link } from 'react-router-dom'
import MiniCryptoChart from './Chart'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
const Dexscan = () => {
  const{data,isLoading,isError}=useQuery({
    queryKey:["dexCoins"],
    queryFn:async()=>{
      const res=await axios.get(`${import.meta.env.VITE_BACKEND}/api/coins/dexcoins`)
      return res.data.coins;
    },
    staleTime:1000*60*5,
    retry:1,
  })
   if (isLoading) return <div>Loading...</div>
if (isError) return <div>Error fetching DEX coins</div>

  return (
    <div className='w-fit h-100 px-2 p-4 ml-4 rounded-2xl flex flex-col shadow-2xl mt-4 '>
      <Link to="/dexcoins" className='text-zinc-900 font-semibold text-xl flex flex-row items-center' >Dex Coins <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
      </Link>
      {data.map((coin,index)=>(

      
       <div className="flex flex-row mt-4 gap-8 mb-5.5 justify-between">
        <div className="flex flex-row  items-center gap-5">
          <span className='text-zinc-900 font-semibold' >{index+1}</span>
          <Customimage src={coin.logo} w={32} h={32} />
          <span className='text-zinc-900 font-semibold' >{coin.symbol}</span>
        </div>
       <div className="flex flex-row items-center gap-4">
            <span className="text-zinc-900 font-semibold text-lg text-right min-w-[100px]">
              ${coin.price?.toLocaleString()}
            </span>
            <div className="min-w-[80px] flex justify-end">
              <span
                className={`rounded-2xl px-2 py-1 text-sm font-medium text-white ${
                  coin.price_change < 0
                    ? 'bg-red-400'
                    : 'bg-green-400'
                }`}
              >
                {coin.price_change?.toFixed(2)}%
              </span>
            </div>
          </div>
      </div>))}
      
     
     
     
      

    </div>
  )
}

export default Dexscan