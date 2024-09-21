import React, { useState } from 'react';
import { useThemeModal } from '../context/thememodal';

function Sidebar({displayVid}) {
    const [activeItem, setActiveItem] = useState('home');
    const { openModal, closeModal, isModalOpen } = useThemeModal();
    const [counter , setCouner] = useState(0);
const menuItems = [
    { id: 'home', icon: 'uil uil-home', label: 'Home', onClick: () => { displayVid('home'); } },
    { id: 'explore', icon: 'uil uil-compass', label: 'Explore', onClick: () => { displayVid('vids'); } },
    // { id: 'messages', icon: 'uil uil-envelope-alt', label: 'Messages', notificationCount: 6 },
    { id: 'theme', icon: 'uil uil-palette', label: 'Theme', onClick: openModal }
];

    const handleCloseClick = (e) => {
        if (isModalOpen) {
            setCouner(counter + 1);
            console.log(counter);
            console.log('hhh');
            closeModal();
        }
    
    };

   const onClickBar = (id,isThemed = null)=>{
      
            setActiveItem(id)
            if(isThemed) openModal()
            else closeModal()
        
    }

    return (
        <>
            <div className="sidebar" onClick={handleCloseClick}>
                {menuItems.map(item => (

                    <a key={item.id} className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
                    onClick={() => {
                        onClickBar(item.id);
                        if (item.onClick) item.onClick();
                    }}>
                        <span><i className={item.icon}>{item.notificationCount && <small className="notification-count">{item.notificationCount}</small>}</i></span>
                        <h3>{item.label}</h3>
                    </a>
                ))}
            </div>
            <label className="btn btn-primary" htmlFor="create-post">Create Post</label>
        </>
    );
}

export default Sidebar;