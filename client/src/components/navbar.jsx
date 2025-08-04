import React, { useState } from 'react'
import CustomImage from "./customImage.jsx"
import { Link, useNavigate } from 'react-router-dom'
import Search from "./Search.jsx"
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query'
import axios from "axios"
const Navbar = ({onLoginClick}) => {
  const navigate = useNavigate();
  const[open,setOpen]=useState(false)
  const queryClient = useQueryClient();
  const{mutate:logout}=useMutation({
    mutationFn:async()=>{
      return axios.get(`${import.meta.env.VITE_BACKEND}/api/user/signout`,{
        withCredentials:true,
      })
    },
    onSuccess:()=>{
      queryClient.removeQueries(["userinfo"]);
      navigate("/")
    }
  })
  
  const{data}=useQuery({
    queryKey:["userinfo"],
    queryFn:async()=>{
      const response=await axios.get(`${import.meta.env.VITE_BACKEND}/api/user/protected`,{
        withCredentials:true
      })
      
      
      return response.data
    }
  })
  return (
    <div className="relative">

    <div className='h-20 bg-blue-500 w-full flex items-center justify-between px-4'>
      <div className=" flex-row hidden xl:flex items-center gap-4">
        <Link className='flex flex-row items-center text-2xl text-white font-semibold' to="/" >
          <CustomImage src="coinTrackr.png" alt="Logo" w={80} h={80} className="" />
          CoinTrackr
        </Link>
        <Link className='text-lg text-white font-semibold hover:scale-105 transition-all whitespace-nowrap' to="/" >Cryptocurrencies</Link>
        <Link className='text-lg whitespace-nowrap text-white font-semibold hover:scale-105 transition-all' to="/liquidation" >Liquidation </Link>
        <Link className='text-lg text-white font-semibold hover:scale-105 transition-all' to="/news" >News</Link>
        <Link className='text-lg text-white font-semibold hover:scale-105 transition-all' to="/livechart" >Live Chart</Link>
      </div>
      <div className="flex-row hidden xl:flex items-center gap-4">
        <Link className='text-lg text-white font-semibold hover:scale-105 transition-all' to="/portfolio" >Portfolio</Link>
        <Link className='text-lg text-white font-semibold hover:scale-105 transition-all' to="/watchlist" >WatchList</Link>
        <Search placeholder={"Search"} />
        {data?.user ? (
  <>
    <button
    onClick={logout}
    className="text-lg px-3 py-1 font-semibold hover:scale-105 transition-all bg-amber-50 rounded-2xl text-zinc-600"
  >
    Signout
  </button>
    <CustomImage
      src={data.user.image || "default"}
      alt="userlogo"
      w={32}
      h={32}
      className="rounded-full"
    />
  </>
) : (
  <button
    onClick={onLoginClick}
    className="text-lg px-3 py-1 font-semibold hover:scale-105 transition-all bg-amber-50 rounded-2xl text-zinc-600"
  >
    Login
  </button>
  
)}

      </div>
      <div className="xl:hidden flex flex-row w-full justify-between items-center gap-6">
        <Link className='flex flex-row items-center text-2xl text-white font-semibold' to="/" >
          <CustomImage src="coinTrackr.png" alt="Logo" w={80} h={80} className="" />
          CoinTrackr
        </Link>
        <div className="flex flex-row items-center gap-2">
          
        <Search />
        <button className='text-2xl w-8 text-white font-semibold' onClick={()=>setOpen(!open)} >
        {open ? "X" : "☰"} 
       
        </button>
        </div>
       </div>
       {open && ( <div className='flex xl:hidden flex-col w-full z-50 min-h-screen top-34 absolute  gap-6 border-none rounded-2xl px-4 py-4 bg-white ' >
         <Link to="/crypto" className="text-xl font-medium w-full hover:bg-zinc-100 px-4 py-4 rounded-2xl ">Cryptocurrencies</Link>
          <Link to="/liquidation" className="text-xl font-medium w-full hover:bg-zinc-100 px-4 py-4 rounded-2xl ">Liquidation Heatmap</Link>
          <Link to="/news" className="text-xl font-medium w-full hover:bg-zinc-100 px-4 py-4 rounded-2xl ">News</Link>
          <Link to="/community" className="text-xl font-medium w-full hover:bg-zinc-100 px-4 py-4 rounded-2xl ">Community</Link>
          <button className='text-white font-semibold bg-blue-500 px-2 py-3  rounded-md' >Login</button>
          <button className='text-white bg-blue-500 font-semibold px-2 py-3  rounded-md' >SignUp</button>
       </div> )}
    </div>
    </div>
   )
}

export default Navbar