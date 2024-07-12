import { useState } from "react";
import { Popup } from "./Popup";

export const PopupTrigger = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleButtonClick = () => {
    setShowPopup(true);
    };

    const handleClosePopup = () => {
    setShowPopup(false);
    };

    const handleInputChange = (event) => {
    setInputValue(event.target.value);
    };

    return (
    <div>
        <button onClick={handleButtonClick}>Show</button>
        <Popup 
        show={showPopup} 
        handleClose={handleClosePopup} 
        handleChange={handleInputChange} 
        inputValue={inputValue} 
        />
    </div>
    );
};