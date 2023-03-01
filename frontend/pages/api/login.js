import axios from 'axios';
import Cookies from 'js-cookie';

export default async function handler(req, res) {
  const { email, password } = req.body;
//   const response = await axios.post('https://expense-tracker-tum2.onrender.com/login', { email, password });
//   const { success } = response.data;
//   if (success) {
//     // store the session ID in a cookie or local storage
//     Cookies.set('session_id', response.headers.get('Authorization'));
//   }
  res.json({ email, password });
}