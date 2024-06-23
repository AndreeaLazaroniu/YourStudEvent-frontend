import {Route, Routes} from "react-router-dom";
import React from "react";
import {useAuth} from "./AuthContext";
import {Login} from './Components/login/login.jsx';
import {Role} from './Components/role/role.jsx';
import {OrganizerRegister} from './Components/register/organizerRegister.jsx';
import {StudentRegister} from './Components/register/studentRegister.jsx';
import {MyProfile} from './Components/myProfile/myProfile.jsx';
import {MyProfileStud} from './Components/myProfile/myProfileStud.jsx';
import {Layout} from './Components/Header&Footer/Layout.jsx';
import {Home} from "./Components/Home/home";
import {CreateEvent} from "./Components/Event/CreateEvent";
import {AboutPage} from "./Components/About/AboutPage";
import {EventsPage} from "./Components/Events/EventsPage";
import {EventDetailPage} from "./Components/Events/EventDetailPage";
import {ResetPassword} from "./Components/Password/ResetPassword"
import {MyEvents} from "./Components/OrganizerEvents/MyEvents";
import {EventDetailsOrg} from "./Components/Events/EventDetailsOrg";

export const Routes_app = () => {
    const auth = useAuth();

    return (
        <Layout>
                <Routes>
                    <Route path="myProfileStud" element={auth.user ? <MyProfileStud /> : <Login />} />
                    <Route path="myProfile" element={auth.user ? <MyProfile /> : <Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/createEvent" element={<CreateEvent />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/event/:Id" element={<EventDetailPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/role" element={<Role />} />
                    <Route path="/register/organizerRegister" element={<OrganizerRegister />} />
                    <Route path="/register/studentRegister" element={<StudentRegister />} />
                    <Route path="/forgotpassword" element={<ResetPassword />} />
                    <Route path="/myEvents" element={< MyEvents/>} />
                    <Route path="/myEvents/:Id" element={< EventDetailsOrg />}></Route>
                </Routes>
        </Layout>
    );
}

export default Routes_app;