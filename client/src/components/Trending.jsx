import React from 'react';
import { Link } from 'react-router-dom';
import Customimage from "../components/customImage.jsx";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ResponsiveContainer, LineChart, Line, YAxis } from 'recharts';

const Trending = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["trendingCoins"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/coins/trending`);
      return res.data.coins; 
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
  if (isLoading) return <div className='text-black text-center'>Loading data...</div>;
  if (isError) return <div className='text-red-500 text-center'>Error fetching data</div>;
  if (!Array.isArray(data)) return <div className='text-red-500 text-center'>No valid data found</div>;
  return (
    <div className='h-100 px-2 w-fit p-4 ml-4 rounded-2xl flex flex-col  shadow-2xl mt-4'>
      <Link to="/trending" className='text-zinc-900 font-semibold text-lg flex flex-row items-center'>
        Trending Coins
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
      {data.map((coin, index) => {
        const sparkline = coin.sparkline || [];
        const formattedData = sparkline.map((value, idx) => ({ value, time: idx }));
        const isUp = sparkline.length > 1 && sparkline[sparkline.length - 1] > sparkline[0];
        const strokeColor = isUp ? '#16a34a' : '#dc2626'; 
        return (
          <div key={coin.id} className="flex flex-row mt-3  gap-2 justify-between">
            <div className="flex flex-row  items-center gap-3">
              <span className='text-zinc-900 font-semibold'>{index + 1}</span>
              <Customimage src={coin.image} w={32} h={32} />
              <div className="flex flex-col min-w-[120px]">
                <span className='text-zinc-900 w-fit  font-semibold'>{coin.name.split(" ")[0]}</span>
                <span className='text-xs text-gray-600 uppercase'>{coin.symbol}</span>
              </div>
            </div>
            <div className="flex flex-row  items-center gap-2">
              <span className='text-right font-semibold text-lg'>
                ${coin.current_price?.toLocaleString() || 'N/A'}
              </span>
              <div className='relative mb-4' style={{ width: 80, height: 40 }}>
                
                <span className={`absolute right-4 top-5 rounded-2xl  w-fit px-2 text-sm text-right ${coin.price_change_percentage_24h < 0 ? "bg-red-400" : "bg-green-400"} text-white`} >{coin.price_change_percentage_24h}%</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Trending;
