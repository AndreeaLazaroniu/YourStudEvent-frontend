import { Container, Carousel } from 'react-bootstrap';
import about1 from '../../../Assets/about1.jpg';
import about2 from '../../../Assets/about2.jpg';
import './About.css';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const About = () => {
    useEffect(() => {
        AOS.init({
            duration : 2000
        });
    }, []);

    return (
        <body className="mainAboutHome">
        <div className="about-container" id="about">
            <h2 className="aboutHeading" data-aos="fade-in">About Us</h2>
            <p className="about-text" data-aos="fade-in"><br/>Learn more about what we do and how we help you capture and remember your
                student events.<br/> We are here to help you promote your event or find one that best fits you to join in.</p>
            <Carousel className="aboutCarousel">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={about1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First Event</h3>
                        <p>This was an amazing event!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={about2}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second Event</h3>
                        <p>Such a memorable day.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
        </body>
    );
}

export default About;