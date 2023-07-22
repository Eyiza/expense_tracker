import React from 'react'

function CreateExpense() {
  return (
    <div className='transition-transform duration-200 ease-in'>
        <form action="" className=' flex flex-col items-center justify-center gap-10'>
            <div className='flex gap-20 items-center justify-around'>
                <label htmlFor="">Name:</label>
                <input type="text" name="name" id="name" className='border outline-none px-4 py-2 rounded-lg'/>
            </div>
            <div className='flex gap-20 items-center justify-around'>
                <label htmlFor="" className='text-left'>Category:</label>
                {/* <input type="text" name="name" id="name" className='border outline-none px-4 py-2 rounded-lg'/>
                 */}
                 <select name="categories" id="categories" className='border outline-none px-4 py-2 w-[218px] rounded-lg'>
                    <option value="">Industry</option>
                 </select>
            </div>
            <div className='flex gap-20 items-center  justify-around'>
                <label htmlFor="">Price:</label>
                <input type="text" name="price" id="price" className='border outline-none px-4 py-2 rounded-lg'/>
            </div>
            <div className=' my-10'>
                <button className='px-20  py-2 bg-primary rounded-lg text-white font-medium' type="submit">Create</button>
            </div>
            
        </form>
    </div>
  )
}

export default CreateExpense