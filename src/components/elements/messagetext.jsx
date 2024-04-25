import React from 'react';

function Message({user , onAddMessageBox}) {
    return (
        <div className="message" onClick={onAddMessageBox}>
            <div className="profile-photo">
                <img src="./images/profile-17.jpg" alt="Profile" />
            </div>
            <div className="message-body">
                <h5>{user.name}</h5>
                <p className="text-muted">Just woke up bruh</p>
            </div>
        </div>
    );
}
//ss
export default Message;