import React, { useContext, useState } from 'react'
import Switch from './Switch'

import { useRouter } from 'next/router'
import axios from '../apiConfig';
import Swal from 'sweetalert2';
import { UserContext } from '../libs/UserContext';
import Cookies from 'js-cookie';
import CustomSelect from './CustomSelect';


function Settings() {
  const { state, dispatch, isLoading, setIsLoading, darkMode} = useContext(UserContext);
  const {userInfo } = state;
  const defaultValue = 'NGN';
  const currencies = ['NGN', 'USD', 'EUR', 'GBP', 'JPY', 'CAD' ];

  const [name, setName] = useState(userInfo?.username)
    const [email, setEmail] = useState(userInfo?.email)
    const [selectedOption, setSelectedOption] = useState(defaultValue);
   
  
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
                    
                      <input type="text" name="username" placeholder='Username' id="username" value={name} onChange={(e) => setName(e.target.value)} className='border placeholder:text-black text-black outline-none px-4 py-2 rounded-lg'/>
                  </div> 
                  <div className='flex flex-row items-center gap-10 justify-around'>
                     
                      <input type="email" name="email" id="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}  className='border placeholder:text-black text-black outline-none px-4 py-2 rounded-lg'/>
                  </div> 
                  
                  <div className='text-center my-5'>
                      <button className='px-20 py-2 bg-primary rounded-lg text-white font-medium' type="submit">Update</button>
                  </div>
                  
              </form>
          </div>
          </div>
        </div>
          <div className='h-72 border'></div>
          <div className='flex flex-col items-start gap-12'>
            <div className='flex items-center justify-center gap-5'>
              <span className='text-lg font-medium'> Dark Mode</span>
              <Switch/>
            </div>
            <div>
              <h6 className='text-lg font-medium mb-5'>Currency</h6>
              <CustomSelect darkMode={darkMode} defaultValue={defaultValue} options={currencies} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            </div>
            <div>
              <button onClick={handleLogout} className='px-20 py-2 bg-secondary rounded-lg text-white cursor-pointer font-medium'>Logout</button>
            </div>
            
            <div>
              <button onClick={handleLogout} className='px-20 py-2 bg-red-600 rounded-lg text-white cursor-pointer font-medium'>Deactivate</button>
            </div>
            
     
          </div>
        </div>

    </div>
  )
}

export default Settings
