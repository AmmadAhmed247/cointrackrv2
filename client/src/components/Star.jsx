import React, { useState } from 'react'

const Star= () => {
  const [open,setOpen]=useState(false)
  return (
    <button className='cursor-pointer' onClick={()=>setOpen(!open)  } >
      {open ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-yellow-400">
          <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782L19.335 24 12 19.897 4.665 24l1.401-8.998L.132 9.211l8.2-1.193z"/>
        </svg>
      ):(
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gray-400 hover:text-yellow-400 transition">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.955c.3.922-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.196-1.539-1.118l1.286-3.955a1 1 0 00-.364-1.118L2.075 9.383c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.951-.69l1.286-3.956z" />
        </svg>
      ) }
    </button>
  )
}

export default Star