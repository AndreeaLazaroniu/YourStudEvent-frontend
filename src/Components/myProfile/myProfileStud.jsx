
import React, {useState, useEffect} from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import './myProfileStud.css';
import { useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext";
import {Box, Grid} from "@mui/material";

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
            const response = await axios.get('https://andreea.ligaac.ro/api/account/GetOneUser', {
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
            const response = await axios.put('https://andreea.ligaac.ro/api/account/updateAccount', user, {
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
            const response = await axios.delete('https://andreea.ligaac.ro/api/account/deleteAccount');
            if (response.status === 200) {
                // Handle user deletion (maybe redirect or clear user state)
            }
        } catch (error) {
            console.error('Failed to delete user account:', error);
            // Optionally handle the error
        }
    };

    return (
        <main className={'myProfilePageMain'}>
            <Box className = {"background-image-part"}></Box>
            <div className="profile-container">
                <Box className="rowElementProfile">
                    <Grid item sm={6} md={4}>
                        <Form>
                            <Form.Group className="formGroupProfile" controlId="formGroupName">
                                <Form.Label className="text-inputProfile" style={{ fontWeight: 'bold' }}>Username</Form.Label>
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
                                <Form.Label className="text-inputProfile" style={{ fontWeight: 'bold' }}>Email</Form.Label>
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
                                <Form.Label className="text-inputProfile" style={{ fontWeight: 'bold' }}>First Name</Form.Label>
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
                                <Form.Label className="text-inputProfile" style={{ fontWeight: 'bold' }}>Last Name</Form.Label>
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
                                <Form.Label className="text-inputProfile" style={{ fontWeight: 'bold' }}>University</Form.Label>
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
                                <Form.Label className="text-inputProfile" style={{ fontWeight: 'bold' }}>Phone Number</Form.Label>
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
                                <Form.Label className="text-inputProfile" style={{ fontWeight: 'bold' }}>Address</Form.Label>
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
                    </Grid>
                </Box>
            </div>
        </main>
    );

};

export default MyProfileStud;