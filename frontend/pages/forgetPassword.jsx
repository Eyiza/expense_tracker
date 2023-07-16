import Cookies from 'js-cookie';
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from '../apiConfig';
import Swal from 'sweetalert2';


function forgetPassword() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const ForgetToApp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (email.length == 0) {
        Swal.fire('Not Yet', 'Email is required', 'warning')
      }
      else {
        const response = await axios.post(`/forgot_password`, {
          email
        });
      const data = await response.json();
        if (data.success) {
          setEmail('')
          router.push('mailsent')
        } else {
          Swal.fire('Error', data.error, 'error')
        }
      }

    } catch (error) {
      console.error(error);
      Swal.fire('Oops', 'Something went wrong! Please try again later.', 'error')
    } finally {
      setLoading(false);
    }
  }

  
  return (
    <div className='flex flex-col justify-center items-center font-light'>
      <div className='bg-white shadow-lg rounded-lg px-10 py-5 mt-28'>
            <form action="" className='flex flex-col gap-5 justify-center items-center mt-5'>
              <h1 className='text-[#1E1E1E] text-lg font-bold text-center'>FORGOT PASSWORD</h1>
                {/* <p className='text-center'>Enter the email address you used to register.</p> */}
              <div className='flex flex-col'>
                <label className='text-[#1E1E1E] text-sm mb-2 font-normal'>Email</label>
                <input value={email}  onChange={(e) => setEmail(e.target.value)} className='border px-2 border-[#1E1E1E] bg-white focus:outline-none rounded-sm text-sm h-8 w-60  py-[3px]' placeholder='Enter the email used to register' type="email" name="email" id="email" required />
              </div>
              <div>
                <button type="submit" onClick={ForgetToApp} disabled={loading} className='bg-[#EB741E] w-60 px-10 py-1 rounded-md button'>
                  {loading ? <> <span className="spinner" /> Please wait... </> : 'Send Link'}
                </button>
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
