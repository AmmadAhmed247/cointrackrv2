import React from 'react'
import CustomImage from "../components/customImage.jsx"
import Chart from "../components/Chart.jsx"
import { Link } from 'react-router-dom';
const SmallFourFeatured = () => {
    const data = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 100 },
        { name: 'Mar', value: 200 },
        { name: 'Apr', value: 900 },
        { name: 'May', value: 100 },
        { name: 'May', value: 100 },


    ];
    return (
        <div className=" xl:hidden rounded-2xl  flex-col p-4 gap-1  w-full ">
            <div className='w-full gap-2 grid-cols-4 grid  rounded-2xl'>
                <div className="bg-white h-42 flex  w-full shadow-2xl rounded-2xl">
                    <div className="flex w-full flex-col p-4 relative">
                        <div className="flex flex-row items-center ">
                            <Link to="/liquidation" className='text-xl font-semibold ' >Liquidation </Link>
                            <Link to="/liquidation"  >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 ml-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                        <span className='text-2xl font-semibold mt-2 w-full ' >669M</span>
                        <Chart data={data} />
                    </div>

                </div>
                <div className="bg-white h-42 flex shadow-2xl  rounded-2xl">
                    <div className="flex flex-col gap-1 w-full max-w-md mx-auto  p-4">
                        <Link className='text-xl font-semibold w-fit md:text-lg  flex  flex-row items-center ' >Altcoin Season <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4  h-4 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg></Link>
                        <div className="flex items-end text-3xl mb-3 font-bold">
                            <span className="text-gray-900 ">41</span>
                            <span className="text-gray-500  text-lg font-normal">/100</span>
                        </div>
                        <div className="hidden md:flex font-semibold justify-between">
                            <h6>Bitcoin</h6>
                            <h6>Altcoin</h6>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden flex relative mt-2 shadow">
                            <div className="bg-orange-500" style={{ width: '25%' }}></div>
                            <div className="bg-orange-200" style={{ width: '25%' }}></div>
                            <div className="bg-indigo-200" style={{ width: '25%' }}></div>
                            <div className="bg-blue-700" style={{ width: '25%' }}></div>
                            <div
                                className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 border-2 border-white rounded-full shadow-md"
                                style={{ left: '41%' }}
                            ></div>
                        </div>
                    </div>

                </div>
                
                <div className="bg-white h-42 flex shadow-2xl  w-full rounded-2xl">
                    <div className="flex w-full flex-col p-4 relative">
                        <div className="flex flex-row items-center ">
                            <Link to="/liquidation" className='text-xl whitespace-nowrap font-semibold ' >Market Cap </Link>
                            <Link to="/liquidation"  >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 ml-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>


                        <span className='text-2xl font-semibold mt-2 w-full ' >669M</span>

                        <Chart data={data} />
                    </div>

                </div>
                <div className="bg-white h-42 flex shadow-2xl  w-full rounded-2xl">
                    <div className="flex w-full flex-col p-4 relative">
                        <div className="flex flex-row items-center ">
                            <Link to="/liquidation" className='text-xl whitespace-nowrap font-semibold ' >Market Cap </Link>
                            <Link to="/liquidation"  >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 ml-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>


                        <span className='text-2xl font-semibold mt-2 w-full ' >669M</span>

                        <Chart data={data} />
                    </div>

                </div>
            </div>
            
        </div>
    )
}

export default SmallFourFeatured