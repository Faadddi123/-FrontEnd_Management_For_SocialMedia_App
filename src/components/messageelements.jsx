import React , {useEffect , useState} from 'react';
import Messagetexted from './elements/messagetext';
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


  
  
  function MessagesComponent() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      fetchUsers()
        .then(data => {
          const updatedUsers = data.map((user, key) => ({
            ...user,
            email: user.email,
            avatar: `avatar${key + 1}.png`
          }));
          setUsers(updatedUsers);
        })
        .catch(error => console.error('Error fetching users:', error));
    }, []);
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value.toLowerCase());
    };
  
    const filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm)
    );
  
    return (
      <>
        <div className="heading">
          <h4>Messages</h4>
          <i className="uil uil-edit"></i>
        </div>
        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input 
            type="search" 
            placeholder="Search messages" 
            id="message-search" 
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="category">
          <h6 className="active">Primary</h6>
          <h6>General</h6>
          <h6 className="message-requests">Requests (7)</h6>
        </div>
        {filteredUsers.map(user => (
          <Messagetexted key={user.id} user={user} onAddMessageBox={() => onAddMessageBox(user.id)} />
        ))}
      </>
    );
  }
  
  

  export default MessagesComponent;