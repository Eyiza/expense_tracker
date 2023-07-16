import { createContext, useEffect, useState } from 'react';
import httpClient from '../pages/httpClient';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const {data} = await httpClient.get(`${config.baseUrl}/user`);
  //       if (data.success) {
            
  //           setUser(data.user);
  //       } else {
            
  //       }
  //     } catch (error) {
  //       if (error.data == 'unauthorized') {
  //           router.push('/');
  //           console.log(error.data);
  //           // return null;
  //       }        
  //     }
  //   })();
  // }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
