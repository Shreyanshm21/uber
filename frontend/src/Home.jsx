import React, { useLayoutEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "./components/LocationSearchPanel";
import VehiclePanel from "./components/VehiclePanel";
import ConfirmRide from "./components/ConfirmRide";
import LookingForDriver from "./components/LookingForDriver";
import WaitingForDriver from "./components/WaitingForDriver";

const Home = () => {
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const panelClose = useRef(null);
    const vehiclePanelRef = useRef(null);
    const confirmRideRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
    };

    useGSAP(
        function () {
            if (panelOpen) {
                gsap.to(panelRef.current, {
                    height: "70%",
                    padding: 24,
                });
                gsap.to(panelClose.current, {
                    opacity: 1,
                });
            } else {
                gsap.to(panelRef.current, {
                    height: "0%",
                    padding: 0,
                });
                gsap.to(panelClose.current, {
                    opacity: 0,
                });
            }
        },
        [panelOpen]
    );

    useGSAP(() => {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: "translateY(0)",

            });
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: "translateY(100%)",

            });
        }
    }, [vehiclePanel]);

    useGSAP(() => {
        if (confirmRidePanel) {
            gsap.to(confirmRideRef.current, {
                transform: "translateY(0)",
            });
        } else {
            gsap.to(confirmRideRef.current, {
                transform: "translateY(100%)",
            });
        }
    }, [confirmRidePanel]);

    useGSAP(() => {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: "translateY(0)",
            });
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: "translateY(100%)",
            });
        }
    }, [vehicleFound]);

    useGSAP(() => {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: "translateY(0)",
            });
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: "translateY(100%)",
            });
        }
    }, [waitingForDriver]);


    return (
        <div className="h-screen relative overflow-hidden">
            <img
                className="w-16 absolute left-5 top-5"
                src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                alt="d"
            />

            {/* Location  */}
            <div className="h-screen w-screen">
                {/* Image for temporary use */}
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="map"
                />
            </div>

            {/* Pick-Up Destination */}
            <div className="  h-screen z-10 flex flex-col justify-end absolute top-0 w-full ">
                <div className="h-[30%] p-5 bg-white relative ">
                    <h5
                        ref={panelClose}
                        onClick={() => {
                            setPanelOpen(false);
                        }}
                        className="absolute right-6 top-6 text-2xl"
                    >
                        <i className="ri-arrow-down-wide-fill"></i>
                    </h5>

                    <h4 className="text-2xl font-semibold">Find a trip</h4>
                    <form
                        onSubmit={(e) => {
                            submitHandler(e);
                        }}
                    >
                        <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
                        <input
                            className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
                            type="text"
                            placeholder="Add a pick-up location"
                            value={pickup}
                            onClick={() => {
                                setPanelOpen(true);
                            }}
                            onChange={(e) => {
                                setPickup(e.target.value);
                            }}
                        />
                        <input
                            className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
                            type="text"
                            placeholder="Enter your destination"
                            value={destination}
                            onClick={() => {
                                setPanelOpen(true);
                            }}
                            onChange={(e) => {
                                setDestination(e.target.value);
                            }}
                        />
                    </form>
                </div>
                <div ref={panelRef} className=" bg-white h-0">
                    <LocationSearchPanel
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                    />
                </div>
            </div>

            {/* Vehicle Pannel  */}
            <div
                ref={vehiclePanelRef}
                style={{ transform: "translateY(100%)" }}
                className="fixed w-full z-10 bottom-0 px-3 py-10 pt-12 translate-y-full bg-white"
            >
                <VehiclePanel
                    setVehiclePanel={setVehiclePanel}
                    setConfirmRidePanel={setConfirmRidePanel}
                />
            </div>

            {/* Confirm Ride Pannel */}
            <div
                ref={confirmRideRef}
                style={{ transform: "translateY(100%)" }}
                className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 translate-y-full bg-white"
            >
                <ConfirmRide
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            <div
                ref={vehicleFoundRef}
                style={{ transform: "translateY(100%)" }}
                className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 translate-y-full bg-white"
            >
                <LookingForDriver setVehicleFound={setVehicleFound} />
            </div>

            <div
                ref={waitingForDriverRef}
                style={{ transform: "translateY(100%)" }}
                className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12  bg-white"
            >
                <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
            </div>
        </div>
    );
};

export default Home;
