import React, { useState, useEffect, useContext } from 'react'
import CreateExpense from './CreateExpense'
import EditExpense from './EditExpense'
import { useRouter } from 'next/router'
import axios from '../../apiConfig';
import Swal from 'sweetalert2';
import { UserContext } from '../../libs/UserContext';
import LoadingScreen from "../../libs/LoadingScreen"
import Calendar from 'react-calendar';



function Expense() {
    const [drop, setDrop] = useState(false)
    const { state, dispatch, darkMode, calendar, setcalendar, setActiveSubpage} = useContext(UserContext);
    const {userInfo } = state;
    const [editDrop, seteditDrop] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const [expenses, setExpenses] = useState([]);
    const [selectedExpense, setSelectedExpense] = useState(null); 
    const [viewMode, setViewMode] = useState("Daily")
    const [defaultExpense, setdefaultExpense] = useState([])
    const [isdefault, setisdefault] = useState(true)
    const today = new Date(); // Initialize with the current date
      const [selectedDate, setSelectedDate] = useState(today);
      const [selectedExpenses, setSelectedExpenses] = useState([]);

      const router = useRouter()
      router.pathname

      const ExpenseDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() + 1,
        0,
        0,
        0,
        0
      ).toISOString().slice(0, 10);


      const [defaultDate, setdefaultDate] = useState(ExpenseDate)


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
      const delay = setTimeout(() => {
        fetchExpenses()

        if(expenses){
          OpenExpenses()  

        }
        
        setisLoading(false)
        if(router.pathname === '/Expenses'){
          setActiveSubpage("Expense")
        }
       
        
        // if (typeof window !== 'undefined') {
        //     fetchExpenses();
        //   }
      }, 5000);

       return () => clearTimeout(delay)

        
    }, [expenses]);
    

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`/expenses`);
            if (response.data.success) {
                setExpenses(response.data.expenses);
                setisLoading(false)
                
                // console.log(expenses)
            }
            else {
                // console.log(response)
                setExpenses([])
            }
        } 
        catch (error) {
          console.error(error);
        }
    }

    const OpenExpenses = () => {
      const validExpense =   expenses.filter((expense) => expense.date === ExpenseDate)
      console.log(validExpense)
      setdefaultExpense(validExpense)
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
      

      
    
      // Function to filter and select expenses for the selected date
      const selectExpensesForDate = (date) => {
        // Convert the selected date to the ISO string with the local timezone
        const localDateString = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 1,
          0,
          0,
          0,
          0
        ).toISOString();
    
        const selectedExpenses = expenses.filter(
          (expense) => expense.date === localDateString.slice(0, 10)
        );
        // console.log(selectedExpense)
        setSelectedExpenses(selectedExpenses);
      };
    
      
      // Calculate expenses for the selected date range
      const calculateExpenses = (date) => {
        const monthlyTotal = expenses
          .filter((expense) => new Date(expense.date).getMonth() === date.getMonth())
          .reduce((total, expense) => total +  parseFloat(expense.price), 0);
    
        const yearlyTotal = expenses
          .filter((expense) => new Date(expense.date).getFullYear() === date.getFullYear())
          .reduce((total, expense) => total + parseFloat(expense.price), 0);
    
        return { monthlyTotal, yearlyTotal };
      };
    
      const handleDateChange = (date) => {
        setSelectedDate(date);
        selectExpensesForDate(date);
        setcalendar(false)
        setisdefault(false)
      };

  return (
    <div  className=''>
      <div className=" text-center mt-8 relative">
      <h1 className="text-2xl font-semibold mb-4">Day To Day Expense</h1>

      {calendar && (
         <div className="mb-4 absolute top-0 right-0 z-30">
         {/* Add navigation arrows here */}
        <div className='relative flex flex-col'>
        <p onClick={() => {setcalendar(false)}} className='text-2xl cursor-pointer text-black'>X</p>
          <Calendar
          defaultValue={selectedDate}
            onChange={handleDateChange}
            value={selectedDate}
            showNavigation={true}
            onClickMonth={handleDateChange}
            onClickYear={handleDateChange}
  
          />
         
          </div>
         </div>
         
      )}

     
      <div className='flex items-center justify-between px-10'>
      <div className="mb-4 flex items-center justify-center  gap-5">
          <button
            className={`${
              viewMode === 'Daily'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-600'
            } px-4 py-2 rounded-lg mr-2`}
            onClick={() => setViewMode('Daily')}
          >
            Daily
          </button>
          <button
            className={`${
              viewMode === 'Monthly'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-600'
            } px-4 py-2 rounded-lg`}
            onClick={() => setViewMode('Monthly')}
          >
            Monthly
          </button>
          <button
            className={`${
              viewMode === 'Yearly'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-600'
            } px-4 py-2 rounded-lg`}
            onClick={() => setViewMode('Yearly')}
          >
            Yearly
          </button>
          <svg onClick={() => {setcalendar(!calendar)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
</svg>

         
        </div>


        {isdefault? (
            <div onClick={handleDrop} className='flex items-center gap-3 cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className={` ${darkMode?'text-white':'text-black'} text-sm font-medium`}>Create New Expense</p>
    
            </div>
        ): (
          <div onClick={handleDrop} className='flex items-center gap-3 cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className={` ${darkMode?'text-white':'text-black'} text-sm font-medium`}>Create New Expense</p>
  
          </div>
      )}
        
      </div>
        <div className="">
        <h2 className="text-lg font-semibold mb-4">
          {selectedDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
            day: 'numeric'
          })}
        </h2>

          {viewMode == 'Daily'&&(
             <div>
             <h3 className="text-lg font-semibold">Daily Expenses</h3>
             {isdefault?
             (
              <>
              {isLoading?(
                <LoadingScreen/>
              ): (
                <ul>
               {defaultExpense.length > 0? (
                <>{defaultExpense.map((expense, index) => (
                    <li key={index} className='bg-gray-300 p-4 flex items-center justify-between mb-10'>
                       <div className='text-left'>
                           <p className='text-2xl text-black font-medium'>{expense.name}</p>
                           <p className='text-sm text-black'>Category</p>
                       </div>
   
                       <div>
                       <p className='text-xl font-medium text-black'>{userInfo?.currency_symbol}{expense.price}</p>
                       <div className='flex items-center'>
                        <svg onClick={() => handleEditExpense(expense)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600 cursor-pointer">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        <svg onClick={() => deleteExpense(expense.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-500 cursor-pointer">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
=                      </div>
                     </div>
                    </li>
                  ))}</>
               ): (
                <li className='bg-gray-300 p-4'>
                    <div className='flex items-center justify-between'>
                        <p className='text-2xl font-medium text-black'>Total Expense (Debit)</p>
                        <p className='text-xl font-medium text-black'>0.00</p>
                    </div>
                    <div onClick={handleDrop} className='flex items-center justify-center cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className='text-sm text-black'>Tap on the icon to create a expense for on this day</p>
                    </div>
                </li>
               )}
             </ul>
              )}</>
             ):(
              <div>
               {selectedExpenses.length > 0? (
                <>{selectedExpenses.map((expense, index) => (
                    <div key={index} className='bg-gray-300 p-4 flex items-center justify-between mb-10'>
                       <div className='text-left'>
                           <p className='text-2xl font-medium text-black'>{expense.name}</p>
                           <p className='text-sm text-black'>Category</p>
                       </div>
   
                       <div>
                       <p className='text-xl font-medium text-black'>{userInfo?.currency_symbol}{expense.price}</p>
                       <div className='flex items-center justify-center'>
                        <svg onClick={() => handleEditExpense(expense)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600 cursor-pointer">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        <svg onClick={() => deleteExpense(expense.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-500 cursor-pointer">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
=                      </div>
                     </div>
                    </div>
                  ))}</>
               ): (
                <div className='bg-gray-300 p-4'>
                    <div className='flex items-center justify-between'>
                        <p className='text-2xl font-medium text-black'>Total Expense (Debit)</p>
                        <p className='text-xl font-medium text-black'>0.00</p>
                    </div>
                    <div onClick={handleDrop} className='flex items-center justify-center cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className='text-sm text-black'>Tap on the icon to create a expense for on this day</p>
                    </div>
                </div>
               )}
             </div>
             )}


             
           </div>
          )}
       
        {viewMode == 'Monthly' && (
            <div className='flex items-center justify-between px-10 bg-gray-300 py-2' >
            <h3 className="text-lg font-semibold text-black">Monthly Total Expenses</h3>
            <p className='text-xl font-medium text-black'>{userInfo?.currency_symbol}{calculateExpenses(selectedDate).monthlyTotal}</p>
          </div>
  
        )}

        {viewMode == 'Yearly' && (
            <div className='flex items-center justify-between px-10 bg-gray-300 py-2'>
            <h3 className="text-lg font-semibold text-black">Yearly Total Expenses</h3>
            <p className='text-xl font-medium text-black'>{userInfo?.currency_symbol}{calculateExpenses(selectedDate).yearlyTotal}</p>
          </div>
        )}
        
        
      </div>
      

      
    </div>
            {drop && <CreateExpense onExpenseCreated={fetchExpenses} setDrop={setDrop} darkMode={darkMode} date={ExpenseDate} setisdefault={setisdefault} setisLoading={setisLoading} />}
            {editDrop && (
                <div className={`${drop?'hidden': 'block'}`}>
                    {/* <EditExpense /> */}
                    <EditExpense setEdit={seteditDrop} expense={selectedExpense} onExpenseUpdated={fetchExpenses} />
                    {/* <EditExpense expense={expenseData} onExpenseUpdated={fetchExpenses} /> */}
                </div>)}
    </div>
  )
}



export default Expense