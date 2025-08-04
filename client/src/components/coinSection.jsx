import React from 'react'

const coinSection = () => {
  return (
    <div className='h-16 border-2 border-zinc-100 items-center flex px-18 py-4 bg-white rounded-xl mt-4' >
        <div className="flex items-center flex-row">
            <div className="flex gap-12  min-w-60 xl:min-w-90 ">
            <span className='text-xl font-semibold' >#</span>
            <span className='text-xl font-semibold' >Name</span>
            </div>
            <div className=" flex text-right flex-row items-center min-w-120 whitespace-nowrap xl:min-w-120  text-lg   gap-20 font-semibold ">
                <span className='text-right' >Price</span>
                <span className='text-right' >1h %</span>
                <span className='text-right' >24h %</span>
                <span className='text-right' >7d %</span>
            </div>
            <div className="flex text-right flex-row gap-20 pl-20 text-lg min-w-90 whitespace-nowrap xl:min-w-150  font-semibold ">
                <span className='text-right'>Market Cap</span>
                <span className='text-right'>Volume(24h)</span>
                <span className='text-right'> Circulating Supply</span>
            </div>
            <div className="flex w-full justify-end min-w-40 whitespace-nowrap   font-semibold flex-row items-center">
                <span>Last 7 Days</span>
            </div>
        </div>

    </div>
  )
}

export default coinSection