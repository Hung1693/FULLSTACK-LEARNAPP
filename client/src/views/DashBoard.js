import React from 'react';
import { Navigate} from 'react-router-dom';

const DashBoard = () => {
    //check if user is logged in
    const username = localStorage.getItem('appUserName'); 
    console.log(username)
    if (username === 'undefined' || username === null) {
        alert('Invalid username or password');
        localStorage.removeItem('appUserName');
        return <Navigate to="/login" />
    }
    //--------------------------------------------------/

    return (
        <div>
            <h1>Dash</h1>
        </div>
    );
};

export default DashBoard;