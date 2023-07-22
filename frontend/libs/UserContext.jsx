import { createContext, useEffect, useReducer, useState } from 'react';
import Cookies from 'js-cookie';
import axios from '../apiConfig';


const UserContext = createContext();

const  initialState = {
  userInfo: Cookies.get('userInfo')? JSON.parse(Cookies.get('userInfo')) : null,
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
  const [isLoading, setIsLoading] = useState(false);
  
  const [state, dispatch]  = useReducer(reducer, initialState);
    const value = { state, dispatch, isLoading, setIsLoading};

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
