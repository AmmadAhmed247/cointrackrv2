import React from 'react'
import Customimage from "../components/customImage"
import { ResponsiveContainer, Line, LineChart, YAxis } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import axios from "axios"
import { Link } from 'react-router-dom';
import Star from './star';
const coinData = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["coinsData"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/coins`)
      return res.data
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  })
  if (isLoading) return <div className='text-black text-center' >Data is Loading</div>
  if (isError) return <div className='text-red-500 text-center' >Error while fetching Data...</div>

  return (
    <>
      {data.map((coin, index) => (
        <div key={coin.id} className='h-16 border-b-2 border-zinc-100 items-center text-md flex px-18 py-4 bg-white rounded-xl mt-4' >
          <div className="flex items-center flex-row">
            <div className="flex gap-12 items-center   min-w-60 xl:min-w-90 ">
              <Link to={`/coins/${coin.id}`} className='text-xl font-semibold' >{index + 1}</Link>
              <Star  />
              <div className="flex flex-row gap-2 items-center">

                <Customimage src={coin.image} w={32} h={32} />
                <Link to={`/coins/${coin.id}`} className='text-md text-right   font-semibold' >{coin.name}</Link>
              </div>
            </div>
            <div className="flex items-center min-w-120 xl:min-w-120 text-md font-semibold whitespace-nowrap gap-8">
              <Link to={`/coins/${coin.id}`} className="w-20 text-right text-xl  text-zinc-800">{coin.current_price.toLocaleString()}</Link>
              <Link to={`/coins/${coin.id}`} className={`w-20 text-right ${coin.price_change_percentage_1h_in_currency < 0 ? "text-red-500" : "text-green-500"}`}>
                {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
              </Link>
              <Link to={`/coins/${coin.id}`} className={`w-20 text-right ${coin.price_change_percentage_24h_in_currency < 0 ? "text-red-500" : "text-green-500"}`}>
                {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
              </Link>
              <Link to={`/coins/${coin.id}`} className={`w-20 text-right ${coin.price_change_percentage_7d_in_currency < 0 ? "text-red-500" : "text-green-500"}`}>
                {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
              </Link>
            </div>

            <div className="flex flex-row text-right gap-15 pl-20 text-md  whitespace-nowrap   font-semibold ">
              <Link to={`/coins/${coin.id}`} className='text-right w-30 ' >{coin.market_cap.toLocaleString()}</Link>
              <Link to={`/coins/${coin.id}`} className='text-right w-30 ' >{coin.total_volume.toLocaleString()}</Link>
              <Link to={`/coins/${coin.id}`} className='text-right w-30 ' >{coin.circulating_supply.toLocaleString()}</Link>
            </div>
            <Link to={`/coins/${coin.id}`} >
              <div className="md:pl-20 xl:pl-20 justify-center ml-20">
                <div className="w-[220px] h-[50px] overflow-hidden ">

                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={coin.sparkline_in_7d.price.map((value, index) => ({ time: index, value }))}>
                      <YAxis type="number" domain={['dataMin - 1', 'dataMax + 1']} hide />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={coin.sparkline_in_7d.price[0] < coin.sparkline_in_7d.price.at(-1) ? '#4ade80' : '#f87171'}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Link>
          </div>

        </div>))}
    </>
  )
}

export default coinData