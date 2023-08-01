import React, {useState, useContext} from 'react'
import { UserContext } from '../../libs/UserContext';
import axios from '../../apiConfig';
import Swal from 'sweetalert2';

function EditIncome({income, onIncomeUpdated}) {
    const { state, dispatch, isLoading, setIsLoading, darkMode} = useContext(UserContext);
    const [name, setName] = useState(income.name);
    const [price, setPrice] = useState(income.price);
    const [loading, setLoading] = useState(false)

    const handleEditIncome = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.patch(`/incomes/${income.id}`, {
                name, price
            });
            if (response.data.success) {
                Swal.fire('', 'Income Updated', 'success');
                onIncomeUpdated()
            } else {
                Swal.fire('Error', response.data.error, 'warning')
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Oops', 'Something went wrong! Please try again later.', 'error');
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
                {/* <input type="text" name="name" id="name" className='border outline-none px-4 py-2 rounded-lg'/> */}
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="name" className={`border outline-none px-4 py-2 rounded-lg ${darkMode?'text-black placeholder:text-black': 'text-gray-600'}`}/>
            </div> 
            <div className='flex flex-row items-center gap-10 justify-around'>
                <label htmlFor="">Price:</label>
                {/* <input type="text" name="price" id="price" className='border outline-none px-4 py-2 rounded-lg'/> */}
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
                {/* <button className='px-20 py-2 bg-primary rounded-lg text-white font-medium' type="submit">Edit</button> */}
                <button type="submit" onClick={handleEditIncome} disabled={loading} className='px-20 py-2 bg-primary rounded-lg text-white font-medium button'>
                  {loading ? <> <span className="spinner" /> Please wait... </> : 'Edit'}
                </button>
            </div>
            
        </form>
    </div>
    </div>
  )
}

export default EditIncome