import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    const session = Cookies.get('session');
    if (!session) {
      router.push('/login');
    }
  }, []);

  return <h1>Welcome to the dashboard!</h1>;
};

export default Dashboard;





