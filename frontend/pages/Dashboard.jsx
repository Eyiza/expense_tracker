
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from "react";
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import { UserContext } from '../libs/UserContext';


const Dashboard = () => {
  const router = useRouter();
  const [data, setData] = useState('');
  const {user, isLoading } = useContext(UserContext);

  console.log(user)
  
  

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (!user) {
  //   router.push('/')
  //   return (
  //   <p>Please log in to view the profile.</p>
  //   )
  // }

  
  return (
    <div>
      {/* <p>{user.email}</p> */}
      <Nav/>
      <Sidebar home='home'/>
    </div>
  );
};

export default Dashboard;




