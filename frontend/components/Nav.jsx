import React from 'react'

function Nav({darkMode}) {
  return (
    
    <div className={` ${darkMode?'bg-[#1a202c] text-white': 'bg-white text-black'} flex items-center  justify-center px-10 h-20 shadow-lg border-b border-gray-300`}>
      <h1 className='font-bold text-3xl'> Expense Tracker</h1>
      
    </div>
  )
}

export default Nav
