import React from 'react'
import {AiOutlineEye} from 'react-icons/ai'
import { useState } from 'react'
import { useRouter } from 'next/router'

function register() {
  const [inputType, setInputType] = useState('password');
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const router = useRouter();
  const toggleInput = ()=>{
    setInputType(inputType === 'password' ? 'text': 'password')
      }
    const registerToApp = (e) => {
      e.preventDefault()
      if (name.length == 0){
        alert('Please enter a name')
      }
      else if (email.length == 0){
        alert('Please enter an email')
      }
      else if (password.length == 0){
        alert('please enter a password')
      }
      else {
        console.log(name, email, password)
        setName('')
        setEmail('')
        setpassword('')
      }
    }
  return (
    <div className='flex flex-col justify-center items-center font-light'>
      <div className='bg-white shadow-lg rounded-lg px-10 pb-10 mt-28'>
            <form action="" className='flex flex-col gap-5 justify-center items-center mt-5'>
            <div className='flex flex-col'>
                <label className='text-[#1E1E1E] text-lg mb-2 font-normal'>Full Name</label>
                <input value={name}  onChange={(e) => setName(e.target.value)}  placeholder='Dee Joe' className='border border-black bg-white focus:outline-none rounded-sm text-sm h-8 w-60 px-1 py-[3px]' type="text" name="fullName" id="fullName" />
              </div>
              <div className='flex flex-col'>
                <label className='text-[#1E1E1E] text-lg mb-2 font-normal'>Email</label>
                <input  value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Joe@gmail.com' className='border border-black bg-white focus:outline-none rounded-sm text-sm h-8 w-60 px-1 py-[3px]' type="email" name="email" id="email" />
              </div>
              <div className='flex flex-col'>
                <label className='text-[#1E1E1E] text-lg mb-2 font-normal'>Password</label>
                <div className='flex items-center relative'>
                <input value={password}  onChange={(e) => setpassword(e.target.value)} className='border border-black bg-white focus:outline-none rounded-sm px-1 h-8 w-60 text-sm py-[3px]' type={inputType} name="password" id="password" />
                 <AiOutlineEye className='cursor-pointer text-[24px] absolute -right-7' onClick={toggleInput}/>
                </div>
              </div>
              <div>
                <button type="submit" onClick={registerToApp} className='bg-[#EB741E] w-60 px-10 py-1 rounded-md'>Create account</button>
              </div>
            </form>
        </div>
        <p className='text-sm mt-4'>Already have an account? <span className='cursor-pointer hover:underline' onClick={() => router.push('/')}>Sign in!</span></p>
    </div>
  )
}

export default register
