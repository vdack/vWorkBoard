import React from 'react';
import './Popup.css';  // 引入样式文件

export const Popup = ({ show, handleClose, handleChange, inputValue }) => {
  return (
    show ? (
      <div className="popup-overlay">
        <div className="popup">
          <h2 className='Popup-textColor'>Enter Information</h2>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter some text"
          />
          <button onClick={handleClose} id='b1'>Submit</button>
          <text className='Popup-textColor'>sdasda</text>
          <button onClick={handleClose} id='b2'>Close</button>
        </div>
      </div>
    ) : null
  );
};
