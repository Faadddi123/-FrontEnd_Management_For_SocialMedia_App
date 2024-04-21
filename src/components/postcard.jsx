import React, { useEffect, useState } from 'react';
import './css/postcard.css';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import Timepassed from "./timepassed";

PostCard.propTypes = {
    Content: PropTypes.object.isRequired,
    onShare: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    HaveShare: PropTypes.bool,
    partaged_iiiid: PropTypes.number,
    user_id: PropTypes.number.isRequired
};

function handlePostComment(id, user_id) {
  console.log(id , user_id);
  const textareaElement = document.querySelector('.textarea');
  if (textareaElement) {
      const commentText = textareaElement.value;
  } else {
      console.error('Textarea element not found');
  }
  if (!commentText.trim()) {
      alert('Please enter a comment before posting!');
      return;
  }

  fetch('http://localhost/api/putacomment', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your-auth-token'
      },
      body: JSON.stringify({ text: commentText, displayed_id: id, user_id: user_id })
  })
  .then(response => response.json())
  .then(data => {
      console.log('Comment posted:', data);
      document.querySelector('.textarea').value = '';
  })
  .catch(error => console.error('Error posting comment:', error));
}



function PostCard(props) {
  const { Content, onShare, id , HaveShare , partaged_iiiid , user_id} = props;
  const [content, setContent] = useState(props.Content);
  const [commentVisibility, setCommentVisibility] = useState({});
  const [loadCount, setLoadCount] = useState(0);

  useEffect(() => {
    setLoadCount(prevCount => prevCount + 1);
    console.log(props);
  }, []);
  const handleToggleComment = (postId) => {
    setCommentVisibility(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };

  const handleCancelComment = (postId) => {
    setCommentVisibility(prevState => ({
      ...prevState,
      [postId]: false
    }));
  };


  return (
    <div className="card gedf-card">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="mr-2">
            <img className="rounded-circle" src="https://picsum.photos/50/50" width="45" alt="" />
          </div>
          <div className="ml-2">
            <div className="h5 m-0">{partaged_iiiid ? content.original_user_name : content.user_name}</div>
            <div className="h7 text-muted">{partaged_iiiid ? content.original_user_email : content.email}</div>
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
        <div className="card-text">
          <Timepassed key={content.updated_at} updated_at={partaged_iiiid ? content.partaged_updated_at : content.updated_at}/>
          <div className="h5 m-0 rounded border-0">{partaged_iiiid ? content.text : content.content_text}</div>
          <div>This component has been loaded {loadCount} times during this session.</div>
      </div>
        <p className="card-text">
          {partaged_iiiid ?
            <PostCard 
              key={0.5 * (content.id + content.partage_id) * (content.id + content.partage_id + 1) + content.partage_id}
              HaveShare={false}
              idofdisplayed={content.partage_id}
              Content={content}
              id={0.5 * (content.id + content.partage_id) * (content.id + content.partage_id + 1) + content.partage_id}
              onShare={() => onShare(content)}
            />
          : null}
        </p>
      </div>
      <div className="card-footer">
        {HaveShare && (
          <div>
            <button className="card-link border-0 text-primary text-decoration-underline bg-transparent" aria-label="Like">
              <i className="fa fa-gittip"></i> Like
            </button>
            <button className="card-link border-0 text-primary text-decoration-underline bg-transparent" onClick={() => handleToggleComment(id)}>
              <i className="fa fa-comment"></i> Comment
            </button>
            <button className="card-link border-0 text-primary text-decoration-underline bg-transparent" onClick={(e) => { e.preventDefault(); onShare(); }}>
              <i className="fa fa-mail-forward"></i> Share
            </button>
          </div>
        )}
      </div>
      {commentVisibility[id] && (
          <div className="bg-light p-2">
            <div className="d-flex flex-row align-items-start">
              <img className="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg" width="40" alt="" />
              <textarea className="form-control ml-1 shadow-0 textarea"></textarea>
            </div>
            <div className="mt-2 text-end">
            {/* onClick={handlePostComment(id ,user_id)} */}
            <button className="btn btn-primary btn-sm shadow-0" type="button" >Post comment</button>
              <button className="btn btn-outline-primary btn-sm ml-1 shadow-0" type="button" onClick={() => handleCancelComment(id)}>Cancel</button>
            </div>
          </div>
        )}
    </div>
  );
}

export default PostCard;