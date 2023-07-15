import { UserProvider } from '../libs/UserContext';
import '../styles/globals.css'
import '../styles/style.css'
import 'sweetalert2/dist/sweetalert2.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
        <Component {...pageProps} />
     </UserProvider>
     )
}

export default MyApp
