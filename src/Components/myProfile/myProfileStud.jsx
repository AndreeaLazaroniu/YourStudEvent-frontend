
import React, {useState, useEffect} from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import './myProfile.css';
import myPrf from "../../Assets/myPrf.gif";
import { useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext";

export const MyProfileStud = () => {
    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        fetchUserProfile();
    }, [auth.user.token]);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('https://localhost:44317/api/account/GetOneUser', {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            // Optionally handle the error (e.g., show a notification)
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put('https://localhost:44317/api/account/updateAccount', user, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`
                }
            });
            if (response.status === 200) {
                fetchUserProfile();  // Reload the updated data
                setEditMode(false);
            }
        } catch (error) {
            console.error('Failed to update user data:', error);
            // Optionally handle the error
        }
    };

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete('https://localhost:44317/api/account/deleteAccount');
            if (response.status === 200) {
                // Handle user deletion (maybe redirect or clear user state)
            }
        } catch (error) {
            console.error('Failed to delete user account:', error);
            // Optionally handle the error
        }
    };

    return (
        <div className="profile-container" style={
            {backgroundImage: `url(${myPrf})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "100vh",
                width: "98vw"
            }
        }>
            <Row className="rowElementProfile">
                <Col md={6}>
                    <Form>
                        <Form.Group className="formGroupProfile" controlId="formGroupName">
                            <Form.Label className="text-inputProfile">Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter UserName"
                                name="name"
                                value={user.userName || ''}
                                onChange={handleChange}
                                readOnly={!editMode}
                            />
                        </Form.Group>

                        <Form.Group className="formGroup" controlId="formGroupEmail">
                            <Form.Label className="text-inputProfile">Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={user.email || ''}
                                onChange={handleChange}
                                readOnly={!editMode}
                            />
                        </Form.Group>

                        <Form.Group className="formGroup" controlId="formGroupName">
                            <Form.Label className="text-inputProfile">First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                name="orgName"
                                value={user.firstName || ''}
                                onChange={handleChange}
                                readOnly={!editMode}
                            />
                        </Form.Group>

                        <Form.Group className="formGroup" controlId="formGroupName">
                            <Form.Label className="text-inputProfile">Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                name="orgName"
                                value={user.lastName || ''}
                                onChange={handleChange}
                                readOnly={!editMode}
                            />
                        </Form.Group>

                        <Form.Group className="formGroup" controlId="formGroupName">
                            <Form.Label className="text-inputProfile">University</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter University"
                                name="description"
                                value={user.university || ''}
                                onChange={handleChange}
                                readOnly={!editMode}
                            />
                        </Form.Group>

                        <Form.Group className="formGroup" controlId="formGroupName">
                            <Form.Label className="text-inputProfile">Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone number"
                                name="phoneNumber"
                                value={user.phoneNumber || ''}
                                onChange={handleChange}
                                readOnly={!editMode}
                            />
                        </Form.Group>

                        <Form.Group className="formGroup" controlId="formGroupName">
                            <Form.Label className="text-inputProfile">Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter address"
                                name="address"
                                value={user.address || ''}
                                onChange={handleChange}
                                readOnly={!editMode}
                            />
                        </Form.Group>

                        {!editMode ? (
                            <Button className="button-profile" variant="primary" onClick={handleEdit}>Edit</Button>
                        ) : (
                            <Button className="button-profile" variant="success" onClick={handleSave}>Save</Button>
                        )}
                        <Button className="button-profile" variant="danger" onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete Account</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );

};

export default MyProfileStud;