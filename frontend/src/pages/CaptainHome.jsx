import React, { useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";

const CaptainHome = () => {
    const ridePopupRef = useRef(null);
    const confirmRidePopupRef = useRef(null);
    const [ridePopupPanel, setRidePopupPanel] = useState(true);
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

    useGSAP(() => {
        if (ridePopupPanel) {
            gsap.to(ridePopupRef.current, {
                transform: "translateY(0)",
            });
        } else {
            gsap.to(ridePopupRef.current, {
                transform: "translateY(100%)",
            });
        }
    }, [ridePopupPanel]);

    useGSAP(() => {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupRef.current, {
                transform: "translateY(0)",
            });
        } else {
            gsap.to(confirmRidePopupRef.current, {
                transform: "translateY(100%)",
            });
        }
    }, [confirmRidePopupPanel]);

    return (
        <div className="h-screen">
            <div className="fixed p-6 top-0 flex items-center justify-between w-screen ">
                <img
                    className="w-16 "
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt="d"
                />
                <Link
                    to={"/home"}
                    className="h-10 w-10  bg-white flex items-center justify-center rounded-full  "
                >
                    <i className="text-lg font-medium ri-logout-box-line"></i>
                </Link>
            </div>

            <div className="h-3/5">
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="map"
                />
            </div>

            <div className="h-2/5 p-6">
                <CaptainDetails />
            </div>

            <div
                ref={ridePopupRef}
                style={{ transform: "translateY(100%)" }}
                className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 translate-y-full bg-white"
            >
                <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
            </div>

            <div
                ref={confirmRidePopupRef}
                style={{ transform: "translateY(100%)" }}
                className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 translate-y-full h-screen bg-white"
            >
                <ConfirmRidePopUp setRidePopupPanel={setRidePopupPanel}  setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
            </div>
        </div>
    );
};

export default CaptainHome;
