import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import React, {useEffect} from 'react';
import './Events.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const Events = () => {
    const [events, setEvents] = React.useState([]);
    const [imagePaths, setImagePaths] = React.useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://andreea.ligaac.ro/api/Events/GetEvents')
            .then(response => {
                const data = response.data.slice(0, 6); // Limit the events to 6
                setEvents(data);

                const fetchImagePaths = data.map(event =>
                    axios.get(`https://andreea.ligaac.ro/api/content/getFile/${event.imageId}`)
                        .then(response => response.data)
                );
                return Promise.all(fetchImagePaths);
            })
            .then(setImagePaths)
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const handleSeeMore = () => {
        navigate('/events'); // Navigate to the events page or a specific URL
    };
    const getFirstFiftyWords = (text) => {
        return text.split(/\s+/).slice(0, 5).join(" ") + "...";
    };


    return (
        <body className="mainEventsHome">
            <div className="eventsHome-container">
                <h2 className="homeEventsTitle">Upcoming Events</h2>
                <Row xs={1} md={3} className="g-4">
                    {events.map((event, Id) => (
                        <Col key={Id}>
                            <Card className="homeEventsCard">
                                <Card.Img variant="top" src={imagePaths[Id]} />
                                <Card.Body>
                                    <Card.Title>{event.title}</Card.Title>
                                    <Card.Text>{getFirstFiftyWords(event.description)}</Card.Text>
                                    <Card.Text>{event.price}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <button onClick={handleSeeMore} className="seeMore-button">See More</button>
            </div>
        </body>
    );
}
