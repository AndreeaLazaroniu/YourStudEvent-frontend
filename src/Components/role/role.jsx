import React, {useState} from "react";
import './role.css';
import participant from '../../Assets/participant.png';
import organizer from '../../Assets/organizer.png';
import collage_events from '../../Assets/collage-events.png';
import { useNavigate} from "react-router-dom";

export const Role = () => {
    const navigate = useNavigate();

    const navigateToStudentRegister = () => {
        navigate('../register/StudentRegister');
    };

    const navigateToOrganizerRegister = () => {
        navigate('../register/OrganizerRegister');
    };

    return (
        <body className="mainRole" style={
            {backgroundImage: `url(${collage_events})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: "0"
            }
        }>
            <div className="role-page" >
                <div className="role">
                    <h1 className="role-heading">Please choose your role</h1>
                    <div className="role-buttons">
                        <button type="submit" className="student-button" onClick={navigateToStudentRegister}>
                            <img id="student" src={participant} className="imgRole" alt="Student"/>
                            <p>Student</p>
                        </button>
                        <button type="submit" className="organizer-button" onClick={navigateToOrganizerRegister}>
                            <img id="organizer" src={organizer} className="imgRole" alt="Organizer"/>
                            <p>Organizer</p>
                        </button>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Role;