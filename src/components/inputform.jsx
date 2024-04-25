import React, { useState } from 'react';
import Cookies from 'js-cookie';


async function getUserinfo(id) {
    const token = Cookies.get('token'); // Ensure you have qsddsaccess to 'Cookies'
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
        console.log(data);
        return data; // This will return the fetched data
    } catch (error) {
        console.error('Error fetching userinfo:', error);
    }
  }


function CreatePost({ onPostSuccess }) {
    const [postContent, setPostContent] = useState('');

    const handleTextChange = (event) => {
        setPostContent(event.target.value);
    };

    const handleClearingText = async () => {
        setPostContent('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = Cookies.get('token'); // Define token here

        try {
            const response = await fetch('http://localhost/api/importapost', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content_text: postContent }) // Use postContent instead of text
            });
            const responseData = await response.json();
            console.log(responseData);

            const userinfo = await getUserinfo(responseData.post.user_id);
            let userInfoCopy = { ...userinfo };
            delete userInfoCopy.id;
            responseData.post.displayed_id = responseData.displayed.id; // Ensure this path is correct
            Object.assign(responseData.post, userInfoCopy);
            const postinfo = responseData.post;
            console.log(postinfo);
            onPostSuccess(postinfo); // Ensure onPostSuccess is defined or imported
            handleClearingText();
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-post">
            <div className="profile-photo">
                <img src="./images/profile-1.jpg" alt="Profile" />
            </div>
            <input
                type="text"
                placeholder="What's on your mind, Diana?"
                id="create-post"
                value={postContent}
                onChange={handleTextChange}
            />
            <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
    );
}

export default CreatePost;