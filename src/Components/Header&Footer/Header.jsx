import React, {useState} from 'react';
import './Header.css';
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import axios from "axios";


export const Header = () => {
    const [role, setRole] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate('/');
    };

    // const handleProfile = () => {
    //     const roleResponse = await axios.get(`https://localhost:44317/api/account/getRole/${UserName}`);
    //
    //     setRole(roleResponse.data);
    //
    //     // Navigate based on the role
    //     if (roleResponse.data === 'Student') {
    //         navigate('/myProfileStud');
    //     } else if (roleResponse.data === 'Organizer') {
    //         navigate('/myProfile');
    //     }
    // }

    return (
        <div className="Header">
            <ul className="nav">
                <li className="left"><a href="/home"><img id="student" src={logo} className="imgHeader" alt="logo" /></a></li>
                <div className="center">
                    <li><a href="/home">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/events">Events</a></li>
                </div>
                <div className="right">
                    {auth.user ? (
                        <>
                            <button className="headerButton" onClick={() => navigate('../myProfileStud')}>MyProfile</button>
                            <button className="headerButton" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <button className="headerButton" onClick={() => navigate('../login')}>Login</button>
                            <button className="headerButton" onClick={() => navigate('../role')}>Register</button>
                        </>
                    )}
                </div>
            </ul>
        </div>
    );
};

export default Header;