import React from 'react'

function ResetPasswordSent() {
  return (
    <div className='flex flex-col justify-center items-center font-light'>
      <div className='bg-white shadow-lg rounded-lg px-10 py-5 mt-28'>
        <h1 className='text-[#1E1E1E] text-sm mb-4 font-bold text-center'>Reset Password Link Sent</h1>
        <p>A password reset link has been sent to your email address.</p>
        <p>Please follow the instructions in the email to reset your password.</p>
        <p>Check your spam folder as well.</p>
      </div>
    </div>
  )
}

export default ResetPasswordSent
