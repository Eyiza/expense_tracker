
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from "react";
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import { UserContext } from '../libs/UserContext';
import Cookies from 'js-cookie';
import axios from '../apiConfig';
import dynamic from 'next/dynamic';



const Dashboard = () => {
   const router = useRouter();
  const { state, dispatch, isLoading, setIsLoading} = useContext(UserContext);
    const {userInfo } = state;
   
    //  if(!userInfo || !isLoading){
    //   router.push('/')}

  
   useEffect(() => {
      (async () => {
        try {
          const {data} = await axios.get(`/user`);
          if (data.success) {
            dispatch({type: 'USER_LOGIN', payload: data.user});
            Cookies.set('userInfo', JSON.stringify(data.user));
              
          } else {
            // router.push('/');
           
          }
        } catch (error) {
          if (error.data == 'unauthorized') {
              router.push('/');
              // console.log(error.data);
              
          }        
        }
      })();
    
  },[]);
  


  // const router = useRouter();
  // const {user} = useContext(UserContext)

  // console.log(user)
  // useEffect(() => {
  //   if (!user){
  //     router.push("/")
  //   }
  // }, [user]);
  
  // if(isLoading){
  //   return <p>Loading.....</p>
  // }
  
  
  return (
    <div>
      {/* <p>{user.email}</p> */}
      <Nav/>
      <Sidebar home='home'/>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), {ssr: false})




