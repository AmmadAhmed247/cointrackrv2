import React from 'react'
const Search = ({placeholder}) => {
  return (
    <div className='h-10 bg-white w-60 rounded-xl flex flex-row items-center gap-2 pl-2 ' >
      <svg xmlns="http://www.w3.org/2000/svg" 
     fill="none" 
     viewBox="0 0 24 24" 
     strokeWidth="1.5" 
     stroke="currentColor" 
     className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" 
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
</svg>
      <input type="text" className='outline-none' placeholder={placeholder} />
    </div>
  )
}

export default Search