
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from "react";
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import { UserContext } from '../libs/UserContext';
import Cookies from 'js-cookie';
import axios from '../apiConfig';
import dynamic from 'next/dynamic';
import LoadingScreen from '../libs/LoadingScreen';



const Dashboard = () => {
   const router = useRouter();
  const { state, dispatch, isLoading, setIsLoading, darkMode} = useContext(UserContext);
    const {userInfo } = state;
    
    // if(!userInfo){
    //   router.push('/')
    //   return <LoadingScreen/>
    // }
   useEffect(() => { 
      (async () => {
        try {
          const {data} = await axios.get(`/user`);
          if (data.success) {
            dispatch({type: 'USER_LOGIN', payload: data.user});
            Cookies.set('userInfo', JSON.stringify(data.user));
            setIsLoading(false)
              
          } else {
            router.push('/');
          }
        } catch (error) {
          router.push('/');  
          // if (error.data == 'unauthorized') {
          //     router.push('/');              
          // }        
        }
      })();
    
  },[]);

  useEffect(() => {
    // console.log('UserContext updated:', userInfo);
    console.log('UserContext updated');
  }, [userInfo]);
  
  return (
    <div className={`${darkMode?'bg-[#1a202c] text-[#f0f0f0]': 'sticky'}`}>
      {/* <p>{user.email}</p> */}
      
      <Sidebar home='home' darkMode={darkMode}/>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), {ssr: false})




