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
  const [loading, setLoading] = useState(false)
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

  const updateUser = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        if (name.length == 0){
          // setEmailErrorMessage('Please enter your email')
          Swal.fire('Not Yet', 'All fields are required', 'warning')
        }
        else {
          const response = await axios.patch(`/user`, {
            name
          });
          if (response.data.success) {
            Swal.fire('', 'User Updated', 'success')
            .then(() => {                
                router.push('/Dashboard')
            })
          } else {
            Swal.fire('Error', response.data.error, 'warning')
          }
        }

      } catch (error) {
        console.error(error);
        if (!error.response) {
          Swal.fire('Oops', 'Something went wrong! Please try again later.', 'error');
        }
        else {
          Swal.fire('Error', error.response.data.error, 'warning')
        }        
      } finally {
        setLoading(false);
      }
    }
    
    const deleteUser = async (e) => {
      e.preventDefault();
      Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2F71AD',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete my account!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setLoading(true);
            const response = await axios.delete(`/user`);
            if (response.data.success) {
              Swal.fire('', 'Account Deleted', 'success').then(() => {
                router.push('/');
              });
            } else {
              Swal.fire('Error', response.data.error, 'warning');
            }
          } catch (error) {
            console.error(error);
            Swal.fire('Oops', 'Something went wrong! Please try again later.', 'error');
          } finally {
            setLoading(false);
          }
        }
      });
    };

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
                      {/* <button className='px-20 py-2 bg-primary rounded-lg text-white font-medium' type="submit">Update</button> */}
                      <button type="submit" onClick={updateUser} disabled={loading} className='px-20 py-2 bg-primary rounded-lg text-white font-medium button'>
                        {loading ? <> <span className="spinner" /> Please wait... </> : 'Update'}
                      </button>
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
              {/* <button onClick={handleLogout} className='px-20 py-2 bg-red-600 rounded-lg text-white cursor-pointer font-medium'>Deactivate</button> */}
              <button type="submit" onClick={deleteUser} disabled={loading} className='px-20 py-2 bg-red-600 rounded-lg text-white cursor-pointer font-medium button'>
                {loading ? <> <span className="spinner" /> Please wait... </> : 'Delete Account'}
              </button>
            </div>
            
     
          </div>
        </div>

    </div>
  )
}

export default Settings
