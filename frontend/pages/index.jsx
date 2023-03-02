import Head from 'next/head'
import Image from 'next/image'
import Nav from '../components/Nav'
import styles from '../styles/Home.module.css'
import {AiOutlineEye} from 'react-icons/ai'
import { useState } from 'react'
import { useRouter } from 'next/router'
import forgetPassword from './forgetPassword'
import axios from 'axios';
import Cookies from 'js-cookie';
import fetch from 'isomorphic-unfetch';
import { config } from './apiConfig';
import Swal from 'sweetalert2';


export default function Home() {
  const [inputType, setInputType] = useState('password');
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [message, setMessage] = useState('');
  const [EmailerrorMessage, setEmailErrorMessage] = useState('');
  const [PassworderrorMessage, setPasswordErrorMessage] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const toggleInput = ()=>{
    setInputType(inputType === 'password' ? 'text': 'password')
  }

  const LoginToApp = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        if (email.length == 0){
          // setEmailErrorMessage('Please enter your email')
          Swal.fire('Not Yet', 'Please enter an email', 'warning')
        }
        else if (password.length == 0){
          Swal.fire('Not Yet', 'Please enter a password', 'warning')
          // setPasswordErrorMessage('Please enter your password')
        }
        else {
          const response = await fetch(`${config.baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        const data = await response.json();
          if (data.success) {
            Swal.fire(data.message, 'You will be redirected shortly', 'success')
            .then(() => {
              Cookies.set('session_id', data.user["id"]);
              Cookies.set('email', data.user["email"]); // set email cookie
              // redirect to the dashboard
              setEmail('')
              setpassword('')
              setEmailErrorMessage('')
              setPasswordErrorMessage('')
              router.push('/Dashboard')
            })
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
    <div className=''>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="To track your expenses and see your income" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className='flex flex-col justify-center items-center font-light'>
        {/* <Nav/> */}
        <div className='bg-white shadow-lg rounded-lg px-12 pb-10 pt-4 mt-28'>
            <form action="" className='flex flex-col gap-8 justify-center items-center mt-5'>
              <div className='flex flex-col'>
                <label className='text-[#1E1E1E] text-sm mb-2 font-normal'>Email</label>
                <input placeholder='Joe@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} className='border border-[#1E1E1E] bg-white focus:outline-none rounded-sm text-sm h-8 w-60 px-2 py-[3px]' type="email" name="email" id="email" required/>
                {/* {EmailerrorMessage && (
                    <p className="text-red-500 mt-2">{EmailerrorMessage}</p>
                )} */}
              </div>
              <div className='flex flex-col'>
                <label className='text-[#1E1E1E] text-sm mb-2 font-normal'>Password</label>
                <div className='flex items-center relative'>
                <input value={password}  onChange={(e) => setpassword(e.target.value)} className='border border-[#1E1E1E] bg-white focus:outline-none rounded-sm px-1 h-8 w-60 text-sm py-[3px]' placeholder='Password' type={inputType} name="password" id="password" required/>
                 <AiOutlineEye className='cursor-pointer text-[24px] absolute -right-7' onClick={toggleInput}/>
                </div>
                {/* {PassworderrorMessage && (
                    <p className="text-red-500 mt-2 text-sm w-60">{PassworderrorMessage}</p>
                 )} */}
              </div>
              <div>
                <button type="submit" onClick={LoginToApp} disabled={loading} className='bg-[#EB741E] w-60 px-10 py-1 rounded-md button'>
                  {loading ? <> <span className="spinner" /> Please wait... </> : 'Log in'}
                </button>
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
