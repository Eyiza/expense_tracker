import React from 'react'

function forgetPassword() {
  return (
    <div className='flex flex-col justify-center items-center font-light'>
      <div className='bg-white shadow-lg rounded-lg px-10 py-10 mt-28'>
            <form action="" className='flex flex-col gap-5 justify-center items-center mt-5'>
              <div className='flex flex-col'>
                <label className='text-[#1E1E1E] text-lg mb-2 font-normal'>Email</label>
                <input className='border border-black bg-white focus:outline-none rounded-sm text-sm h-8 w-60 px-1 py-[3px]' placeholder='Enter your email' type="email" name="email" id="email" />
              </div>
              <div>
                <button type="submit" className='bg-[#EB741E] w-60 px-10 py-1 rounded-md'>Reset Password</button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default forgetPassword
