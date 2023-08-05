import React, { useState, useEffect, useContext } from 'react'
import CreateIncome from './CreateIncome'
import EditIncome from './EditIncome'
import axios from '../../apiConfig';
import Swal from 'sweetalert2';
import { UserContext } from '../../libs/UserContext';

function Income() {
    const [drop, setDrop] = useState(false)
    const { state, dispatch, isLoading, setIsLoading, darkMode} = useContext(UserContext);
    const {userInfo } = state;
    const [editDrop, seteditDrop] = useState(false)
    const [incomes, setIncomes] = useState([]);
    const [selectedIncome, setSelectedIncome] = useState(null); 

    const handleDrop = ()=> {
        setDrop(!drop)        
    }
    const editHandleDrop = () =>{
        seteditDrop(!editDrop)
    }
    const removeDrop = () =>{
        seteditDrop(!editDrop)
    }

    useEffect(() => {
        fetchIncomes();
    }, []);

    const fetchIncomes = async () => {
        try {
            const response = await axios.get(`/incomes`);
            if (response.data.success) {
                setIncomes(response.data.incomes);
            }
            else {
                console.log(response)
                setIncomes([])
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleEditIncome = (income) => {
        setSelectedIncome(income);
        seteditDrop(true);
    };
    
    const deleteIncome = async (id) => {
        try {
            const response = await axios.delete(`/incomes/${id}`);
            if (response.data.success) {
                setIncomes((prevIncomes) => prevIncomes.filter((income) => income.id !== id));
                // Swal.fire('Deleted', 'Income deleted successfully', 'success');
            }
            else {
                Swal.fire('Error', 'Unable to delete the income', 'error');
            }
        }
        catch (error) {
            console.error(error);
            //   Swal.fire('Error', 'Something went wrong', 'error');
        }
    }


  return (
    <div  className='mt-10 mx-20'>
      <div>
        <div className='flex items-center justify-between gap-20 mb-10'>
                 <p className='text-4xl font-bold text-secondary'>{drop?'Add Income':'Income'}</p>
                 {editDrop? (<button onClick={removeDrop} className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>x</button>): 
                 (
                    <button onClick={handleDrop} className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>{drop?'x':'+'}</button>
                 )}
              
          </div>

          {incomes.length !== 0 ?(
                <div className={`${drop? 'hidden': 'block'} ${editDrop? 'hidden': 'block'}`}>
                <table class="table-auto">
                    <thead className='mb-10'>
                        <tr className='border-b '>
                        <th class="px-4 py-2">Name</th>
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
                        {incomes?.map((income) => (
                                <tr key={income.id}>
                                <td class=" px-4 py-2">{income.name}</td>
                                <td class=" px-4 py-2">{userInfo?.currency_symbol}{income.price}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td class=" px-4 py-2"><button onClick={() => handleEditIncome(income)} className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>
                                    Edit
                                </button></td>
                                <td class=" px-4 py-2"> <button onClick={() => deleteIncome(income.id)} className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>
                                    Delete
                                </button></td>

                                </tr>
                        ))}
                        
                        
                        

                    </tbody>
                </table>
            </div>
            ) : (
                <div>
                    <p className={`text-center font-bold text-sm ${darkMode?'text-[#f0f0f0]': 'text-gray-500'}  my-40 ${drop? 'hidden': 'block'} ${editDrop? 'hidden': 'block'}`}>Urghhhhhhhhhhhh you don't have an income click the icon to add a new income</p>
                </div>
            )}

          {/* <div className={`${drop? 'hidden': 'block'} ${editDrop? 'hidden': 'block'}`}>
            <div className='flex items-center gap-28 mb-10 border-b pb-5'>
                    <p>Name</p>
                    <p>Price</p>
             </div>
             <div className=''>
                    <div className='flex items-center justify-between cursor-pointer mb-10'>
                        <div className='flex items-center gap-28'>
                            <p>Apple</p>
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
                            
                            <p>N10,000</p>
                        </div>
                        <div className='flex items-center gap-10'>
                            <button onClick={editHandleDrop} className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>Edit</button>
                            <button className='text-base font-bold rounded-full border py-1 hover:border-secondary transition duration-150 ease-in-out px-3'>Delete</button>
                        </div>
                    </div>
                </div>
          </div> */}
          
          {/* {drop&& (
                <div>
                     <CreateIncome/>
                </div>
            )} */}

            {drop && <CreateIncome onIncomeCreated={fetchIncomes} darkMode={darkMode}/>}

            {editDrop&& (
                <div className={`${drop?'hidden': 'block'}`}>
                    {/* <EditIncome/> */}
                    <EditIncome income={selectedIncome} onIncomeUpdated={fetchIncomes} />
                </div>
                
            )}
      </div>
    </div>
  )
}

export default Income