import React, { useState } from 'react';
import axios from 'axios';
import './organizerRegister.css';
import { useNavigate } from 'react-router-dom';
import regOrg from '../../Assets/regOrg-alb.png';

export const OrganizerRegister = () => {
    const [formData, setFormData] = useState({
        Email: '',
        Password: '',
        VerifyPassword: '',
        UserName: '',
        OrgName: '',
        OrgDescription: '',
        PhoneNumber: '',
        Address: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.Password !== formData.VerifyPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('https://andreea.ligaac.ro/api/account/register/organizer', {
                Email: formData.Email,
                Password: formData.Password,
                UserName: formData.UserName,
                OrgName: formData.OrgName,
                OrgDescription: formData.OrgDescription,
                PhoneNumber: formData.PhoneNumber,
                Address: formData.Address,
            });
            console.log(response.data);
            navigate('../../login');
        } catch (err) {
            console.error(err);
            setError('An error occurred while registering.');
        }
    };

    return (
        <body className="mainReg" style={
            {
                backgroundImage: `url(${regOrg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left",
                height: "100vh",
                width: "100vw",
                position: "fixed",
                top: "0"
            }
        }>
            {/*<div className="organizerRegister">*/}
                <h2 className="organizerRegister-heading">Organizer<br/>Registration</h2>
                {error && <p>{error}</p>}
                <form className="organizerRegister-form" onSubmit={handleSubmit}>
                    <input type="email" name="Email" value={formData.Email} onChange={handleInputChange} placeholder="Email*" required/>
                    <input type="password" name="Password" value={formData.Password} onChange={handleInputChange} placeholder="Password*" required/>
                    <input type="password" name="VerifyPassword" value={formData.VerifyPassword} onChange={handleInputChange} placeholder="Verify Password*" required/>
                    <input type="text" name="UserName" value={formData.UserName} onChange={handleInputChange} placeholder="Username*" required/>
                    <input type="text" name="OrgName" value={formData.OrgName} onChange={handleInputChange} placeholder="OrgName*" required/>
                    <input type="tel" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleInputChange} placeholder="Phone Number*" required/>
                    <textarea name="OrgDescription" value={formData.OrgDescription} onChange={handleInputChange} placeholder="OrgDescription*" required/>
                    <textarea name="Address" value={formData.Address} onChange={handleInputChange} placeholder="Address*" required/>
                    <button type="submit">Register</button>


                </form>
            {/*</div>*/}
        </body>
    );
};
