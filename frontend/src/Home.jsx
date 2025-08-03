import React, { use, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "./components/LocationSearchPanel";
import VehiclePanel from "./components/VehiclePanel";
import ConfirmRide from "./components/ConfirmRide";
import LookingForDriver from "./components/LookingForDriver";
import WaitingForDriver from "./components/WaitingForDriver";
import { SocketContext } from "./context/SocketContext";
import { UserDataContext } from "./context/UserContext";
import { useNavigate, useNavigation } from "react-router-dom";
import logo from "./assets/GoCab.png";
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

    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const [fare, setFare] = useState({});
    const [vehicleType, setVehicleType] = useState(null);
    const [ ride, setRide ] = useState(null)
    const navigate = useNavigate()
    const {socket} = useContext(SocketContext);
    const {user} = useContext(UserDataContext)

    useEffect(()=>{
        socket.emit("join",{userType: "user" , userId:user._id }) 
    },[user])

    socket.on('ride-confirmed',ride =>{

        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started',ride=>{
        setWaitingForDriver(false);
        navigate('/riding' ,{state : {ride}})
    })


    const handlePickupChange = async (e) => {
        setPickup(e.target.value);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
                {
                    params: { input: e.target.value },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            setPickupSuggestions(response.data);
        } catch {
            // handle error
        }
    };

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
                {
                    params: { input: e.target.value },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            setDestinationSuggestions(response.data);
        } catch {
            // handle error
        }
    };

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

    async function findTrip() {
        setVehiclePanel(true);
        setPanelOpen(false);

        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
            {
                params: { pickup, destination },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        setFare(response.data.fare);
    }

    async function createRide() {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/rides/create`,
            {
                pickup,
                destination,
                vehicleType,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

    }

    return (
        <div className="h-screen relative overflow-hidden">
            <img
                className="w-24 absolute left-5 top-5"
                src={logo}
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
                                setActiveField("pickup");
                            }}
                            onChange={handlePickupChange}
                        />
                        <input
                            className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5 "
                            type="text"
                            placeholder="Enter your destination"
                            required
                            value={destination}
                            onClick={() => {
                                setPanelOpen(true);
                                setActiveField("destination");
                            }}
                            onChange={handleDestinationChange}
                        />
                    </form>

                    <button
                        onClick={() => {
                            if (!pickup || !destination) return;
                            findTrip();
                        }}
                        className={`bg-black text-white px-4 py-2 rounded-lg mt-3 w-full ${
                            !pickup || !destination
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                        disabled={!pickup || !destination}
                    >
                        Find Trip
                    </button>
                </div>
                <div ref={panelRef} className=" bg-white h-0">
                    <LocationSearchPanel
                        suggestions={
                            activeField === "pickup"
                                ? pickupSuggestions
                                : destinationSuggestions
                        }
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
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
                    selectVehicle={setVehicleType}
                    fare={fare}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />
            </div>

            {/* Confirm Ride Pannel */}
            <div
                ref={confirmRideRef}
                style={{ transform: "translateY(100%)" }}
                className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12  bg-white"
            >
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            <div
                ref={vehicleFoundRef}
                style={{ transform: "translateY(100%)" }}
                className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12  bg-white"
            >
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            <div
                ref={waitingForDriverRef}
                style={{ transform: "translateY(100%)" }}
                className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12  bg-white"
            >
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver} />
            </div>
        </div>
    );
};

export default Home;
