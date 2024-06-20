import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Navigate} from 'react-router-dom';
import Routes_app from "./Routes_app";
import AuthProvider, {useAuth} from "./AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AuthProvider>
            <Routes_app />
        </AuthProvider>
    </BrowserRouter>
);

function PrivateRoute({ children }) {
    const auth = useAuth();
    return auth.user ? children : <Navigate to="/login" />;
}

