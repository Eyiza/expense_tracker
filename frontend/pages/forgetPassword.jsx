import React from 'react'
import { useState } from 'react'

function forgetPassword() {
  const [bar, setBar] = useState(false)
  const [email, setEmail] = useState("")
  const message = () => (
    <div className='text-sm text-center'>
      <p>If email is valid a mail will be sent to it.</p>
    </div>
  )
  const ForgetToApp = (e) => {
    e.preventDefault()
    if (email.length == 0){
      alert('please enter your email')
    }
    else{
      setBar(true)
      setEmail('')
    }
    

  }
  return (
    <div className='flex flex-col justify-center items-center font-light'>
      <div className='bg-white shadow-lg rounded-lg px-10 py-10 mt-28'>
            <form action="" className='flex flex-col gap-5 justify-center items-center mt-5'>
              <div className='flex flex-col'>
                <label className='text-[#1E1E1E] text-lg mb-2 font-normal'>Email</label>
                <input value={email}  onChange={(e) => setEmail(e.target.value)} className='border border-black bg-white focus:outline-none rounded-sm text-sm h-8 w-60 px-1 py-[3px]' placeholder='Enter your email' type="email" name="email" id="email" />
              </div>
              {bar ? message() : ''}
              <div>
                <button type="submit" onClick={ForgetToApp} className='bg-[#EB741E] w-60 px-10 py-1 rounded-md'>Reset Password</button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default forgetPassword
