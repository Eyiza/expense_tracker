import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    const session_id = Cookies.get('session_id');
    if (!session_id) {
      router.push('/');
    }
  }, []);

  return <h1>Welcome to the dashboard!</h1>;
};

export default Dashboard;





