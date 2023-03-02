import React from 'react'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import axios from 'axios';
import fetch from 'isomorphic-unfetch';
import { config } from './apiConfig';
import Swal from 'sweetalert2';

function Token() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState('')
  const router = useRouter();
  const token = router.query.token
  const [loading, setLoading] = useState(false)

    const TokenToApp = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        if (password.length == 0){
            Swal.fire({
              title: 'Not Yet',
              text: 'Please enter a password',
              icon: 'warning',
            })
        }
        else {
          const response = await fetch(`${config.baseUrl}/reset_password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password, token})
        })
        const data = await response.json();
          if (data.success) {
            Swal.fire({
              title: 'Password updated',
              text: data.message,
              icon: 'success',
              // background: '#efe5ee',
              // showConfirmButton: true,
              // showCancelButton: true,
              // confirmButtonText: 'OK',
              // cancelButtonText: 'Cancel'
            }).then(() => {
              router.push('/')
            })
          } else {
            Swal.fire({
              title: 'Error',
              text: data.error,
              icon: 'error',
              // background: '#efe5ee',
            }).then(() => {
              router.push('forgetPassword')
            })
          }
        }

      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again later.'
        });
      } finally {
        setLoading(false);
      }
    }

  return (
    <>
    <div className='flex flex-col justify-center items-center font-light'>
    <div className='bg-white shadow-lg rounded-lg px-10 py-5 mt-28'>
          <form action="" className='flex flex-col gap-5 justify-center items-center mt-5'>
            {/* <div className='flex flex-col'>
              <label className='text-[#1E1E1E] text-sm mb-2 font-normal'>Token</label>
              <input value={Token}  onChange={(e) => setToken(e.target.value)} className='border px-2 border-[#1E1E1E] bg-white focus:outline-none rounded-sm text-sm h-8 w-60  py-[3px]' placeholder='Token' type="text" name="token" id="token" />
            </div> */}
            <div className='flex flex-col'>
              <label className='text-[#1E1E1E] text-sm mb-2 font-normal'>Password</label>
              <input value={password}  onChange={(e) => setPassword(e.target.value)} className='border px-2 border-[#1E1E1E] bg-white focus:outline-none rounded-sm text-sm h-8 w-60  py-[3px]' placeholder='Password' type="password" name="password" id="password" required />
            </div>
            <div>
              <button onClick={TokenToApp} disabled={loading} className='bg-[#EB741E] w-60 px-10 py-1 rounded-md button'>
                {loading ? <> <span className="spinner" /> Please wait... </> : 'Reset Password'}
              </button>
            </div>
            <div className='text-sm'>
                <span className='text-[#2F71AD] cursor-pointer text-sm' id='reset' onClick={() => router.push('/forgetPassword')}>Regenerate Token</span>
              </div>
          </form>
      </div>
  </div>
  </>

  )
}

export default Token
