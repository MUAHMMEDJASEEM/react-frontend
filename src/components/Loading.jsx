import React from 'react';
import { HashLoader } from 'react-spinners';
import './Loading.css';

const Loading = () => {
    return (
        <div className="loading-container">
            <HashLoader 
                size={150}
                color={"#123abc"}
                loading={true} 
            />
        </div>
    );
}

export default Loading;
