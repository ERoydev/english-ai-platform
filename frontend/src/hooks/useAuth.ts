import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // If using Redux
import { getUserByToken } from '../services/Auth/AuthService';

// Custom Hook
function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user); // Example of accessing state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) { // Only fetch user if token exists and user isn't already loaded
      dispatch(loadUserFromToken(token));
    }
  }, [dispatch, user]);

  return { user };
}

export default useAuth;
