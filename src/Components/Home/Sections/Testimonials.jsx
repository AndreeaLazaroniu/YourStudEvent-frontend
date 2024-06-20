import { Container, Accordion } from 'react-bootstrap';
import React from 'react';
import './Testimonials.css';

export const Testimonials = () => {
    return (
        <div className="testimonials-container">
            <h2 className="testimonialsTitle">Testimonials</h2>
            <Accordion className="testimonialsBox">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Fantastic Event Organization!</Accordion.Header>
                    <Accordion.Body>
                        The coordination was flawless and the event was a huge success. — Jane Doe
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Loved the Ambiance</Accordion.Header>
                    <Accordion.Body>
                        The setting and music were perfect for our gathering. — John Smith
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}
