import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion)=>{
        if(activeField === 'pickup'){
            setPickup(suggestion)
        }
        else if(activeField === 'destination'){
            setDestination(suggestion)
        }
    }



    // sample array for location 
    const locations = [
    "Chattogram, Chittagong Division, Bangladesh",
    "Chita, Zabaykalsky Krai, Russia",
    "Chitungwiza, HA, Zimbabwe"
]

    return (
        <div>
            {/* this is just a sample data  */}
            {
                suggestions.map(function (elem, idx) {
                    return <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                })
            }






        </div>
    )
}

export default LocationSearchPanel