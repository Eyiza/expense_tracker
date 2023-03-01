import Cookies from 'js-cookie';
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import fetch from 'isomorphic-unfetch';
import { config } from './apiConfig';



function forgetPassword() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter();
  const ForgetToApp = async (e) => {
    e.preventDefault()
    if (email.length == 0){
      alert('please enter your email')
    }
    else{
      // router.push('Token')
      const response = await fetch(`${config.baseUrl}/forgot_password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    })

    const data = await response.json();
      if (data.success) {
        setEmail('')
        alert(data.message)
      } else {
        console.log(data.error)
        alert(data.error)
      }
    }

    // try {
    //   // Send request to Flask backend
    //   const response = await axios.post('http://localhost:5000/forgot_password', { email })

    //   // If request is successful, display success message
    //   setMessage(response.data.message)
    //   setError('')
    // } catch (error) {
    //   // If request fails, display error message
    //   setMessage('')
    //   setError(error.response.data.error)
    // }
     

  }
  return (
    <div className='flex flex-col justify-center items-center font-light'>
      <div className='bg-white shadow-lg rounded-lg px-10 py-5 mt-28'>
            <form action="" className='flex flex-col gap-5 justify-center items-center mt-5'>
              <div className='flex flex-col'>
                <label className='text-[#1E1E1E] text-sm mb-2 font-normal'>Email</label>
                <input value={email}  onChange={(e) => setEmail(e.target.value)} className='border px-2 border-[#1E1E1E] bg-white focus:outline-none rounded-sm text-sm h-8 w-60  py-[3px]' placeholder='Enter your email' type="email" name="email" id="email" required />
              </div>
              <div>
                <button type="submit" onClick={ForgetToApp} className='bg-[#EB741E] w-60 px-10 py-1 rounded-md'>Reset Password</button>
              </div>
              <div className='text-sm'>
                <p>Back to <span className='text-[#2F71AD] cursor-pointer text-sm' onClick={() => router.push('/')}>Sign in</span></p>
              </div>
            </form>
        </div>
    </div>
  )
}

export default forgetPassword
