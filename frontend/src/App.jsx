import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Userlogin from "./pages/Userlogin";
import UserSignUp from "./pages/UserSignUp";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignUp from "./pages/CaptainSignUp";
import Home from "./Home";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";

const App = () => {
    return (
        <div className="">
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/login" element={<Userlogin />} />
                <Route path="/riding" element={<Riding />} />
                <Route path="/captain-riding" element={<CaptainRiding />} />
                <Route path="/signup" element={<UserSignUp />} />
                <Route path="/captain-login" element={<CaptainLogin />} />
                <Route path="/captain-signup" element={<CaptainSignUp />} />
                <Route
                    path="/home"
                    element={
                        <UserProtectedWrapper>
                            <Home />
                        </UserProtectedWrapper>
                    }
                />
                <Route
                    path="/user/logout"
                    element={
                        <UserProtectedWrapper>
                            <UserLogout />
                        </UserProtectedWrapper>
                    }
                />

                <Route
                    path="/captain-home"
                    element={
                        <CaptainProtectedWrapper>
                            <CaptainHome />
                        </CaptainProtectedWrapper>
                    }
                />

                <Route path="/captain-logout"
                element={
                    <CaptainProtectedWrapper>
                        <CaptainLogout/>
                    </CaptainProtectedWrapper>
                }
                />

            </Routes>
        </div>
    );
};

export default App;
