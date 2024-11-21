import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadUserFromToken } from "../../../store/Auth/authActions";

/*
    I use this component to wrap all my application to make sure i will load the userdata(if logged in) everytime i refresh the page.
*/

const UserLoader = ({ children }) => {
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.auth.userToken);

  
    useEffect(() => {
      if (userToken) {
        // Dispatching the async thunk to load user data
        dispatch(loadUserFromToken({ token: userToken }));
      }
    }, [dispatch, userToken]);
  
    return children; // Render all child components, which would include my routes
  };


export default UserLoader;