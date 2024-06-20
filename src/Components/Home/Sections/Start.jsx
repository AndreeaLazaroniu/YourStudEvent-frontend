import React from 'react';
import './About.css';
import './Start.css'
import {useNavigate} from "react-router-dom";

export const Start = () => {
    const navigate = useNavigate();

    const navigateToEvents = () => {
        navigate('../events');
    };

    return (
        <body className="mainStart">
        <div className="startContainer">
            <h2 className="startTitle">Your<br/>StudEvent</h2>
            <p className="startText">Start your journey with us today!<br/>Check our latest events!</p>
            <button type="submit" className="goToEventsButton" onClick={navigateToEvents}>Events</button>
        </div>
        </body>
    )
};

export default Start;