import { useSelector } from 'react-redux';
import AdminLogin from '../AdminLogin/AdminLogin';
import GenreForm from '../GenreForm/GenreForm';

function AdminPage() {
  // get the login status from the redux store
  const isLoggedIn = useSelector((store) => store.isLoggedIn);

  return <>{isLoggedIn ? <GenreForm /> : <AdminLogin />}</>;
}

export default AdminPage;
