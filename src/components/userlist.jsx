import React, { useState } from 'react';

function UserList({ initialUser }) {
    const [userinfo, setUserinfo] = useState(initialUser || {});

    const handleUsernameChange = (event) => {
        setUserinfo({ ...userinfo, name: event.target.value });
    };

    return (
        <div>
            <form>
                <label htmlFor="username">{userinfo.name}</label>
                <input
                    type="text"
                    id="username"
                    value={userinfo.name || ''}
                    onChange={handleUsernameChange}
                />
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundImage: `url(${userinfo.profile_pic})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                </div>
            </form>
        </div>
    );
}

export default UserList;