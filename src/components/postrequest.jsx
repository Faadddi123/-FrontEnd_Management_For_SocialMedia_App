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
function PostForm({ onPostSuccess }) {
  const [activeTab, setActiveTab] = useState('posts');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const token = Cookies.get('token'); // Ensure you replace 'your_token_here' with the actual token

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleClearingText = async() => {
    setText('');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost/api/importapost', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content_text: text }) // Senggugud only text as JSON
      });
      const responseData = await response.json();
      console.log(responseData);
      
      const userinfo = await getUserinfo(responseData.post.user_id);
      Object.assign(responseData.post, userinfo); // Merge userinfo into the post object
      const postinfo = responseData.post;
      console.log(postinfo);
      onPostSuccess(postinfo); // Call the onPostSuccess function passed as a prop
      handleClearingText();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div className="card gedf-card">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs" role="tablist">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => handleTabChange('posts')}>
              Make a publication
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'images' ? 'active' : ''}`} onClick={() => handleTabChange('images')}>
              Images
            </button>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="tab-content">
            {activeTab === 'posts' && (
              <div className="tab-pane fade show active">
                <div className="form-group">
                  <textarea className="form-control" rows="3" placeholder="What are you thinking?" value={text} onChange={handleTextChange}></textarea>
                </div>
              </div>
            )}
            {activeTab === 'images' && (
              <div className="tab-pane fade h-10">
                <div className="form-group">
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="customFile" onChange={handleFileChange} />
                    <label className="custom-file-label" htmlFor="customFile">Upload image</label>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="btn-toolbar justify-content-between">
            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Share</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;