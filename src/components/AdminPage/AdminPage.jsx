import { useSelector } from 'react-redux';
import AdminLogin from '../AdminLogin/AdminLogin';

function AdminPage() {
  // get the login status from the redux store
  const isLoggedIn = useSelector((store) => store.isLoggedIn);
  return <AdminLogin />;
}

export default AdminPage;
