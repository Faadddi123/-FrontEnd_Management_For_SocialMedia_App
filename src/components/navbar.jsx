import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; 

const Navbar = (props) => {
    const [profilePic, setProfilePic] = useState('');
    const navigate = useNavigate(); 
    useEffect(() => {
        setProfilePic(props.profilePic);
    }, [props.profilePic]);

    const handleLogout = () => {
        Cookies.remove('token');
        window.location.reload();
    };

    return (
        <nav>
            <div className="container">
                <h2 className="logo">
                    Tawassol
                </h2>
                <div className="search-bar">
                    {/* <i className="uil uil-search"></i>
                    <input type="search" placeholder="Search for creators, inspirations, and projects" /> */}
                </div>
                <div className="create">
                    <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                    <div className="profile-photo">
                        {Cookies.get('token') ? <img src={profilePic} alt="Profile" /> : null}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;