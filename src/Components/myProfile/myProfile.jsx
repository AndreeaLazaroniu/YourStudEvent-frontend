import React, {useState, useEffect} from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import './myProfile.css';
import myPrf from "../../Assets/myPrf.gif";
import { useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext";
import {Box, Grid} from "@mui/material";

export const MyProfile = () => {
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
        console.log("Editing Mode Before Toggle:", editMode);
        setEditMode(true);
        console.log("Editing Mode After Toggle:", editMode);
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
        const { name, value } = e.target;
        console.log("Changing:", name, value); // Check what is being captured when you type
        setUser(prevUser => ({
            ...prevUser,
            [name]: value  // The name attribute in your input must match exactly with the property name in the state.
        }));
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete('https://localhost:44317/api/account/deleteAccount');
            if (response.status === 200) {
                auth.logout();
                navigate('/login');
            }
        } catch (error) {
            console.error('Failed to delete user account:', error);
            // Optionally handle the error
        }
    };

    const handleCreateEvent = () => {
        navigate('../createEvent');
    }

    const handleMyEvents = () => {
        navigate('../MyEvents');
    }

    const handleStatistics = () => {
        navigate('../Statistics');
    }

    return (
        <main className={'myProfilePageMain'}>
            <Box className = {"background-image-org"}></Box>
            <div className="profile-container">
                <Box className="rowElementProfile">
                    <Grid item sm={6} md={4}>
                        <Form>
                            <Form.Group className="formGroupProfile" controlId="formGroupName">
                                <Form.Label className="text-inputProfile" style={{ fontWeight: 'bold' }}>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter UserName"
                                    name="userName"
                                    value={user.userName || ''}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                            </Form.Group>

                            <Form.Group className="formGroupProfile" controlId="formGroupEmail">
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

                            <Form.Group className="formGroupProfile" controlId="formGroupName">
                                <Form.Label className="text-inputProfile" style={{ fontWeight: 'bold' }}>Name Organizer</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    name="orgName"
                                    value={user.orgName || ''}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                            </Form.Group>

                            <Form.Group className="formGroupProfile" controlId="formGroupName">
                                <Form.Label className="text-inputProfile" style={{ fontWeight: 'bold' }}>Organizer Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter description"
                                    name="orgDescription"
                                    value={user.orgDescription || ''}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                            </Form.Group>

                            <Form.Group className="formGroupProfile" controlId="formGroupName">
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

                            <Form.Group className="formGroupProfile" controlId="formGroupName">
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

                    <Box className="events-profile">
                        <Button className="button-events" onClick={handleMyEvents} style={{ marginTop: '10px' }}>My Events</Button>
                        <Button className="button-create" onClick={handleCreateEvent} style={{ marginTop: '10px' }}>Create Event</Button>
                        {/*<Button className="button-statistics" onClick={handleStatistics} style={{ marginTop: '10px', marginLeft: '20px' }}>Statistics</Button>*/}
                    </Box>
                </Box>
            </div>
        </main>
    );

};

export default MyProfile;