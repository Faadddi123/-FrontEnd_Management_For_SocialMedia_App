import React , {useEffect}from 'react';
import './css/commentsection.css';
function Comment_visibility({ userName, postTime, postContent,commenttt }) {

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
<div className="media-block">
  <a className="media-left p-8" href="#">
    <img className="img-circle img-sm" alt="Profile Picture" src="https://bootdey.com/img/Content/avatar/avatar2.png" />
  </a>
  <div className="media-body">
    <div className="mar-btm">
      <a href="#" className="btn-link text-semibold media-heading box-inline">{userName}</a>
      <p className="text-muted text-sm"> {timeAgo}</p>
    </div>
    <p>{postContent}</p>
    <div className="pad-ver">
      <div className="btn-group">
        <a className="btn btn-sm btn-default btn-hover-success active" href="#"><i className="fa fa-thumbs-up"></i> You Like it</a>
        <a className="btn btn-sm btn-default btn-hover-danger" href="#"><i className="fa fa-thumbs-down"></i></a>
      </div>
      <a className="btn btn-sm btn-default btn-hover-primary" href="#">Comment</a>
    </div>
    <hr />
  </div>
</div>
  );
}

export default Comment_visibility;