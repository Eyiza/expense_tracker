import { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const {data} = await httpClient.get(`${config.baseUrl}/user`);
        if (data.success) {
            console.log(data.user)
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
