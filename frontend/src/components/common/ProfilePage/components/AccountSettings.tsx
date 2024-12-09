import { useDispatch, useSelector } from "react-redux";
import BaseProfile from "../BaseProfile";
import { changeUserPassword, deleteUser } from "../../../../services/User/GenericUserService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Path from "../../../../Paths";
import { AppDispatch } from "../../../../store/store";

import { logout } from "../../../../store/Auth/authSlice";
import PopUpModal from "../../shared/Modal/PopUpModal";
import useForm from "../../../../hooks/useForm";

import logger from "../../../../logger";
import useFormError from "../../../../hooks/useFormError";
import { validatePassword } from "../../../../utils/validations/PasswordValidation";
import ErrorDisplay from "../../../../utils/validations/ErrorDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const initialPasswordChangeForm = {
    currentPassword: '',
    newPassword: ''
}


export default function AccountSettings() {
    const userData = useSelector(state => state.auth.userInfo)
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [passwordInputField, setPasswordInputField] = useState('password');
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const {errors, setErrorHandler, cleanErrors} = useFormError();

    const changePasswordClickHandler = async () => {
        const passwordErrors = validatePassword(values.newPassword);
        if (passwordErrors.length > 0) {
            cleanErrors();
            setErrorHandler(passwordErrors)
            return;
        }

        const result = await changeUserPassword(userData.user.id, values.currentPassword, values.newPassword);
        if (result.status !== 'success') {
            setErrorHandler([result.message])
            return;
        } 
        cleanErrors();
    }

    const {values, onChange, onSubmit} = useForm(changePasswordClickHandler, initialPasswordChangeForm);

    const deleteUserHandler = () => {
        setIsModalOpen(true); // Open the modal
    }

    const handleConfirmDelete = async () => {
        try {
            await deleteUser(userData.user.id);
            dispatch(logout())
            setIsModalOpen(false); // Close the modal after deletion
            navigate(Path.Home);
        } catch (err) {
            logger.error('error occured in deleting', err);
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false); // Close the modal without deleting
    };

    const showHiddenPasswordClickHandler = () => {
        // Handles the EYE button for password to display with * or text
        if (passwordInputField === 'password') {
            setPasswordInputField('text');
        } else {
            setPasswordInputField('password');
        }
    }

    return(
        <BaseProfile>

            <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow mb-20">
                    <div className="pt-4">
                        <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
                        <p className="font- text-slate-600">Change or review your account settings.</p>
                    </div>

                    <hr className="mt-4 mb-8" />
                    <p className="py-2 text-xl font-semibold">Email Address</p>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-gray-600">Your email address is <strong>{userData?.user?.email}</strong></p>
                        <button className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Change</button>
                    </div>

                    {/* PASSWORD CHANGE */}
                    <div>
                        <hr className="mt-4 mb-8" />
                        <p className="py-2 text-xl font-semibold">Password</p>

                        <form onSubmit={(e) => onSubmit(e)}>

                            <div className="flex items-center">
                                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                                    <label htmlFor="current-password">
                                        <span className="text-sm text-gray-500">Current Password</span>
                                        <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                            <input 
                                                type={passwordInputField} 
                                                name='currentPassword'
                                                value={values.currentPassword}
                                                onChange={onChange}
                                                id="current-password" 
                                                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" 
                                                placeholder="***********" 
                                            />
                                        </div>
                                    </label>

                                    <label htmlFor="new-password">
                                        <span className="text-sm text-gray-500">New Password</span>
                                        <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                            <input 
                                                type={passwordInputField} 
                                                name='newPassword'
                                                value={values.newPassword}
                                                onChange={onChange}
                                                id="new-password" 
                                                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" 
                                                placeholder="***********" 
                                            />
                                        </div>
                                    </label>
                                </div>


                                {passwordInputField === 'password' ? (
                                    <FontAwesomeIcon 
                                        onClick={showHiddenPasswordClickHandler}
                                        icon={faEyeSlash} 
                                        className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2"
                                    />
                                ): (
                                    <FontAwesomeIcon 
                                        onClick={showHiddenPasswordClickHandler}
                                        icon={faEye} 
                                        className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2"
                                    />
                                )}


                             
                            </div>

                            <ErrorDisplay errorProperty={errors}/>

                            <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Save Password</button>
                            <hr className="mt-4 mb-8" />

                        </form>
                        
                    </div>
                    
                    {/* DELETE ACCOUNT */}
                    <div className="mb-10">
                        <p className="py-2 text-xl font-semibold">Delete Account</p>
                        <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Proceed with caution
                        </p>
                        <p className="mt-2">Make sure you want to delete your account in case you ever need to get access to your data. We will completely wipe your data. There is no way to access your account after this action.</p>
                        
                        <button onClick={deleteUserHandler} className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2 pt-5 hover:text-red-800">Continue with deletion</button>
                    </div>

            </div>

            {/* Render the PopUpModal */}
            {isModalOpen && (
                <PopUpModal
                    onClose={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                />
            )}
            
        </BaseProfile>
    );
}