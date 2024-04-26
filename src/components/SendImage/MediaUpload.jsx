import React, { useState } from 'react';
import Cookies from 'js-cookie';
  function MediaUpload() {
      const [file, setFile] = useState(null);
      const [imageUrl, setImageUrl] = useState('');
      const handleFileChange = (event) => {
          setFile(event.target.files[0]);
      };

    //   const handleSubmit = (event) => {
    //       event.preventDefault();
    //       const formData = new FormData();
    //       formData.append('media', file);

    //       fetch('http://localhost/api/media/upload', {
    //           method: 'POST',
    //           body: formData,
    //           headers: {
    //               'Authorization': `Bearer ${Cookies.get('token')}`,
    //           },
    //       })
    //       .then(response => response.json())
    //       .then(data => console.log(data))
    //       .catch(error => console.error('Error uploading file:', error));
    //   };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('media', file);
    
        fetch('http://localhost/api/media/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Upload successful:', data);
            // Assuming the API returns the file ID or some identifier needed qsdfor deploent
            return fetch(`http://localhost/api/media/checkback/${data.fileName}`, {
                method: 'GET', // Changed to GET if you are just retrieving the file
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                },
            });
        })
        .then(response => response.blob()) // Changed from response.json() to response.blob()
        .then(blob => {
            const url = URL.createObjectURL(blob);
            setImageUrl(url); // Set the image URL for display
            console.log('Deployment successful:', url);
        })
        .catch(error => console.error('Error:', error));
    };

      return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
            {imageUrl && <img src={imageUrl} alt="Uploaded" />} 
        </form>
      );
  }

  export default MediaUpload;