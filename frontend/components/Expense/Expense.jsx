import React, { useState, useEffect } from 'react'
import CreateExpense from './CreateExpense'
import EditExpense from './EditExpense'
import { useRouter } from 'next/router'
import axios from '../../apiConfig';
import Swal from 'sweetalert2';


// import { UserContext } from '../libs/UserContext';
// import Cookies from 'js-cookie';
// import dynamic from 'next/dynamic';

function Expense() {
    const [drop, setDrop] = useState(false)
    const [editDrop, seteditDrop] = useState(false)
    const [expenses, setExpenses] = useState([]);

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
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`/expenses`);
            if (response.data.success) {
                setExpenses(response.data.expenses);
            }
            else {
                console.log(response)
            }
        } 
        catch (error) {
          console.error(error);
        }
    }

    const handleExpenseCreated = async () => {
        try {
          const response = await axios.get('/expenses');
          if (response.data.success) {
            setExpenses(response.data.expenses);
          } else {
            // Handle the error if necessary
          }
        } catch (error) {
            console.error(error)
        }
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
                <p className='text-4xl font-bold text-secondary'>{drop?'Add Expense':'Expense'}</p>
                {editDrop? (<button onClick={removeDrop} className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>x</button>): 
                 (
                    <button onClick={handleDrop} className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>+</button>
                 )}
            </div>
            <div className={`${drop? 'hidden': 'block'} ${editDrop? 'hidden': 'block'}`}>
                <div className='flex items-center gap-28 mb-10 border-b pb-5'>
                    <p>Name</p>
                    <p>Categories</p>
                    <p>Price</p>
                </div>
                <div className=''>
                    {/* <div className='flex items-center justify-between cursor-pointer mb-10'>
                        <div className='flex items-center gap-28'>
                            <p>Apple</p>
                            <p>Industrys</p>
                            <p>N10,000</p>
                        </div>
                        <div className='flex items-center gap-10'>
                            <button onClick={editHandleDrop} className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>Edit</button>
                            <button className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>Delete</button>
                        </div>
                    </div>
                    <div className='flex items-center justify-between cursor-pointer'>
                        <div className='flex items-center gap-28'>
                            <p>Apple</p>
                            <p>Industrys</p>
                            <p>N10,000</p>
                        </div>
                        <div className='flex items-center gap-10'>
                            <button onClick={editHandleDrop} className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>Edit</button>
                            <button className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>Delete</button>
                        </div>
                    </div> */}

                    {expenses.map((expense) => (
                        <div key={expense.id} className='flex items-center justify-between cursor-pointer mb-10'>
                            <div className='flex items-center gap-28'>
                                <p>{expense.name}</p>
                                <p>{expense.category_name}</p>
                                <p>N{expense.price}</p>
                            </div>
                            <div className='flex items-center gap-10'>
                                <button onClick={editHandleDrop} className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>
                                    Edit
                                </button>
                                <button onClick={() => deleteExpense(expense.id)} className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* {drop&& (
                <div>
                     <CreateExpense/>
                </div>
               
            )} */}
            {drop && <CreateExpense onExpenseCreated={fetchExpenses} />}

            {editDrop&& (
                <div className={`${drop?'hidden': 'block'}`}>
                    <EditExpense/>
                </div>
                
            )}
            
        </div>
    </div>
  )
}

export default Expense