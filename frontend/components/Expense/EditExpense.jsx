import React, {useContext} from 'react'
import CustomSelect from '../CustomSelect'
import { UserContext } from '../../libs/UserContext';

function EditExpense() {
    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const options = ["Groceries","Gifts","Transportation", "Personal Care", "Housing", "Utilities", "Shopping" , "Education" , "Entertainment", "Pet Expenses", "Food and Dining", "Subscriptions and Memberships" , "Savings and Investments", "Miscellaneous", "Others" ]
    const defaultValue = 'Select an Category';
    const { state, dispatch, isLoading, setIsLoading, darkMode} = useContext(UserContext);
  return (
    <div className='transition-transform duration-200 ease-in'>
        <form action="" className='flex-col items-center justify-center gap-10'>
            <div className='flex items-start justify-around'>
               
                <input type="text" name="name" id="name"  placeholder='Name' className={`border outline-none px-4 py-2 rounded-lg ${darkMode?'text-black placeholder:text-black': 'text-gray-600'}`}/>
            </div>
            <div className='flex items-start justify-around my-10'>
                
                {/* <input type="text" name="name" id="name" className='border outline-none px-4 py-2 rounded-lg'/>
                 */}
                 <CustomSelect darkMode={darkMode} options={options} defaultValue={defaultValue} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
            </div>
            <div className='flex items-start justify-around'>
                
            <input type="number" value="price"placeholder='Price'  name="price" id="price" className={`border outline-none px-4 py-2 appearance-none rounded-lg ${darkMode?'text-black placeholder:text-black':''}`}/>
            </div>
            <div className='text-center my-10'>
                <button className='px-10 w-1/2 py-2 bg-primary rounded-lg text-white font-medium' type="submit">Edit</button>
            </div>
            
        </form>
    </div>
  )
}

export default EditExpense