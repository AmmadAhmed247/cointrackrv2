import React from 'react';
import Customimage from './customImage';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchDefiCoins = async () => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/coins/topdeficoins`);
  return res.data; 
};

const Defi = () => {
  const slug=useParams()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['deficoins'],
    queryFn: fetchDefiCoins,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  if (isLoading)
    return <div className="text-center text-gray-500">Loading Defi Coins...</div>;

  if (isError)
    return <div className="text-center text-red-500">Error fetching Defi Coins</div>;

  return (
    <div className="w-full h-full p-4 ml-4 rounded-2xl flex flex-col shadow-2xl mt-4">
      <Link
        to="/deficoins"
        className="text-zinc-900 font-semibold text-xl flex flex-row items-center mb-4"
      >
        Defi Coins
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </Link  >

      {data?.map((coins, index) => (
        <div
          key={coins.id}
          className="flex flex-row mb-5 items-center justify-between py-2"
        >
        
          
          <Link to={`/coins/${coins.id}`} className="flex flex-row items-center gap-3">
            <Link to={`/coins/${coins.id}`} className="text-zinc-900 font-semibold w-6 text-center">{index + 1}</Link>
            <Customimage src={coins.image} w={32} h={32} className="flex-shrink-0" />
            <span className="text-zinc-900 font-semibold">{coins.symbol.toUpperCase()}</span>
          </Link>

          <Link to={`/coins/${coins.id}`} className="flex flex-row items-center gap-4">
            <span className="text-zinc-900 font-semibold text-lg text-right min-w-[100px]">
              ${coins.current_price?.toLocaleString()}
            </span>
            <div className="min-w-[80px] flex justify-end">
              <span
                className={`rounded-2xl px-2 py-1 text-sm font-medium text-white ${
                  coins.price_change_percentage_24h_in_currency < 0
                    ? 'bg-red-400'
                    : 'bg-green-400'
                }`}
              >
                {coins.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          </Link>
        
        </div>
      ))}
    </div>
  );
};

export default Defi;