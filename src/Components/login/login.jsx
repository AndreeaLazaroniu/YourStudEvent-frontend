import React, {useState} from 'react';
import axios from "axios";
import './login.css';
import logo from '../../Assets/logo.png';
import { MdEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import { useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext";
import collage_events from "../../Assets/collage-events.png";

export const Login = () => {
    // const [Email, setEmail] = useState('');
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();


    const handleInputChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'UserName':
                setUserName(value);
                break;
            case 'Password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://andreea.ligaac.ro/api/account/login', {
                UserName,
                Password
            });

            auth.login(response.data.token);

            // Get the role of the user
            const roleResponse = await axios.get(`https://andreea.ligaac.ro/api/account/getRole/${UserName}`);

            setRole(roleResponse.data);

            // Navigate based on the role
            if(roleResponse.data === 'Student') {
                navigate('/myProfileStud');
            } else if(roleResponse.data === 'Organizer') {
                navigate('/myProfile');
            }
        }catch (e) {
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
        <body className="mainLogin" style={
            {backgroundImage: `url(${collage_events})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "100vh",
                width: "100vw",
                position: "fixed",
                top: "0"
            }
        }>
            <div className="login">
                <div className="logo">
                    <img id="loginlogo" src={logo} className="img" alt="Your StudEvent"/>
                </div>
                <h1 className="login-heading">Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required value={UserName} onChange={(e) => setUserName(e.target.value)}/>
                        <MdEmail className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required value={Password} onChange={(e) => setPassword(e.target.value)}/>
                        <AiOutlineLock className='icon'/>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox"/>Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit" className="button-login">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <a href="./role">Register</a></p>
                    </div>
                </form>
            </div>
        </body>
    );
}