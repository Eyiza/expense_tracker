import React, {useState, useContext} from 'react'
import CustomSelect from '../CustomSelect'
import { UserContext } from '../../libs/UserContext';
import axios from '../../apiConfig';
import Swal from 'sweetalert2';

function EditExpense({ expense, onExpenseUpdated, setEdit }) {
    const options = ["Groceries","Gifts","Transportation", "Personal Care", "Housing", "Utilities", "Shopping" , "Education" , "Entertainment", "Pet Expenses", "Food and Dining", "Subscriptions and Memberships" , "Savings and Investments", "Miscellaneous", "Others" ]
    const defaultValue = 'Select an option';
    const currencies = ['NGN', 'USD', 'EUR', 'GBP', 'JPY', 'CAD' ];
    const defaultCurrency = 'NGN';
    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const { state, dispatch, isLoading, setIsLoading, darkMode} = useContext(UserContext);
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState(expense.name);
    const [category, setCategory] = useState(expense.category_name);
    const [price, setPrice] = useState(expense.initial_price);
    const [currency, setCurrency] = useState(expense.currency_code);

  
    const handleEditExpense = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          let currency_code = currency
          const response = await axios.patch(`/expenses/${expense.id}`, {
            name,
            category,
            price,
            currency_code
          });
    
          if (response.data.success) {
            Swal.fire('', 'Expense Updated', 'success');
            onExpenseUpdated();
            setEdit(false)
          } else {
            Swal.fire('Error', response.data.error, 'warning');
          }
        } catch (error) {
          console.error(error);
          Swal.fire('Error', 'Something went wrong! Please try again later.', 'error');
        } finally {
          setLoading(false);
      }
    };
    return (
    <div className='transition-transform duration-200 ease-in fixed top-40 right-20 bg-white p-10 flex flex-col items-start justify-center'>
      <p onClick={() => {setEdit(false)}} className='text-2xl text-black mb-2 cursor-pointer'>x</p>
        <form action="" className='flex flex-col items-center justify-center gap-10'>
            <div className='flex flex-row items-center gap-10 justify-around'>
                <label htmlFor="name" className='text-black'>Name:</label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="name"  placeholder='Name' className={`border outline-none px-4 py-2 rounded-lg ${darkMode?'text-black placeholder:text-black': 'text-gray-600'}`}/>
            </div>
            <div className='flex flex-row items-center gap-10 justify-around'>
            <label className='text-black'>Category:</label>
                 <CustomSelect
                    darkMode={darkMode}
                    options={options}
                    defaultValue={defaultValue}
                    selectedOption={category}
                    setSelectedOption={setCategory}
                />
            </div>
            
            <div className='flex flex-row items-center gap-10 justify-around'>
            <label className='text-black' htmlFor="price">Price:</label>
            {/* <input type="number" value="price" placeholder='Price'  name="price" id="price" className={`border outline-none px-4 py-2 appearance-none rounded-lg ${darkMode?'text-black placeholder:text-black':''}`}/> */}
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder='Price'
                name="price"
                id="price"
                className={`border outline-none px-4 py-2 appearance-none rounded-lg ${darkMode ? 'text-black placeholder:text-black' : ''}`}
            />
            </div>
            <div className='flex flex-row items-center gap-10 justify-around'>
                <label className='text-black'>Currency:</label>
                {/* <input type="text" name="name" id="name" className='border outline-none px-4 py-2 rounded-lg'/>
                 */}
                 {/* <CustomSelect darkMode={darkMode} options={options} defaultValue={defaultValue} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/> */}
                 <CustomSelect
                    darkMode={darkMode}
                    options={currencies}
                    defaultValue={defaultCurrency}
                    selectedOption={currency}
                    setSelectedOption={setCurrency}
                />
            </div>
            <div className='text-center my-5'>
                {/* <button onClick={handleEditExpense} className='px-10 w-1/2 py-2 bg-primary rounded-lg text-white font-medium' type="submit">Edit</button> */}
                <button type="submit" onClick={handleEditExpense} disabled={loading} className='px-20 py-2 bg-primary rounded-lg text-white font-medium button'>
                  {loading ? <> <span className="spinner" /> Please wait... </> : 'Edit'}
                </button>
            </div>
            
        </form>
    </div>
  )
}

export default EditExpense