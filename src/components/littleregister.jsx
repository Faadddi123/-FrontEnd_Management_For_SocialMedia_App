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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Registration successful:', data);
        // You can handle the received token and user info here
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
            <input type="text" name="profile_pic" value={formData.profile_pic} onChange={handleChange} placeholder="Profile Picture URL" required />
            <button type="submit">Register</button>
        </form>
    );
}

export default LittleRegisterForm;