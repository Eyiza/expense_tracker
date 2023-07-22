import React, { useState } from 'react';

const CustomSelect = ({ darkMode, options, defaultValue, onSelect, selectedOption, setSelectedOption }) => {
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
 
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOptionsVisible(false);
    
  };

  return (
    <div className="relative inline-block w-56">
      <div
        onClick={() => setIsOptionsVisible(!isOptionsVisible)}
        className={`cursor-pointer bg-white  border dark:border-gray-700 rounded-lg px-4 py-2 ${darkMode?'text-black': 'text-gray-600'}`}
      >
        {selectedOption}
      </div>
      {isOptionsVisible && (
        <div className={`absolute z-10 w-56 mt-1 bg-white max-h-48 overflow-y-auto text-sm border dark:border-gray-700 rounded shadow-lg ${darkMode?'text-black': 'text-gray-600'}`}>
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
