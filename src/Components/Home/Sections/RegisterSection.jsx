import React from 'react';
import './RegisterSection.css';
import {useNavigate} from "react-router-dom";

export const RegisterSection = () => {
    const navigate = useNavigate();

    const navigateToEvents = () => {
        navigate('../role');
    };

    return (
        <div className="registerHome-container">
            <h2 className="joiUsTitle">Do you want to discover more?<br/>Join Us</h2>
            <p className="joinsUsText">Register now to get the latest updates and join our upcoming events!</p>
            <button className="joinUsButton" onClick={navigateToEvents}>
                Register
            </button>
        </div>
    );
}
