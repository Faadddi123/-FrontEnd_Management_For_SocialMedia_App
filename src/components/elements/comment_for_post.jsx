import React , {useEffect} from 'react';
// import '../styles/avatarsqdsqdsqsdqilzezeze

function Comment({ userName, postTime, postContent,commenttt }) {

    function getTimeAgoText(updatedTime) {
        const currentTime = new Date();
        const timeDifference = currentTime - new Date(updatedTime);
        const minutesAgo = Math.floor(timeDifference / 60000);
  
        if (minutesAgo < 1) return "just now";
        if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
        const hoursAgo = Math.floor(minutesAgo / 60);
        if (hoursAgo < 24) return `${hoursAgo} hours ago`;
        const daysAgo = Math.floor(hoursAgo / 24);
        return `${daysAgo} days ago`;
    }
  useEffect(() => {
    console.log('test');
    console.log(commenttt);
  }, []);
    const timeAgo = getTimeAgoText(postTime);



  return (
    <div className="comment">
        
        <div >
            <div className="comment-content">

            <span className='name_user'>
                {userName}name :
            </span>
                {postContent}
            </div>
            <span>
                
                <div className="desc"><small>{timeAgo}</small></div>
            </span>
        </div>
        <i className="fa-regular fa-heart"></i>
    </div>
  );
}

export default Comment;