import React, { useState } from 'react';
import axios from 'axios';
import './studentRegister.css';
import { useNavigate } from 'react-router-dom';
import regStud from '../../Assets/partReg1.jpg';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const StudentRegister = () => {
    const [formData, setFormData] = useState({
        Email: '',
        Password: '',
        VerifyPassword: '',
        FirstName: '',
        LastName: '',
        UserName: '',
        PhoneNumber: '',
        Address: '',
        DateOfBirth: '',
        University: ''
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
            const response = await axios.post('https://andreea.ligaac.ro/api/account/register/student', {
                Email: formData.Email,
                Password: formData.Password,
                FirstName: formData.FirstName,
                LastName: formData.LastName,
                UserName: formData.UserName,
                PhoneNumber: formData.PhoneNumber,
                Address: formData.Address,
                DateOfBirth: formData.DateOfBirth,
                University: formData.University,
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
                backgroundImage: `url(${regStud})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left",
                height: "100vh",
                width: "100vw",
                display: "flex",
                top: "0"
            }
        }>
            <div className="studentRegister">
                <Row>
                    <Col className="regHeading-col">
                        <h2 className="studentRegister-heading">Student<br/>Registration</h2>
                        {error && <p>{error}</p>}
                    </Col>
                    <Col>
                        <form className="studentRegister-form" onSubmit={handleSubmit}>
                            <input type="email" name="Email" value={formData.Email} onChange={handleInputChange} placeholder="Email*" required/>
                            <input type="password" name="Password" value={formData.Password} onChange={handleInputChange} placeholder="Password*" required/>
                            <input type="password" name="VerifyPassword" value={formData.VerifyPassword} onChange={handleInputChange} placeholder="Verify Password*" required/>
                            <input type="text" name="FirstName" value={formData.FirstName} onChange={handleInputChange} placeholder="First Name*" required/>
                            <input type="text" name="LastName" value={formData.LastName} onChange={handleInputChange} placeholder="Last Name*" required/>
                            <input type="text" name="UserName" value={formData.UserName} onChange={handleInputChange} placeholder="Username*" required/>
                            <input type="tel" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleInputChange} placeholder="Phone Number*" required/>
                            <input type="date" name="DateOfBirth" value={formData.DateOfBirth} onChange={handleInputChange} placeholder="Date of Birth*" required/>
                            <input type="text" name="University" value={formData.University} onChange={handleInputChange} placeholder="University*" required/>
                            <textarea name="Address" value={formData.Address} onChange={handleInputChange} placeholder="Address*" required/>
                            <button type="submit">Register</button>
                        </form>
                    </Col>
                </Row>
            </div>
        </body>
    );
};

export default StudentRegister;