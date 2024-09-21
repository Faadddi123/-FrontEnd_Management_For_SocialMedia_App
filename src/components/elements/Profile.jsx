import React , {useState , useEffect}from 'react';
import Cookies from 'js-cookie';
import cover from '../../assets/image_elements/bg-profile.png';
// { info, cover }



async function fetchUserProfilePic(user_name) {

  const token = Cookies.get('token');
  if (!token) {
      console.error('No token available');
      return;
  }

  try {
      const response = await fetch(`http://localhost/api/getUserProfilePicUsingName/${user_name}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob(); 
      const url = URL.createObjectURL(blob); 
      return url; 
  } catch (error) {
      console.error('Error fetching user profile picture:', error);
      return null; 
  }
}


function ProfileCard({user_name}) {

  
    const [imageUrl , setimageUrl] = useState('');
    useEffect(() => {
      async function fetchAndSetImage() {
        const url = await fetchUserProfilePic(user_name);
        setimageUrl(url);
      }

      fetchAndSetImage();
    }, [user_name]);
  return (
    <div className='profil-card'>
      <div className='cover-profil'><img src={cover} alt="Cover"></img></div>
      <div className='profil-text'>
        <img className='avatar-profil' src={imageUrl} alt="Avatar"></img>
        <div className='text-info'>
          <p>{user_name}</p>
          <p className='userid'>@{user_name}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;