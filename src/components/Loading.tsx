import React from 'react';

const Loading = () => {
    return (
        <div className="text-center">
            <div className="spinner-border text-primary m-5" style={{width: '5rem', height: '5rem'}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;
