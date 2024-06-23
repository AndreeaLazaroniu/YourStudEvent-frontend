import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {useAuth} from "../../AuthContext";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {Box} from "@mui/material";
import {format} from "date-fns";

export const EventDetailsOrg = () => {
    const { Id } = useParams();
    const [eventDetails, setEventDetails] = useState({});
    const [imageInfo, setImageInfo] = useState({});
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventAndImage = async () => {
            try {
                // Fetch event details
                const eventResponse = await axios.get(`https://localhost:44317/api/Events/GetEvent/${Id}`);
                setEventDetails(eventResponse.data);

                // Check if the event has an imageId and fetch image info
                if (eventResponse.data.imageId) {
                    const imageResponse = await axios.get(`https://localhost:44317/api/content/getObjFile/${eventResponse.data.imageId}`);
                    // Assuming imageResponse.data contains the relative path
                    setImageInfo({
                        ...imageResponse.data,
                        fullPath: `https://localhost:44317${imageResponse.data.path}` // Concatenate the base URL with the path
                    });
                }
            } catch (error) {
                console.error('Error fetching event or image details:', error);
            }
        };

        fetchEventAndImage();
    }, [Id]); // Effect dependency on Id

    const handleDeleteEvent = async () => {
        try {
            const response = await axios.delete(`https://localhost:44317/api/Events/${Id}`, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`
                }
            });
            if (response.status === 200 || response.status === 204) { // Handle successful response
                alert('Event deleted successfully.');
                navigate('/MyEvents'); // Redirect to MyEvents page
            } else {
                alert('Failed to delete the event.');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Error deleting event.');
        }
    };

    return (
        <main className="EventDetailMain">
            <Container className="EventDetailContainer">
                {/* Image at the top */}
                <Row className="mb-3">
                    <Col xs={12}>
                        <img src={imageInfo.fullPath} alt="Event" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                    </Col>
                </Row>

                {/* Title and Organizer Name */}
                <Row className="mb-3">
                    <Col xs={12}>
                        <h1>{eventDetails.title}</h1>
                        <p>Organized by: {eventDetails.orgName}</p> {/* Assuming organizerName is a property */}
                    </Col>
                </Row>

                {/* Description and Assign Button */}
                <Row>
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Description</Card.Title>
                                <Card.Text>
                                    {eventDetails.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>You can delete this event:</Card.Title>
                                <Button onClick={handleDeleteEvent} className="btn btn-danger w-100 mb-3">Delete Event</Button>
                                <Card.Text>Price: {eventDetails.price}</Card.Text>
                                <Card.Text>Date: {eventDetails.date}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );

};

export default EventDetailsOrg;