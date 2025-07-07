import React from "react";

const VehiclePanel = (props) => {
    return (
        <div>
            <h5
                onClick={() => {
                    props.setVehiclePanel(false);
                }}
                className="p-1 text-center absolute top-0 w-[93%]"
            >
                <i className="text-3xl text-gray-200  ri-arrow-down-wide-fill"></i>
            </h5>
            <h3 className="font-semibold text-2xl mb-5">Choose a Vehicle</h3>

            <div
                onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.selectVehicle("car");
                }}
                className="flex w-full p-3 items-center mb-2 justify-between border-2 border-[#eee] active:border-black rounded-xl"
            >
                <img
                    className="h-12"
                    src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                    alt="Car"
                />
                <div className="w-1/2 ml-2">
                    <h4 className="font-medium text-base">
                        UberGo
                        <span>
                            <i className="ri-user-3-fill"></i>4
                        </span>
                    </h4>
                    <h5 className="font-medium text-sm">2 mins away </h5>
                    <p className="font-normal text-xs">
                        Affordable, compact rides
                    </p>
                </div>
                <h2 className="text-lg  font-semibold">₹{props.fare.car}</h2>
            </div>

            <div
                onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.selectVehicle("moto");
                }}
                className="flex w-full p-3 items-center mb-2 justify-between border-2 border-[#eee] active:border-black rounded-xl"
            >
                <img
                    className="h-12"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
                    alt="Moto"
                />
                <div className="w-1/2 ml-2">
                    <h4 className="font-medium text-base">
                        Moto
                        <span>
                            <i className="ri-user-3-fill"></i>4
                        </span>
                    </h4>
                    <h5 className="font-medium text-sm">2 mins away </h5>
                    <p className="font-normal text-xs">
                        Affordable, compact rides
                    </p>
                </div>
                <h2 className="text-lg  font-semibold">₹{props.fare.moto}</h2>
            </div>

            <div
                onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.selectVehicle("auto");
                }}
                className="flex border-2 border-[#eee] active:border-black  mb-2 rounded-xl w-full p-3  items-center justify-between"
            >
                <img
                    className="h-12"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
                    alt="Auto"
                />
                <div className="w-1/2 ml-2">
                    <h4 className="font-medium text-base">
                        UberAuto
                        <span>
                            <i className="ri-user-3-fill"></i>4
                        </span>
                    </h4>
                    <h5 className="font-medium text-sm">2 mins away </h5>
                    <p className="font-normal text-xs">
                        Affordable, compact rides
                    </p>
                </div>
                <h2 className="text-lg  font-semibold">₹{props.fare.auto}</h2>
            </div>
        </div>
    );
};

export default VehiclePanel;
