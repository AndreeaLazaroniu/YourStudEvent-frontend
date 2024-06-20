import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Form, Button, Container } from 'react-bootstrap';
import './CreateEvent.css';
import { useNavigate} from "react-router-dom";
import bkg from "../../Assets/bgdGif.gif";
import {useAuth} from "../../AuthContext";

export const CreateEvent = () => {
    // State to hold form data
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [categories, setCategories] = useState([]);
    const [catName, setCatName] = useState('');
    const [catId, setCatId] = useState(0);
    const [imageId, setImageId] = useState('0');
    const [orgUserId, setOrgUserId] = useState('0');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const auth = useAuth();

    // Effect to fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://localhost:44317/api/Categories/GetCategories');
                setCategories(response.data);  // Assuming response data is the array of categories
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                setError(error.message);
            }
        };

        fetchCategories();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'location':
                setLocation(value);
                break;
            case 'date':
                setDate(value);
                break;
            case 'price':
                setPrice(value);
                break;
            case 'status':
                setStatus(value);
                break;
            case 'catName':
                setCatName(value);
                break;
            case 'catId':
                setCatId(value);
                break;
            case 'imageId':
                setImageId(value);
                break;
            case 'orgUserId':
                setOrgUserId(value);
                break;
            default:
                break;
        }
    };

    const handleImageChange = async (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        const formData = new FormData();
        formData.append('file', selectedFile);

        const uploadResponse = await axios.post('https://localhost:44317/api/content/uploadFile', formData);
        console.log(uploadResponse);
    }

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const eventResponse = await axios.post('https://localhost:44317/api/Events/CreateEvent', {
                title,
                description,
                location,
                date,
                price,
                status,
                catName,
                catId,
                imageId,
                orgUserId
            }, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`, // Include auth token if needed
                }}
            );
            console.log(eventResponse);

            if(eventResponse.status){
                navigate('../myProfile');
            }

        }catch (error) {
            if (error.response) {
                setError(error.response.data.message);
                console.error('error:', error.response.data.message);
            } else if(error.request) {
                console.error('error:', error.request);
            } else {
                console.error('error', error.message);
            }
        }
    };

    return (
        <main className="CreateEventMain" style={
            {backgroundImage: `url(${bkg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "100vh",
                width: "100vw",
                position: "fixed",
                top: "0"
            }
        }>
            <Container className="mt-4">
                <h1 className="headingCreateEvent"> Add your<br/>own event</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter event title" name="title" value={title} onChange={handleInputChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter event description" name="description" value={description} onChange={handleInputChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter event location" name="location" value={location} onChange={handleInputChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="date" value={date} onChange={handleInputChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter price" name="price" value={price} onChange={handleInputChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control type="text" placeholder="Enter event status" name="status" value={status} onChange={handleInputChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCatId">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" name="catName" onChange={handleInputChange} required>
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Event Image</Form.Label>
                        <Form.Control type="file" onChange={handleImageChange} required />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Create Event
                    </Button>
                </Form>
            </Container>
        </main>
    );
}

export default CreateEvent;

