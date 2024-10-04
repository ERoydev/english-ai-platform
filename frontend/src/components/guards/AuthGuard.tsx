import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Path from '../../Paths';

interface AuthGuardProps {
  children: JSX.Element;
}



const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    if (!isAuthenticated) {
        // If the user is not authenticated, redirect to the login page
        return <Navigate to={Path.Login} replace />;
    }

    // If the user is authenticated, render the child components
    return children;
};

export default AuthGuard;
