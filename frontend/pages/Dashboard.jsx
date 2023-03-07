import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { config } from './apiConfig';
import Swal from 'sweetalert2';
import httpClient from "./httpClient";

const Dashboard = () => {
  const router = useRouter();
  const [data, setData] = useState('');

  useEffect(() => {
      (async () => {
        try {
          const response = await httpClient.get(`${config.baseUrl}/user`);
          if (response.data.success) {
            setData(response.data.user);
          } else {
            router.push('/');
            return null;
          }
        } catch (error) {
          if (error.response.data.code == 'unauthorized') {
              router.push('/');
              console.log(error.response.data);
              return null;
          }
          else {
            console.log(error);
          }
         
        }
      })();
    }, []);
  
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await httpClient.get(`${config.baseUrl}/logout`);
      router.push('/');
    } catch (error) {
      console.error(error);
      Swal.fire('Oops', 'Something went wrong! Please try again later.', 'error')
    }
  }


  return (
    <div>
      <h1>Welcome {data.username}!</h1>
      <div>
          <h2>Logged in</h2>
          <h3>Email: {data.email}</h3>
        </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;




