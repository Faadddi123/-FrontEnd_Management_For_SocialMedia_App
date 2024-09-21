import React, { useState , useEffect} from 'react';
import Cookies from 'js-cookie';
async function fetchUserProfilePic(id) {

    const token = Cookies.get('token');
    if (!token) {
        console.error('No token available');
        return;
    }

    try {
        const response = await fetch(`http://localhost/api/getUserProfilePic/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob(); 
        const url = URL.createObjectURL(blob); 
        return url; 
    } catch (error) {
        console.error('Error fetching user profile picture:', error);
        return null; 
    }
}
function Message({user , onAddMessageBox}) {
    const [ProfileUrl , setProfileUrl] = useState(null);
    useEffect(() => {
        async function loadImage() {
            const url = await fetchUserProfilePic(user.id);
            setProfileUrl(url);
        }
    
        loadImage();
    }, [user.id]);

    return (
        <div className="message" onClick={onAddMessageBox}>
            <div className="profile-photo">
                <img src={ProfileUrl} alt="Profile" />
            </div>
            <div className="message-body">
                <h5>{user.name}</h5>
                <p className="text-muted">Press to display Messages</p>
            </div>
        </div>
    );
}


export default Message;