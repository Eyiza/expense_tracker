import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';
import Expense from './Expense/Expense';
import Income from './Income/Income';
import { UserContext } from '../libs/UserContext';
import Link from 'next/link';
import Nav from './Nav';

function Sidebar({home, user, darkMode}) {
  const { activeSubpage, setActiveSubpage} = useContext(UserContext);
    const router = useRouter();
  
  // Use state to keep track of which subpage is currently active


  // Use conditional rendering to show the appropriate subpage
  let subpageContent;
  switch (activeSubpage) {
    case "home":
      subpageContent = <Home user={user}/>;
      break;
    // case "profile":
    //   subpageContent = <Profile />;
    //   break;
    case "settings":
      subpageContent = <Settings />;
      break;
      case "Expense":
      subpageContent = <Expense />;
      break;
      case "Income":
      subpageContent = <Income />;
      break;
    default:
      subpageContent = <Home />;
  }
 
 

  return (
    <div className={`flex `}>
        <div className={`z-50 sticky top-0 px-5 lg:px-20 flex flex-col items-start gap-10 py-10 h-[100vh]  shadow-lg ${darkMode?'bg-[#1a202c] text-[#f0f0f0]': 'bg-white text-black'}`}>

          <Link href={`/Dashboard`}>
            <button onClick={() => setActiveSubpage("home")} className={`${activeSubpage=='home'? 'border-b-2 border-primary transition-transform duration-150 ease-in-out ': ''}`}>Home</button>
          </Link>
       
        <Link href='/Expenses'>
          <button onClick={() => setActiveSubpage("Expense")} className={`${activeSubpage=='Expense'? 'border-b-2 border-primary transition-transform duration-150 ease-in-out': ''}`}>Expense</button>
        
        </Link>
        {/* <button onClick={() => setActiveSubpage("Expense")} className={`${activeSubpage=='Expense'? 'border-b-2 border-primary transition-transform duration-150 ease-in-out': ''}`}>Expense</button> */}
        <button onClick={() => setActiveSubpage("Income")} className={`${activeSubpage=='Income'? 'border-b-2 border-primary transition-transform duration-150 ease-in-out': ''}`} >Income</button>
        <button onClick={() => setActiveSubpage("settings")} className={`${activeSubpage=='settings'? 'border-b-2 border-primary transition-transform duration-150 ease-in-out': ''}`}  >Settings</button>
        </div>
        <div className='flex-1 overflow-x-hidden'>
          <Nav darkMode={darkMode}/>
          <div className=''>{subpageContent}</div>
            
        </div>
        

    </div>
  )
}

export default Sidebar
