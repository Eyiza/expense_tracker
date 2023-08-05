import React from 'react'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import axios from '../../apiConfig';
import Swal from 'sweetalert2';
import CustomSelect from '../CustomSelect'

function CreateExpense({ onExpenseCreated, darkMode }) {

  const options = ["Groceries","Gifts","Transportation", "Personal Care", "Housing", "Utilities", "Shopping" , "Education" , "Entertainment", "Pet Expenses", "Food and Dining", "Subscriptions and Memberships" , "Savings and Investments", "Miscellaneous", "Others" ]
  const defaultValue = 'Select an Category';
  const defaultCurrency = 'NGN';
  const currencies = ['NGN', 'USD', 'EUR', 'GBP', 'JPY', 'CAD' ];
  const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState(defaultValue);
   
  

    const CreateExpense = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        if (name.length == 0 || selectedOption == 'Select an option' || price == 0){
          Swal.fire('Not Yet', 'All fields are required', 'warning')
        }
        else {
            let category = selectedOption
            let currency_code = selectedCurrency
          const response = await axios.post(`/expenses`, {
            name, category, price, currency_code
          });
          if (response.data.success) {
            Swal.fire('', 'Expense Added', 'success')
            .then(() => {
                onExpenseCreated()
                setName('')
                setPrice(0)
                setSelectedCurrency(defaultCurrency)
                setSelectedOption(defaultValue)
                router.push('/Dashboard')
            })
          } else {
            Swal.fire('Error', response.data.error, 'warning')
          }
        }

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
    <div className='transition-transform duration-200 ease-in'>
        <form action="" className=' flex flex-col items-center justify-center gap-10'>
            {/* <div className='flex gap-20 items-center justify-around'>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder='Name' className={`border outline-none px-4 py-2 rounded-lg ${darkMode?'text-black placeholder:text-black': 'text-gray-600'}`}/>
            </div> */}
            <div className='flex flex-row items-center gap-10 justify-around'>
                <label htmlFor="">Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" className={`border outline-none px-4 py-2 rounded-lg ${darkMode?'text-black placeholder:text-black': 'text-gray-600'}`}/>
            </div> 
            <div className='flex flex-row items-center gap-10 justify-around'>
              <label htmlFor="">Category:</label>
              <CustomSelect darkMode={darkMode} options={options} defaultValue={defaultValue} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
            </div>
            <div className='flex flex-row items-center gap-10 justify-around'>
                <label htmlFor="">Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} name="price" id="price" className={`border outline-none px-4 py-2 appearance-none rounded-lg ${darkMode?'text-black placeholder:text-black':''}`}/>
            </div>
            {/* <div className='flex gap-20 items-center  justify-around'>
                <input type="number" value={price} placeholder='Price' onChange={(e) => setPrice(e.target.value)} name="price" id="price" className={`border outline-none px-4 py-2 appearance-none rounded-lg ${darkMode?'text-black placeholder:text-black':''}`}/>
            </div> */}
            <div className='flex flex-row items-center gap-10 justify-around'>
              <label htmlFor="">Currency:</label>
              <CustomSelect 
                darkMode={darkMode} 
                defaultValue={defaultCurrency} 
                options={currencies} 
                selectedOption={selectedCurrency} 
                setSelectedOption={setSelectedCurrency} 
              />
            </div>
            <div className=' my-10'>
                {/* <button className='px-20  py-2 bg-primary rounded-lg text-white font-medium' type="submit">Create</button> */}
                <button type="submit" onClick={CreateExpense} disabled={loading} className='px-20 py-2 bg-primary rounded-lg text-white font-medium button'>
                  {loading ? <> <span className="spinner" /> Please wait... </> : 'Create'}
                </button>
            </div>
            
        </form>
    </div>
  )
}

export default CreateExpense