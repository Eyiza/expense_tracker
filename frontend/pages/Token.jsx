import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'

function Token() {
    
  const [Token, setToken] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();
  return (
    <div className='flex flex-col justify-center items-center font-light'>
    <div className='bg-white shadow-lg rounded-lg px-10 py-5 mt-28'>
          <form action="" className='flex flex-col gap-5 justify-center items-center mt-5'>
            <div className='flex flex-col'>
              <label className='text-[#1E1E1E] text-sm mb-2 font-normal'>Token</label>
              <input value={Token}  onChange={(e) => setToken(e.target.value)} className='border px-2 border-[#1E1E1E] bg-white focus:outline-none rounded-sm text-sm h-8 w-60  py-[3px]' placeholder='Token' type="text" name="token" id="token" />
            </div>
            <div className='flex flex-col'>
              <label className='text-[#1E1E1E] text-sm mb-2 font-normal'>Password</label>
              <input value={password}  onChange={(e) => setPassword(e.target.value)} className='border px-2 border-[#1E1E1E] bg-white focus:outline-none rounded-sm text-sm h-8 w-60  py-[3px]' placeholder='Password' type="password" name="password" id="password" />
            </div>
            <div>
              <button type="submit" className='bg-[#EB741E] w-60 px-10 py-1 rounded-md'>Reset Password</button>
            </div>
            <div className='text-sm'>
                <span className='text-[#2F71AD] cursor-pointer text-sm' onClick={() => router.push('/forgetPassword')}>Regenerate Token</span>
              </div>
          </form>
      </div>
  </div>
  )
}

export default Token
