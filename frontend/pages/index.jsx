import Head from 'next/head'
import Image from 'next/image'
import Nav from '../components/Nav'
import styles from '../styles/Home.module.css'
import {AiOutlineEye} from 'react-icons/ai'
import { useState } from 'react'
import { useRouter } from 'next/router'
import forgetPassword from './forgetPassword'
export default function Home() {
  const [inputType, setInputType] = useState('password');
  const router = useRouter();
  const toggleInput = ()=>{
    setInputType(inputType === 'password' ? 'text': 'password')
      }
  return (
    <div className=''>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="To track your expenses and see your income" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className='flex flex-col justify-center items-center font-light'>
        {/* <Nav/> */}
        <div className='bg-white shadow-lg rounded-lg px-10 pb-10 mt-28'>
            <form action="" className='flex flex-col gap-5 justify-center items-center mt-5'>
              <div className='flex flex-col'>
                <label className='text-[#1E1E1E] text-lg mb-2 font-normal'>Email</label>
                <input placeholder='Joe@gmail.com' className='border border-black bg-white focus:outline-none rounded-sm text-sm h-8 w-60 px-1 py-[3px]' type="text" name="username" id="username" />
              </div>
              <div className='flex flex-col'>
                <label className='text-[#1E1E1E] text-lg mb-2 font-normal'>Password</label>
                <div className='flex items-center relative'>
                <input className='border border-black bg-white focus:outline-none rounded-sm px-1 h-8 w-60 text-sm py-[3px]' type={inputType} name="password" id="password" />
                 <AiOutlineEye className='cursor-pointer text-[24px] absolute -right-7' onClick={toggleInput}/>
                </div>
              </div>
              <div>
                <button type="submit" className='bg-[#EB741E] w-60 px-10 py-1 rounded-md'>Log in</button>
              </div>
              <div>
                <p className='text-[#2F71AD] cursor-pointer text-sm' onClick={() => router.push("forgetPassword")}>Forgot password?</p>
              </div>
            </form>
        </div>
        <p className='text-sm mt-4'>Don’t have an account? <span className='cursor-pointer hover:underline' onClick={() => router.push('register')}>Sign up!</span></p>
      </main>
    </div>
  )
}
