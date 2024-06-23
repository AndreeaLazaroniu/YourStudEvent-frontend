import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../AuthContext";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {format} from "date-fns";

export const EventDetailPage = () => {
    const { Id } = useParams();
    const [eventDetails, setEventDetails] = useState({});
    const [imageInfo, setImageInfo] = useState({});
    const [isAssigned, setIsAssigned] = useState(localStorage.getItem(`assigned_${Id}`) === 'true');
    const auth = useAuth();

    useEffect(() => {
        const fetchEventAndImage = async () => {
            try {
                const eventResponse = await axios.get(`https://localhost:44317/api/Events/GetEvent/${Id}`);
                setEventDetails(eventResponse.data);

                if (eventResponse.data.imageId) {
                    const imageResponse = await axios.get(`https://localhost:44317/api/content/getObjFile/${eventResponse.data.imageId}`);
                    setImageInfo({
                        ...imageResponse.data,
                        fullPath: `https://localhost:44317${imageResponse.data.path}`
                    });
                }
            } catch (error) {
                console.error('Error fetching event or image details:', error);
            }
        };

        fetchEventAndImage();
    }, [Id]);

    const handleToggleAssignment = async () => {
        if (!isAssigned) {
            try {
                const response = await axios.post(`https://localhost:44317/api/Events/AddStudent/${Id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                    }
                });
                if (response.status === 200) {
                    localStorage.setItem(`assigned_${Id}`, 'true');
                    setIsAssigned(true);
                    alert('You have been assigned to this event successfully.');
                } else {
                    alert('Failed to assign the event.');
                }
            } catch (error) {
                console.error('Error assigning event:', error);
                alert('Error assigning event.');
            }
        } else {
            // Perform the unassigning API call
            try {
                const response = await axios.post(`https://localhost:44317/api/Events/RemoveStudent/${Id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                    }
                });
                if (response.status === 200) {
                    localStorage.removeItem(`assigned_${Id}`);
                    setIsAssigned(false);
                    alert('You have been unassigned from this event.');
                } else {
                    alert('Failed to unassign from the event.');
                }
            } catch (error) {
                console.error('Error unassigning from event:', error);
                alert('Error unassigning from event.');
            }
        }
    };

    return (
        <main className="EventDetailMain">
            <Container className="EventDetailContainer">
                <Row className="mb-3">
                    <Col xs={12}>
                        <img src={imageInfo.fullPath} alt="Event" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={12}>
                        <h1>{eventDetails.title}</h1>
                        <p>Organized by: {eventDetails.orgName}</p>
                    </Col>
                </Row>

                <Row>
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Description</Card.Title>
                                <Card.Text>{eventDetails.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Join This Event</Card.Title>
                                <Button onClick={handleToggleAssignment}
                                        className={`btn ${isAssigned ? 'btn-danger' : 'btn-primary'} w-100 mb-3`}
                                >
                                    {isAssigned ? 'Unassign Me' : 'Assign to Me'}
                                </Button>
                                <Card.Text>Price: {eventDetails.price}</Card.Text>
                                <Card.Text>{eventDetails.date}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default EventDetailPage;
