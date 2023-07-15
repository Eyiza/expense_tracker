import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';
import Expense from './Expense/Expense';
import Income from './Income/Income';

function Sidebar({home}) {
    const router = useRouter();

  // Use state to keep track of which subpage is currently active
  const [activeSubpage, setActiveSubpage] = useState(home);

  // Use conditional rendering to show the appropriate subpage
  let subpageContent;
  switch (activeSubpage) {
    case "home":
      subpageContent = <Home />;
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
    <div className='flex sticky top-20'>
        <div className='px-5 lg:px-20 flex flex-col items-start gap-10 py-10 h-[100vh] lg:w-[300px] w-[140px] md relative bg-white shadow-lg'>
        <button onClick={() => setActiveSubpage("home")} className={`${activeSubpage=='home'? 'border-b-2 border-primary transition-transform duration-150 ease-in-out ': ''}`}>Home</button>
        <button onClick={() => setActiveSubpage("Expense")} className={`${activeSubpage=='Expense'? 'border-b-2 border-primary transition-transform duration-150 ease-in-out': ''}`}>Expense</button>
        <button onClick={() => setActiveSubpage("Income")} className={`${activeSubpage=='Income'? 'border-b-2 border-primary transition-transform duration-150 ease-in-out': ''}`} >Income</button>
        <button onClick={() => setActiveSubpage("settings")} className={`${activeSubpage=='settings'? 'border-b-2 border-primary transition-transform duration-150 ease-in-out': ''}`}  >Settings</button>
        </div>
        <div className='flex-1'>
            {subpageContent}
        </div>
        

    </div>
  )
}

export default Sidebar
