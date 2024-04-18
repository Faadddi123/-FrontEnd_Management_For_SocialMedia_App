import React from 'react';
import './css/postcard.css';
import PropTypes from 'prop-types';


PostCard.propTypes = {
  Content: PropTypes.object.isRequired,
  onShare: PropTypes.func.isRequired
};
  

function PostCard(props) {

  const { Content, onShare } = props;
  // Convert time difference to a more readqsdjnsable format
  
  function getTimeAgoText(updatedTime) {
    const currentTime = new Date();
    const timeDifference = currentTime - new Date(updatedTime);
    const minutesAgo = Math.floor(timeDifference / 60000);
  
    if (minutesAgo > 60) {
      const hoursAgo = Math.floor(minutesAgo / 60);
      if (hoursAgo > 24) {
        const daysAgo = Math.floor(hoursAgo / 24);
        return `${daysAgo} days ago`;
      }
      return `${hoursAgo} hours ago`;
    }
    return `${minutesAgo} minutes ago`;
  }
  
  const timeAgoText = getTimeAgoText(props.Content.updated_at);

  return (
    <div className="card gedf-card">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="mr-2">
            {/*  */}
            <img className="rounded-circle" src="https://picsum.photos/50/50" width="45" alt="" />
          </div>
          <div className="ml-2">
            <div className="h5 m-0">{props.Content.user_name}</div>
            <div className="h7 text-muted">{props.Content.email}</div>
          </div>
          <div>
            <div className="dropdown">
              <button className="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-ellipsis-h"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                <div className="h6 dropdown-header">Configuration</div>
                <a className="dropdown-item" href="#">Save</a>
                <a className="dropdown-item" href="#">Hide</a>
                <a className="dropdown-item" href="#">Report</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i>{timeAgoText}</div>
        <p className="card-text">
          {props.Content.content_text}
        </p>
      </div>
      <div className="card-footer">
        <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>
        <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a>
        <button className="card-link" onClick={(e) => { e.preventDefault(); onShare(); }}>
          <i className="fa fa-mail-forward"></i> Share
        </button>
      </div>
    </div>
  );
}

export default PostCard;