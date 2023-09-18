import React, { useState, useEffect, useContext } from 'react'
import CreateExpense from './CreateExpense'
import EditExpense from './EditExpense'
import { useRouter } from 'next/router'
import axios from '../../apiConfig';
import Swal from 'sweetalert2';
import { UserContext } from '../../libs/UserContext';
import LoadingScreen from "../../libs/LoadingScreen"


function Expense() {
    const [drop, setDrop] = useState(false)
    const { state, dispatch, darkMode} = useContext(UserContext);
    const {userInfo } = state;
    const [editDrop, seteditDrop] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const [expenses, setExpenses] = useState([]);
    const [selectedExpense, setSelectedExpense] = useState(null); 


    const handleDrop = ()=> {
        setDrop(!drop)
        seteditDrop(false)
    }
    const editHandleDrop = () =>{
        seteditDrop(!editDrop)
    }
    const removeDrop = () =>{
        seteditDrop(!editDrop)
    }

    useEffect(() => {
        fetchExpenses()
        setisLoading(false)
        // if (typeof window !== 'undefined') {
        //     fetchExpenses();
        //   }
        
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`/expenses`);
            if (response.data.success) {
                setExpenses(response.data.expenses);  
            }
            else {
                console.log(response)
                setExpenses([])
            }
        } 
        catch (error) {
          console.error(error);
        }
    }

    const handleEditExpense = (expense) => {
        setSelectedExpense(expense); 
        seteditDrop(true); 
    };


    const deleteExpense = async (id) => {
        try {
            const response = await axios.delete(`/expenses/${id}`);
            if (response.data.success) {
                setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
                // Swal.fire('Deleted', 'Expense deleted successfully', 'success');
            }
            else {
                Swal.fire('Error', 'Unable to delete the expense', 'error');
            }
        } 
        catch (error) {
          console.error(error);
        //   Swal.fire('Error', 'Something went wrong', 'error');
        }
    }

  return (
    <div className='mt-10 mx-20'>
        <div>
            <div className='flex items-center justify-between gap-20 mb-10'>
                <p className='text-4xl font-bold text-secondary'>{drop ? 'Add Expense' : 'Expense'}</p>
                {editDrop ? (
                    <button onClick={removeDrop} className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>
                    x
                    </button>
                ) : (
                    <button onClick={handleDrop} className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>
                    {drop?'x':'+'}
                    </button>
                )}
            </div>
            
            {isLoading?<LoadingScreen/>:
            <>
            {expenses.length > 0 ?(
                <div className={`${drop? 'hidden': 'block'} ${editDrop? 'hidden': 'block'}`}>
                <table class="table-auto">
                    <thead className='mb-10'>
                        <tr className='border-b '>
                        <th class="px-4 py-2">Name</th>
                        <th class="px-4 py-2">Categories</th>
                        <th class="px-4 py-2">Price</th>
                        <th class="px-4 py-2"></th>
                        <th class="px-4 py-2"></th>
                        <th class="px-4 py-2"></th>
                        <th class="px-4 py-2"></th>
                        <th class="px-4 py-2"></th>
                        <th class="px-4 py-2"></th>
                        <th class="px-4 py-2"></th>
                        <th class="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses?.map((expense) => (
                                <tr key={expense.id}>
                                <td class=" px-4 py-2">{expense.name}</td>
                                <td class=" px-4 py-2">{expense.category_name}</td>
                                <td class=" px-4 py-2">{userInfo?.currency_symbol}{expense.price}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td class=" px-4 py-2"><button onClick={() => handleEditExpense(expense)} className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>
                                    Edit
                                </button></td>
                                <td class=" px-4 py-2"> <button onClick={() => deleteExpense(expense.id)} className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>
                                    Delete
                                </button></td>

                                </tr>
                        ))}
                        
                        
                        

                    </tbody>
                </table>
                {/* <div className='flex items-center gap-28 mb-10 border-b pb-5'>
                    <p>Name</p>
                    <p>Categories</p>
                    <p>Price</p>
                </div>
                <div className=''>                    
                    {expenses?.map((expense) => (
                        <div key={expense.id} className='flex items-center justify-between cursor-pointer mb-10'>
                            <div className='flex items-center gap-28'>
                                <p>{expense.name}</p>
                                <p>{expense.category_name}</p>
                                <p>{userInfo?.currency_symbol}{expense.price}</p>
                            </div>
                            <div className='flex items-center gap-10'>
                                <button onClick={() => handleEditExpense(expense)} className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>
                                    Edit
                                </button>
                                <button onClick={() => deleteExpense(expense.id)} className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>
            ) : (
                <div>
                    <p className={`text-center font-bold text-sm ${darkMode?'text-[#f0f0f0]': 'text-gray-500'}  my-40 ${drop? 'hidden': 'block'} ${editDrop? 'hidden': 'block'}`}>Urghhhhhhhhhhhh you don't have an expense click the icon to add a new expense</p>
                </div>
            )}
            
            </>
            
            }

            {/* {drop&& (
                <div>
                     <CreateExpense/>
                </div>
               
            )} */}
            {drop && <CreateExpense onExpenseCreated={fetchExpenses} darkMode={darkMode} />}

            {editDrop && (
                <div className={`${drop?'hidden': 'block'}`}>
                    {/* <EditExpense /> */}
                    <EditExpense expense={selectedExpense} onExpenseUpdated={fetchExpenses} />
                    {/* <EditExpense expense={expenseData} onExpenseUpdated={fetchExpenses} /> */}
                </div>
                
            )}
            
        </div>
    </div>
  )
}



export default Expense