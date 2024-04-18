import React, { useState, useEffect } from "react";
import "./css/requestuser.css";
import Cookies from 'js-cookie';

async function fetchUsers() {
    const token = Cookies.get('token');
    console.log(token);
    const response = await fetch('http://localhost/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return await response.json(); // Assuming the server responds with JSON
  }
  
  fetchUsers().then(data => {
    console.log('Users fetched successfully:', data);
  }).catch(error => {
    console.error('Error fetching users:', error);
  });


const UserCard = ({ user, onAddMessageBox }) => (
  <div className="nearby-user">
    <div className="row">
      <div className="col-md-2 col-sm-2">
      {/*  */}
        <img  alt="user" className="profile-photo-lg" src={`https://bootdey.com/img/Content/avatar/${user.avatar}`} />
      </div>
      <div className="col-md-7 col-sm-7">
        <h5><a href="#" className="profile-link">{user.name}</a></h5>
        <p>{user.email}</p> {/* Changed from user.rolebbhbhhb to user.email */}
        <p className="text-muted">{user.age} years old</p>
      </div>
      <div className="col-md-3 col-sm-3">
        <button className="btn btn-primary pull-right" onClick={onAddMessageBox}>Message</button>
      </div>
    </div>
  </div>
);

const NearbyUsers = ({ onAddMessageBox }) => {
  const [users, setUsers] = useState([]);
// i think you would need to delete this function but use it to correct the above function that fetch the users
  useEffect(() => {
    fetchUsers()
      .then(data => {
        const updatedUsers = data.map((user,key) => ({
          ...user,
          email: user.email, // Assuming the API returns an email field // Pfeflaceholder if distance is not provided
          avatar: `avatar${key+1}.png`// Placeholder if avatar isijfjifij not provided
        }));
        setUsers(updatedUsers);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="container">
      <div className="">
        <div className="people-nearby">
            {users.map(user => (
            <UserCard key={user.id} user={user} onAddMessageBox={() => onAddMessageBox(user.id)} />
          ))}
        </div>      
      </div>
    </div>
  );
};

export default NearbyUsers;