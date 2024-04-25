import React from 'react';

function Profile() {
    return (
        <a className="profile">
            <div className="profile-photo">
                <img src="./images/profile-1.jpg" alt="Profile" />
            </div>
            <div className="handle">
                <h4>Nia Ridania</h4>
                <p className="text-muted">
                    @niaridania
                </p>
            </div>
        </a>
    );
}

export default Profile;