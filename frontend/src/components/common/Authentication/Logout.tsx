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
        console.log('INSIDEEE')
        authService.logout(auth.userInfo)
            .then(() => {
                dispatch(logout());
                navigate(Path.Home);
            })
            .catch((error) => {
                console.log(error);
            })

    
    }, [])
    

    return null;
}