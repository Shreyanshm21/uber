import React from "react";

const RidePopUp = (props) => {
    return (
        <div>
            <h5
                className="p-1 text-center w-[93%] absolute top-0"
                onClick={() => {
                    props.setRidePopupPanel(false);
                }}
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            {/* Main Section */}
            <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>

            <div className=" flex items-center justify-between mt-5 p-3 bg-yellow-400 rounded-lg">
                <div className="flex items-center gap-3 ">
                    <img
                        className="w-10 h-10 rounded-full object-cover"
                        src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?semt=ais_hybrid&w=740"
                        alt=""
                    />
                    <h2 className=" text-lg font-medium">Harsh Patel</h2>
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
                                Kankariya Talab, Bhopal
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">
                                Kankariya Talab, Bhopal
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3">
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹193.20 </h3>
                            <p className="text-sm -mt-1 text-gray-600">
                                Cash Cash
                            </p>
                        </div>
                    </div>
                </div>

                {/* Confirm Button */}
                <div className="mt-5 w-full ">
                    <button
                        onClick={() => {
                            props.setConfirmRidePopupPanel(true);
                        }}
                        className=" bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg"
                    >
                        Accept
                    </button>

                    <button
                        onClick={() => {
                            props.setRidePopupPanel(false);
                        }}
                        className="mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg"
                    >
                        Ignore
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RidePopUp;
