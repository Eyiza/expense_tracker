import { createContext, useEffect, useReducer, useState } from 'react';
import Cookies from 'js-cookie';
import axios from '../apiConfig';


const UserContext = createContext();

const  initialState = {
  userInfo: Cookies.get('userInfo')?JSON.parse(Cookies.get('userInfo')) : null,
};

function reducer(state, action){
  switch (action.type){
    case "USER_LOGIN":
      return {...state, userInfo: action.payload };
    case "USER_LOGOUT":
      return {...state, userInfo: null};
    default:
        return state;
  }}

const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSubpage, setActiveSubpage] = useState('home')
  const [calendar, setcalendar] = useState(false)

  useEffect(() => {
    // Check if dark mode is enabled in the cookie
    const isDarkModeEnabled = Cookies.get('darkMode') === 'true';
    setDarkMode(isDarkModeEnabled);
    console.log(isDarkModeEnabled)
  }, []);

  // Function to toggle dark mode and store the state in the cookie
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    Cookies.set('darkMode', newDarkMode.toString(), { expires: 365 });
    console.log(darkMode)
  };
  
  const [state, dispatch]  = useReducer(reducer, initialState);
    const value = { state, dispatch, calendar, setcalendar, isLoading, setIsLoading, toggleDarkMode, darkMode, activeSubpage, setActiveSubpage};

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
