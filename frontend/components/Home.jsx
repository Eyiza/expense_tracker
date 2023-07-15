import React from 'react'

function Home() {
  return (
    <div className='flex items-center justify-center mt-10'>
        <div>
            <div>
                <p className='text-4xl font-bold text-secondary'>Welcome</p>
                <h5 className=' text-gray-600'>Johnny Marker</h5>
            </div>
            <div className='flex flex-col md:flex-row items-center justify-center gap-20 mt-10'>
                <div className='border border-secondary p-4 px-5 text-center rounded-lg '>
                    <h5 className='text-lg font-medium'>Total Expense</h5>
                    <p className='font-normal text-sm'>200</p>
                </div>
                <div className='border border-secondary p-4 px-5 text-center my-10 lg:my-0 rounded-lg'>
                    <h5 className='text-lg font-medium'>Total Income</h5>
                    <p className='font-normal text-sm'>400</p>
                </div>
                <div className='border border-secondary p-4 px-5 rounded-lg text-center'>
                    <h5 className='text-lg font-medium'>Total Amount</h5>
                    <p className='font-normal text-sm'>100</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home