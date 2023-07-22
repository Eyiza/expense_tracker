import { useContext, useState, } from 'react';
import { UserContext } from '../libs/UserContext';

const Switch = () => {
  const { state, dispatch, isLoading, setIsLoading, toggleDarkMode, darkMode} = useContext(UserContext);
  const {userInfo } = state;
  return (
    <div className={`flex items-center`}>
      <button
        className={`${
          darkMode ? 'bg-primary' : 'bg-gray-200'
        } relative inline-flex flex-shrink-0 h-6 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-300 focus:outline-none`}
        onClick={toggleDarkMode}
      >
        <span className="sr-only">Toggle</span>
        <span
          className={`${
            darkMode ? 'translate-x-6' : 'translate-x-0'
          } inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform ease-in-out duration-300`}
        ></span>
      </button>
    </div>
  );
};

export default Switch;
