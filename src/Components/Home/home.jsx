import {About} from './Sections/About';
import {Events} from './Sections/Events';
import {RegisterSection} from './Sections/RegisterSection';
import {Testimonials} from './Sections/Testimonials';
import {Start} from './Sections/Start';
import './home.css';
import React from 'react';
import collage_events from "../../Assets/collage-events.png";

export const Home = () => {
    return (
        <main className="mainHome" >
            <Start/>
            <About/>
            <Events/>
            <RegisterSection/>
            <Testimonials/>
        </main>
    );
}

export default Home;