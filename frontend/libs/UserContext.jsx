import { createContext, useEffect, useState } from 'react';
import axios from '../apiConfig';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get(`/user`);
        if (data.success) {
            setUser(data.user);
        } else {
            setUser(null)
        }
      } catch (error) {
        if (error.data == 'unauthorized') {
            router.push('/');
            console.log(error.data);
            return null;
        }        
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
