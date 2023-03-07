import Head from 'next/head'
import React from 'react'
import {AiOutlineEye} from 'react-icons/ai'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { config } from './apiConfig';
import Swal from 'sweetalert2';
import httpClient from "./httpClient";


function register() {
  const [inputType, setInputType] = useState('password');
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [NameerrorMessage, setNameErrorMessage] = useState('');
  const [EmailerrorMessage, setEmailErrorMessage] = useState('');
  const [PassworderrorMessage, setPasswordErrorMessage] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  
  const toggleInput = ()=>{
    setInputType(inputType === 'password' ? 'text': 'password')
      }
  
  const registerToApp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (name.length == 0 || email.length == 0 || password.length == 0) {
        // setNameErrorMessage('Please enter your username')
        Swal.fire('Not Yet', 'All fields are required', 'warning')
      }
      else if (password.length < 8){
        setPasswordErrorMessage('Password must be at least 8 character long')
        // Must contain at least one number, one uppercase letter, one lowercase letter, and at least 8 or more characters
      }
      else if (!/\W/.test(password)){
        setPasswordErrorMessage('Password must contain at least one special character')
      }
      else {
        const response = await httpClient.post(`${config.baseUrl}/register`, {
            name, email, password
          });
        if (response.data.success) {
          Swal.fire(response.data.message, 'You will be redirected shortly', 'success')
          .then(() => {
            setName('')
            setEmail('')
            setpassword('')
            setNameErrorMessage('')
            setEmailErrorMessage('')
            setPasswordErrorMessage('')
            router.push('/Dashboard')
          })
        } else {
          Swal.fire('Error', response.data.error, 'warning')
        }
      }

    } catch (error) {
      Swal.fire('Error', error.response.data.error, 'warning');
      // Swal.fire('Oops', 'Something went wrong! Please try again later.', 'error');
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
      <div className='bg-white shadow-lg rounded-lg px-12 pt-4 pb-10 mt-28'>
            <form action="" className='flex flex-col gap-8 justify-center items-center mt-5'>
            <div className='flex flex-col'>
                <label className='text-[#1E1E1E] text-sm mb-2 font-normal'>Username</label>
                <input value={name}  onChange={(e) => setName(e.target.value)}  placeholder='Dee Joe' className='border border-[#1E1E1E] bg-white focus:outline-none rounded-sm text-sm h-8 w-60 px-2 py-[3px]' type="text" name="userame" id="userName" />
                {NameerrorMessage && (
                    <p className="text-red-500 mt-2">{NameerrorMessage}</p>
                 )}
              </div>
              <div className='flex flex-col'>
                <label className='text-[#1E1E1E] text-sm mb-2 font-normal'>Email</label>
                <input  value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Joe@gmail.com' className='border border-[#1E1E1E] bg-white focus:outline-none rounded-sm text-sm h-8 w-60 px-2 py-[3px]' type="email" name="email" id="email" />
                {/* {EmailerrorMessage && (
                    <p className="text-red-500 mt-2">{EmailerrorMessage}</p>
                 )} */}
              </div>
              <div className='flex flex-col'>
                <label className='text-[#1E1E1E] text-sm mb-2 font-normal'>Password</label>
                <div className='flex items-center relative'>
                <input value={password}  onChange={(e) => setpassword(e.target.value)} className='border border-[#1E1E1E] bg-white focus:outline-none rounded-sm px-2 h-8 w-60 text-sm py-[3px]' placeholder='Password' type={inputType} name="password" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number, one uppercase letter, one lowercase letter, and at least 8 or more characters" />
                 <AiOutlineEye className='cursor-pointer text-[24px] absolute -right-7' onClick={toggleInput}/>
                </div>
                {PassworderrorMessage && (
                    <p className="text-red-500 mt-2 text-sm w-60">{PassworderrorMessage}</p>
                 )}
              </div>
              <div>
                {/* <button type="submit" onClick={registerToApp} className='bg-[#EB741E] w-60 px-10 py-1 rounded-md'>Create account</button> */}
                <button type="submit" onClick={registerToApp} disabled={loading} className='bg-[#EB741E] w-60 px-10 py-1 rounded-md button'>
                  {loading ? <> <span className="spinner" /> Please wait... </> : 'Create account'}
                </button>
              </div>
            </form>
        </div>
        <p className='text-sm mt-4'>Already have an account? <span className='cursor-pointer hover:underline' onClick={() => router.push('/')}>Sign in!</span></p>
        </main>
    </div>
  )
}

export default register
