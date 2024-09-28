import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Path from '../../../Paths.js';

import { useDispatch, useSelector } from "react-redux";
import * as authService from "../../../services/Auth/AuthService.js";
import { logout } from "../../../store/Auth/authSlice.js";
import { AppDispatch } from "../../../store/store.js";

export default function Logout() {
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth)
    
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        authService.logout(auth.userInfo)
            .then(() => {
                // After logout request resolve then i need to make the changes in my redux slice and i dispatch()
                dispatch(logout());
                navigate(Path.Home);
            })
            .catch((error) => {
                console.log(error);
            })

    
    }, [])
    

    return null;
}