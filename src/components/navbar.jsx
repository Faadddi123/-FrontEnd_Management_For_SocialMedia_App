import React from 'react';


const Navbar = () => {
    return (
        <nav>
            <div className="container">
                <h2 className="logo">
                    Tawassol
                </h2>
                <div className="search-bar">
                    <i className="uil uil-search"></i>
                    <input type="search" placeholder="Search for creators, inspirations, and projects" />
                </div>
                <div className="create">
                    <label className="btn btn-primary" htmlFor="create-post">Create</label>
                    <div className="profile-photo">
                        <img src="./images/profile-1.jpg" alt="" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;