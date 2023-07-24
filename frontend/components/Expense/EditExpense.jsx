import React, {useState, useContext} from 'react'
import CustomSelect from '../CustomSelect'
import { UserContext } from '../../libs/UserContext';
import axios from '../../apiConfig';
import Swal from 'sweetalert2';

function EditExpense({ expense, onExpenseUpdated }) {
    const options = ["Groceries","Gifts","Transportation", "Personal Care", "Housing", "Utilities", "Shopping" , "Education" , "Entertainment", "Pet Expenses", "Food and Dining", "Subscriptions and Memberships" , "Savings and Investments", "Miscellaneous", "Others" ]
    const defaultValue = 'Select an option';
    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const { state, dispatch, isLoading, setIsLoading, darkMode} = useContext(UserContext);

    const [name, setName] = useState(expense.name);
    const [category, setCategory] = useState(expense.category_name);
    const [price, setPrice] = useState(expense.price);
  
    const handleEditExpense = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.patch(`/expenses/${expense.id}`, {
            name,
            category,
            price
          });
    
          if (response.data.success) {
            Swal.fire('', 'Expense Updated', 'success');
            onExpenseUpdated();
          } else {
            Swal.fire('Error', response.data.error, 'warning');
          }
        } catch (error) {
          console.error(error);
          Swal.fire('Error', 'Something went wrong! Please try again later.', 'error');
        }
    };
    return (
    <div className='transition-transform duration-200 ease-in'>
        <form action="" className='flex-col items-center justify-center gap-10'>
            <div className='flex items-start justify-around'>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="name"  placeholder='Name' className={`border outline-none px-4 py-2 rounded-lg ${darkMode?'text-black placeholder:text-black': 'text-gray-600'}`}/>
            </div>
            <div className='flex items-start justify-around my-10'>
                
                {/* <input type="text" name="name" id="name" className='border outline-none px-4 py-2 rounded-lg'/>
                 */}
                 {/* <CustomSelect darkMode={darkMode} options={options} defaultValue={defaultValue} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/> */}
                 <CustomSelect
                    darkMode={darkMode}
                    options={options}
                    defaultValue={defaultValue}
                    selectedOption={category}
                    setSelectedOption={setCategory}
                />
            </div>
            <div className='flex items-start justify-around'>
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
            <div className='text-center my-10'>
                <button onClick={handleEditExpense} className='px-10 w-1/2 py-2 bg-primary rounded-lg text-white font-medium' type="submit">Edit</button>
            </div>
            
        </form>
    </div>
  )
}

export default EditExpense