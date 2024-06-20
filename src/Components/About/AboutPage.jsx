import React from 'react';
import { Container, Row, Col, Carousel, Card } from 'react-bootstrap';
import about1 from '../../Assets/about1.jpg';
import about2 from '../../Assets/about2.jpg';
import about3 from '../../Assets/IMG_6920.jpg';
import './AboutPage.css'; // Make sure to import the CSS file

export const AboutPage = () => {
    // Sample data for the gallery and reviews
    const galleryImages = [
        { about1 },
        { about2 },
        { about3 }
    ];

    const reviews = [
        { author: "John Doe", content: "Great experience, very well organized!" },
        { author: "Jane Smith", content: "Loved the variety of events available." },
        { author: "Carlos B", content: "A fantastic way for students to engage and learn new things." }
    ];

    return (
        <main className="aboutPageMain">
            <Container className="aboutPageContainer">
                <Row className="mt-4 mb-4">
                    <Col>
                        <h1 className="stylish-title">YourStudEvent_</h1>
                        <h5 style={{fontWeight:"bold"}}>
                            Welcome to Your StudEvent – Connecting Students with Transformative Experiences!<br/>
                        </h5>
                        <p>
                            Your StudEvent is your premier online destination dedicated to enriching the academic and
                            cultural lives of students across the globe. Here, students can effortlessly discover a wide
                            array of events ranging from educational workshops to exciting cultural gatherings.
                            Whether you're looking to enhance your skills, explore new interests, or simply enjoy vibrant
                            cultural festivities, Your StudEvent is your gateway to unforgettable experiences.
                        </p>
                        <p style={{fontWeight:"bold"}}>
                            For Students: Dive into a World of Opportunities<br/>
                            </p>
                        <p>
                            1. Discover: Browse through a curated list of upcoming educational and cultural events
                            tailored to diverse interests and academic needs.<br/>
                            2. Join: Register for events with just a few clicks. Whether it’s a local art exhibition, a
                            technology workshop, or a guest lecture, you’re only a step away from participating.<br/>
                            3. Experience: Engage with other like-minded students, learn from experts, and gain
                            invaluable experiences that go beyond the classroom.<br/>
                        </p>
                        <p style={{fontWeight:"bold"}}>
                            For Organizers and NGOs: Amplify Your Impact
                        </p>
                        <p>
                            1. Promote: Your StudEvent offers a unique platform for NGOs and event organizers to list
                            their
                            events, reaching a broad audience of enthusiastic, engaged students.<br/>
                            2. Manage: With easy-to-use tools, you can manage registrations, feedback, and
                            communications,
                            ensuring your events run smoothly and successfully.<br/>
                            3. Connect: Build lasting connections with students, enhance your visibility, and contribute
                            significantly to educational and cultural development.<br/>
                        </p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h2 style={{fontWeight:"bold"}}>Gallery</h2>
                        <Carousel>
                            {galleryImages.map((img, idx) => (
                                <Carousel.Item key={idx}>
                                    <img
                                        className="d-block w-100"
                                        src={img[`about${idx + 1}`]}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <h2 style={{fontWeight:"bold"}}>Reviews</h2>
                    {reviews.map((review, index) => (
                        <Col md={4} key={index}>
                            <Card className="mb-3 card-hover">
                                <Card.Body>
                                    <Card.Title>{review.author}</Card.Title>
                                    <Card.Text>{review.content}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </main>
    );
}

export default AboutPage;