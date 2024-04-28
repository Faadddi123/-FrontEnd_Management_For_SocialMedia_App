import React, { useState } from 'react';

function LittleRegisterForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone_number: '',
        age: '',
        profile_pic: ''
    });
    const [file, setFile] = useState(); // State for storing the uploaded file

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            console.log(e.target.files);
            setFile(URL.createObjectURL(e.target.files[0]));
            setFormData({
                ...formData,
                profile_pic: e.target.files[0] // Assuming you want to send the file to the server
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await fetch('http://localhost/api/register', {
                method: 'POST',
                body: formDataToSend // Sending form data as FormData object
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Registration successful:', data);
        } catch (error) {
            console.error('Failed to register:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone Number" required />
            <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required min="0" max="120" />
            <label htmlFor="file-upload">Upload Profile Picture</label>
            <input id="file-upload" type="file" onChange={handleChange} required />
            <img src={file || 'default_profile_pic_placeholder.png'} alt="Profile" />
            <button type="submit">Register</button>
        </form>
    );
}

export default LittleRegisterForm;