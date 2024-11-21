// Image
import signup from "../../../assets/auth/signup.svg";

// ICONS
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utils
import useForm from "../../../hooks/useForm";
import Path from "../../../Paths";

// Redux 
import { useDispatch, useSelector } from "react-redux";
import * as authActions from '../../../store/Auth/authActions';
import { AppDispatch } from "../../../store/store";

// React
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthForm from "./AuthForm";


const initialValues = {
    email: '',
    password: ''
}


export default function AuthScreen({
    authActionName,

}: {
    authActionName: string;
}) {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.auth)

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(Path.Home);
        }
    }, [navigate, isAuthenticated])

    const SubmitClickHandler = () => {
        if(authActionName === 'Login') {
            dispatch(authActions.userLogin({email: values.email, password: values.password}));

        } else if (authActionName === 'Sign up') {
            dispatch(authActions.userRegister({email: values.email, password: values.password}));
            
        }
    }

    const {values, onChange} = useForm(SubmitClickHandler, initialValues)


    return(
        <div className="relative min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="absolute top-5 left-5 ">
                <Link to={Path.Home}>
                    <FontAwesomeIcon icon={faCircleChevronLeft} className="w-[50px] h-auto text-gray-400 hover:cursor-pointer hover:text-gray-700 transition ease-in"/>
                </Link>
            </div>
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            {authActionName}
                        </h1>
                        <AuthForm 
                            onSubmitHandler={SubmitClickHandler}
                            authActionName={authActionName}
                            values={values}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${signup})`,
                          }}>
                    </div>
                </div>
            </div>
        </div>
    );
}