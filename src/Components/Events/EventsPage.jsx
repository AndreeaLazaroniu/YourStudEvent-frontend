import {Container, Row, Col, Card, Form, InputGroup, Button, Modal} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './EventsPage.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext";

export const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isAssigned, setIsAssigned] = useState(false);
    const [sortOrder, setSortOrder] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        const fetchEventsAndImages = async () => {
            try {
                // Fetch events
                const eventResponse = await axios.get('https://localhost:44317/api/Events/GetEvents', {
                    headers: {
                        Authorization: `Bearer ${auth.user}`
                    }
                });
                const eventsData = eventResponse.data;

                // Fetch images for each event and combine them with event data
                const imagePaths = await Promise.all(eventsData.map(async (event) => {
                    try {
                        const imageResponse = await axios.get(`https://localhost:44317/api/content/getObjFile/${event.imageId}`, {
                            headers: {
                                Authorization: `Bearer ${auth.user}`
                            }
                        });
                        return {
                            ...event,
                            imageUrl: `https://localhost:44317${imageResponse.data.path}` // Ensure you have the correct property for the path
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

        // Fetch categories
        axios.get('https://localhost:44317/api/Categories/GetCategories', {
            headers: {
                Authorization: `Bearer ${auth.user}`
            }
        })
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, [auth.user]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAssignToEvent = () => {
        alert("You are assigned");
        setIsAssigned(true);
    }

    const handleCardClick = (event) => {
        if (event.eventId) {
            setSelectedEvent(event);
            setShowModal(true);
        } else {
            console.error('Event ID is undefined');
        }
    };

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === '' || event.catId.toString() === selectedCategory)
    );

    const getFirstFiftyWords = (text) => {
        return text.split(/\s+/).slice(0, 5).join(" ") + "...";
    };

    const sortEvents = (events) => {
        switch (sortOrder) {
            case 'name':
                return [...events].sort((a, b) => a.title.localeCompare(b.title));
            case 'date':
                return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
            case 'price':
                return [...events].sort((a, b) => parseFloat(a.price.replace(/[^0-9.-]+/g,"")) - parseFloat(b.price.replace(/[^0-9.-]+/g,"")));
            default:
                return events;
        }
    };

    const sortedAndFilteredEvents = sortEvents(filteredEvents);

    return (
        <main className="MainEventPage">
            <Container className="eventsPageContainer">
                <Row className="mb-3">
                    <Col md={8}>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Search events..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <Button variant="outline-secondary">Search</Button>
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <h4>Filter by Category</h4>
                        <Form.Select onChange={handleCategoryChange}>
                            <option value="">Select category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.catId}>{category.name}</option>
                            ))}
                        </Form.Select>
                        <h4>Sort Events</h4>
                        <Form.Select onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="">Sort by...</option>
                            <option value="name">Name</option>
                            <option value="date">Date</option>
                            <option value="price">Price</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row xs={1} md={3} className="g-4">
                    {sortedAndFilteredEvents.map((event) => (
                        <Col key={event.id}>
                            <Card className="eventPageCard" onClick={() => handleCardClick(event)}>
                                <Card.Img variant="top" src={event.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{event.title}</Card.Title>
                                    <Card.Text>{getFirstFiftyWords(event.description)}</Card.Text>
                                    <Card.Text>{event.price}</Card.Text>
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
                        <Button variant="primary" onClick={() => navigate(`/event/${selectedEvent?.eventId}`)}>
                            More Info
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </main>
    );
};

export default EventsPage;
