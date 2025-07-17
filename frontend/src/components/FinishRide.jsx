import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FinishRide = (props) => {
    const navigate = useNavigate();

    async function endRide() {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
                    rideId: props.ride._id, // ✅ Send it in the body
                },{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (response.status === 200) {
                navigate("/captain-home");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="">
            <h5
                className="p-1 text-center w-[93%] absolute top-0"
                onClick={() => {
                    props.setFinishRidePanel(false);
                }}
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            {/* Main Section */}
            <h3 className="text-2xl font-semibold mb-5">Finish this Ride</h3>

            <div className=" flex items-center justify-between mt-5 p-4 bg-yellow-400 rounded-lg">
                <div className="flex items-center gap-3 ">
                    <img
                        className="w-10 h-10 rounded-full object-cover"
                        src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?semt=ais_hybrid&w=740"
                        alt=""
                    />
                    <h2 className=" text-lg font-medium">
                        {props.ride?.user.fullname.firstname}
                    </h2>
                </div>
                <h5 className=" text-lg font-semibold">2.2 KM</h5>
            </div>

            <div className="flex gap-2 justify-between flex-col items-center">
                {/* Center Content */}
                <div className="w-full mt-5">
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">
                                {props.ride?.pickup}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">
                                {props.ride?.destination}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3">
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">
                                ₹{props.ride?.fare}{" "}
                            </h3>
                            <p className="text-sm -mt-1 text-gray-600">
                                Cash Cash
                            </p>
                        </div>
                    </div>
                </div>

                <form></form>

                {/* Confirm Button */}
                <div className="mt-10 w-full">
                    <button
                        onClick={endRide}
                        className="w-full mt-5 flex  text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
                    >
                        Finish Ride
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FinishRide;
