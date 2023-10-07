import React, { useContext } from 'react'
import { UserContext } from '../libs/UserContext';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';

function Expenses() {
    const { state, dispatch, isLoading, setIsLoading, darkMode} = useContext(UserContext);
    const {userInfo } = state;
  return (
    <div className={`${darkMode?'bg-[#1a202c] text-[#f0f0f0] max-h-full': ''}`}>
      {/* <p>{user.email}</p> */}
      <Sidebar home='home' darkMode={darkMode}/>
    </div>
  )
}

export default Expenses