import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const { user, setUser } = useContext(UserDataContext);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
        getProfile()
    }, [token]);

    const getProfile= async()=>{
        try{
            const response = await axios
            .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.status === 200) {
                    setUser(response.data);
                    setisLoading(false);
                }
        }
        catch(err){
            console.log(err);
                localStorage.removeItem("token");
                navigate("/login");
        }
    }


    if (isLoading) {
        return <div className="ml-auto mr-auto">Loading ... </div>;
    }

    return <>{children}</>;
};

export default UserProtectedWrapper;
