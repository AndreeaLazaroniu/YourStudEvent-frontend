import {Container, Row, Col, Card, Form, InputGroup, Button, Modal} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './MyEvents.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext";
import {Box} from "@mui/material";
import {format} from "date-fns";

export const MyEvents = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        const fetchEventsAndImages = async () => {
            try {
                // Fetch events
                const eventResponse = await axios.get('https://andreea.ligaac.ro/api/Events/GetEventsByOrg', {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`
                    }
                });
                const eventsData = eventResponse.data;

                // Fetch images for each event and combine them with event data
                const imagePaths = await Promise.all(eventsData.map(async (event) => {
                    try {
                        const imageResponse = await axios.get(`https://andreea.ligaac.ro/api/content/getObjFile/${event.imageId}`, {
                            headers: {
                                Authorization: `Bearer ${auth.user.token}`
                            }
                        });
                        return {
                            ...event,
                            imageUrl: `https://andreea.ligaac.ro${imageResponse.data.path}` // Ensure you have the correct property for the path
                        };
                    } catch (error) {
                        console.error(`Failed to fetch image for event ${event.id}:`, error);
                        return { ...event, imageUrl: 'path_to_default_image.jpg' }; // Fallback image
                    }
                }));

                console.log("Image paths and events combined: ", imagePaths);
                // Update events state with images
                setEvents(imagePaths);

            } catch (error) {
                console.error('Error fetching events or images:', error);
            }
        };

        fetchEventsAndImages();

    }, [auth.user]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCardClick = (event) => {
        if (event.eventId) {
            setSelectedEvent(event);
            setShowModal(true);
        } else {
            console.error('Event ID is undefined');
        }
    };

    const getFirstFiftyWords = (text) => {
        return text.split(/\s+/).slice(0, 5).join(" ") + "...";
    };

    return (
        <main className="MainEventPage">
            <Box className = {"background-image"}></Box>
            <Container className="eventsPageContainer">
                <Row className="mb-3">
                    <Col md={{ span: 8, offset: 2 }}>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Search events..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row xs={1} md={3} className="g-4">
                    {events.filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase())).map((event) => (
                        <Col key={event.id}>
                            <Card className="eventPageCard" onClick={() => handleCardClick(event)}>
                                <Card.Img variant="top" src={event.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{event.title}</Card.Title>
                                    <Card.Text>{getFirstFiftyWords(event.description)}</Card.Text>
                                    <Card.Text>{event.price}</Card.Text>
                                    <Card.Text>{format(new Date(event.date), 'yyyy-MM-dd')}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedEvent?.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card.Img variant="top" src={selectedEvent?.imageUrl} />
                        <p>{selectedEvent ? getFirstFiftyWords(selectedEvent.description) : ''}</p>
                        <p><strong>Price:</strong> {selectedEvent?.price}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => navigate(`/myEvents/${selectedEvent?.eventId}`)}>
                            More Info
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </main>
    );
};

export default MyEvents;
