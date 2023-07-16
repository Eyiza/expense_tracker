import React, { useContext } from 'react'
import Switch from './Switch'

import { useRouter } from 'next/router'
import axios from '../apiConfig';
import Swal from 'sweetalert2';
import { UserContext } from '../libs/UserContext';
import Cookies from 'js-cookie';


function Settings() {
  const { state, dispatch } = useContext(UserContext);
    const {userInfo } = state;
  const router = useRouter();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get(`/logout`);
      dispatch({ type: 'USER_LOGOUT' });
      Cookies.remove('userInfo');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  } 
  return (
    <div className='flex flex-col items-center justify-center mx-10 mt-10'>
       <div className='flex items-start justify-between gap-20 mb-10'>
                 <p className='text-4xl font-bold text-secondary'>Settings</p>
        </div>
        <div className='flex flex-row items-center justify-center gap-40'>
            <div className=''>
                <div>
              <div className='transition-transform duration-200 ease-in'>
              <form action="" className='flex flex-col items-center justify-center gap-10'>
                  <div className='flex flex-row items-center gap-10 justify-around'>
                    
                      <input type="text" name="name" placeholder='Name' id="name" className='border outline-none px-4 py-2 rounded-lg'/>
                  </div> 
                  <div className='flex flex-row items-center gap-10 justify-around'>
                      
                      <input type="text" name="username" placeholder='Username' id="username" className='border outline-none px-4 py-2 rounded-lg'/>
                  </div> 
                  <div className='flex flex-row items-center gap-10 justify-around'>
                     
                      <input type="email" name="email" id="email" placeholder='Email' className='border outline-none px-4 py-2 rounded-lg'/>
                  </div> 
                  
                  <div className='text-center my-5'>
                      <button className='px-20 py-2 bg-primary rounded-lg text-white font-medium' type="submit">Update</button>
                  </div>
                  
              </form>
          </div>
          </div>
        </div>
          <div className='h-[300px] border'></div>
          <div className='flex flex-col items-center gap-20'>
            <div className='flex items-center justify-center gap-5'>
              <span className='text-lg font-medium'> Dark Mode</span>
              <Switch/>
            </div>
            <div>
              <button onClick={handleLogout} className='px-20 py-2 bg-secondary rounded-lg text-white cursor-pointer font-medium'>Logout</button>
            </div>
     
          </div>
        </div>

    </div>
  )
}

export default Settings
