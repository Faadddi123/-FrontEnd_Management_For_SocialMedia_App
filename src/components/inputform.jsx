import React, { useState, useRef } from 'react';
import Cookies from 'js-cookie';

async function getUserinfo(id) {
    const token = Cookies.get('token');
    try {
        const response = await fetch(`http://localhost/api/getuserinfo/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch userinfo');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching userinfo:', error);
        throw error; 
    }
}

function Inputform({ profilePic, onPostSuccess }) {
    const [postContent, setPostContent] = useState('');
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleTextChange = (event) => {
        setPostContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = Cookies.get('token');
        const formData = new FormData();

        if (file) {
            formData.append('media', file);
        }
        if (postContent.trim()) {
            formData.append('content_text', postContent);
        }

        try {
            const response = await fetch('http://localhost/api/importapost', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const responseData = await response.json();

            const userinfo = await getUserinfo(responseData.post.user_id);
            let userInfoCopy = { ...userinfo };
            delete userInfoCopy.id;
            responseData.post.displayed_id = responseData.displayed.id;
            Object.assign(responseData.post, userInfoCopy);
            onPostSuccess(responseData.post);
            handleClearingText();
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleClearingText = () => {
        setPostContent('');
        setFile(null);
    };

    return (
        <form onSubmit={handleSubmit} className="create-post">
            <div className="profile-photo">
                <img src={profilePic} alt="Profile" />
            </div>
            <input
                type="text"
                placeholder="What's on your mind, Diana?"
                id="create-post"
                value={postContent}
                onChange={handleTextChange}
            />
            <i className="uil uil-file" onClick={handleIconClick}>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="file-input"
                    hidden
                />
            </i>
            <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
    );
}

export default Inputform;