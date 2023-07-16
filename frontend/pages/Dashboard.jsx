
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from "react";
import { config } from './apiConfig';
import Swal from 'sweetalert2';
import httpClient from "./httpClient";
import Cookies from 'js-cookie';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import { UserContext } from '../libs/UserContext';


const Dashboard = () => {
  const router = useRouter();
  const [datas, setData] = useState('');
  const [user, setUser] = useState(false);

  useEffect(() => {
   
    (async () => {
      try {
        const {data} = await httpClient.get(`${config.baseUrl}/user`);
        if (data.success) {
            setData(data.user);
            setUser(true)
        } else {
            
        }
      } catch (error) {
        if (error.data == 'unauthorized') {
            router.push('/');
            return null;
        }        
      }
    })();


  }, []);
  // const {user, isLoading } = useContext(UserContext);
  console.log(!datas)
  useEffect(() => {
    if (user == false){
      router.push("/")
    }
  }, []);
  
  
  return (
    <div>
      {/* <p>{user.email}</p> */}
      <Nav/>
      <Sidebar home='home'/>
    </div>
  );
};

export default Dashboard;




