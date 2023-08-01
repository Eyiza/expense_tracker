import React from 'react'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import axios from '../../apiConfig';
import Swal from 'sweetalert2';

function CreateIncome({ onIncomeCreated, darkMode }) {

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const CreateIncome = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (name.length == 0 || price == 0){
                Swal.fire('Not Yet', 'All fields are required', 'warning')
            }
            else {
                const response = await axios.post(`/incomes`, {
                    name, price
                });
                if (response.data.success) {
                    Swal.fire('', 'Income Added', 'success')
                    .then(() => {
                        setName('')
                        setPrice('')
                        onIncomeCreated()
                        router.push('/Dashboard')
                    })
                } else {
                    Swal.fire('Error', response.data.error, 'warning')
                }
            }
            // setTimeout(()=>setLoading(false),500)
        } catch (error) {
            console.error(error);
            if (!error.response) {
                Swal.fire('Oops', 'Something went wrong! Please try again later.', 'error');
            }
            else {
                Swal.fire('Error', error.response.data.error, 'warning')
            }
        } finally {
            setLoading(false);
        }
    }


  return (
    <div>
        <div className='transition-transform duration-200 ease-in'>
        <form action="" className='flex flex-col items-center justify-center gap-10'>
            <div className='flex flex-row items-center gap-10 justify-around'>
                <label htmlFor="">Name:</label>
                {/* <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" className='border outline-none px-4 py-2 rounded-lg'/> */}
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" className={`border outline-none px-4 py-2 rounded-lg ${darkMode?'text-black placeholder:text-black': 'text-gray-600'}`}/>
            </div> 
            <div className='flex flex-row items-center gap-10 justify-around'>
                <label htmlFor="">Price:</label>
                {/* <input type="text" name="price" id="price" value={price} placeholder='Price' onChange={(e) => setPrice(e.target.value)} className='border outline-none px-4 py-2 rounded-lg'/> */}
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} name="price" id="price" className={`border outline-none px-4 py-2 appearance-none rounded-lg ${darkMode?'text-black placeholder:text-black':''}`}/>
            </div>
            <div className='text-center my-10'>
                {/* <button className='px-20 py-2 bg-primary rounded-lg text-white font-medium' type="submit">Create</button> */}
                <button type="submit" onClick={CreateIncome} disabled={loading} className='px-20 py-2 bg-primary rounded-lg text-white font-medium button'>
                  {loading ? <> <span className="spinner" /> Please wait... </> : 'Create'}
                </button>
            </div>
            
        </form>
    </div>
    </div>
  )
}

export default CreateIncome