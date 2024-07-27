import { Navigate } from "react-router-dom"; 
import { useSelector } from "react-redux" ; 
import { getAuth } from "../../selectors" ; 

const PrivateRoute = ( { children } ) => {
  const isAuth = useSelector(getAuth);
  return isAuth ? children : <Navigate to="/login" replace />;
}
export default PrivateRoute ; 
