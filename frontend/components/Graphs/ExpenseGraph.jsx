import "chart.js/auto";
import React, { useContext, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { UserContext } from "../../libs/UserContext";


const ExpenseGraph = ({expenses}) => {
    const { state, dispatch, isLoading, setIsLoading, darkMode} = useContext(UserContext);
    const today = new Date(); // Initialize with the current date
    const [selectedMonth, setSelectedMonth] = useState(today);
    const [viewMode, setViewMode] = useState('monthly'); // Initial view mode
    const [calendar, setcalendar] = useState(false)
    const calculateExpenses = (month, mode) => {
        const daysInMonth = new Date(
            month.getFullYear(),
            month.getMonth() + 1,
            0
          ).getDate();
          console.log(daysInMonth)
      const filteredExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        if (mode === 'monthly') {
          return (
            expenseDate.getFullYear() === month.getFullYear() &&
            expenseDate.getMonth() === month.getMonth()
          );
        } else if (mode === 'weekly') {
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay()-1);
                
          return (
            expenseDate >= startOfWeek && expenseDate <= today
          );
        }
        return false;
      });
  
      if (mode === 'monthly') {
        // Calculate total expenses for the selected month
        
        const monthlyExpenses = Array.from(
          { length: daysInMonth },
          (_, i) => {
            const dailyExpense = filteredExpenses.reduce(
              (total, expense) => {
                const expenseDate = new Date(expense.date);
                if (
                  expenseDate.getDate() === i + 1 &&
                  expenseDate.getMonth() === month.getMonth() &&
                  expenseDate.getFullYear() === month.getFullYear()
                ) {
                  return total +  parseInt(expense.price);
                }
                return total;
              },
              0
            );
  
            return dailyExpense;
          }
        );
  
        return monthlyExpenses;
      } else if (mode === 'weekly') {
        // Calculate total expenses for each week of the selected month
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
             const weeklyExpenses = daysOfWeek.map((day) => {
               const dailyExpense = filteredExpenses.reduce((total, expense) => {
                 const expenseDate = new Date(expense.date);
                 if (expenseDate.toLocaleDateString('en-US', { weekday: 'short' }) === day) {
                   return total +  parseInt(expense.price);
                 }
                 return total;
               }, 0);
         
               return dailyExpense;
             });
         
             return weeklyExpenses;
    };
}
  
    const chartData = {
      labels:
        viewMode === 'monthly'
          ? Array.from(
              { length: new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate() },
              (_, i) => i + 1
            )
          : 
        Array.from({ length: 7 }, (_, i) => {
          const day = new Date();
          day.setDate(day.getDate() - day.getDay() + i); // Calculate labels for each day of the current week
          return day.toLocaleDateString('en-US', { weekday: 'short' });
        }),
        
      datasets: [
        {
          label: viewMode === 'monthly' ? 'Monthly Expenses' : 'Weekly Expenses',
          data: calculateExpenses(selectedMonth, viewMode),
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          pointRadius: 3,
        },
      ],
    };
  
    return (
      <div className=" mt-8 relative">
        <div className="mb-4 absolute top-20 right-0">
            {calendar && (
                <Calendar
                onChange={(date) => setSelectedMonth(date)}
                onClickMonth={(date) => setSelectedMonth(date)}
                value={selectedMonth}
                showNavigation={true}
              />
            )}
          
        </div>
  
        <div className="mb-4 flex items-center justify-center  gap-5">
          <button
            className={`${
              viewMode === 'monthly'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-600'
            } px-4 py-2 rounded-lg mr-2`}
            onClick={() => setViewMode('monthly')}
          >
            Monthly
          </button>
          <button
            className={`${
              viewMode === 'weekly'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-600'
            } px-4 py-2 rounded-lg`}
            onClick={() => setViewMode('weekly')}
          >
            Weekly
          </button>
          <svg onClick={() => setcalendar(!calendar)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
</svg>

         
        </div>
  
        <div className={`${darkMode?'bg-[#1a202c] text-white': 'bg-white'}  p-4`}>
          <h2 className="text-lg font-semibold mb-4">
            {viewMode === 'monthly' ? 'Monthly Expenses' : 'Weekly Expenses'} for{' '}
            {selectedMonth.toLocaleString('default', { month: 'long' })}{' '}
            {selectedMonth.getFullYear()}
          </h2>
  
          <Line data={chartData} />
        </div>
      </div>
    );
  };
  
  export default ExpenseGraph;

