import React , {useState  , useEffect} from 'react';

function Profile(props) {
    const [profilePic , setProfilePic] = useState('');

    useEffect(() => {
        console.log(props);
        setProfilePic(props.profilePic);
    }, [props.profilePic])
    return (
        <a className="profile">
            <div className="profile-photo">
                <img src={profilePic} alt="Profile" />
            </div>
            <div className="handle">
                <h4>{props.username}</h4>
                <p className="text-muted">
                    @{props.username}
                </p>
            </div>
        </a>
    );
}

export default Profile;