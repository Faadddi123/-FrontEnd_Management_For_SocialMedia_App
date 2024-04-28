
import React , {useEffect , useState} from "react";
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import Timepassed from "./timepassed";
import Comment_displaying from './elements/comment_for_post';

Feed.propTypes = {
    Content: PropTypes.object.isRequired,
    onShare: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    HaveShare: PropTypes.bool,
    partaged_iiiid: PropTypes.number
};

function fetchCommentsForDisplayedId(displayedId, setComments, setCommentVisibility) {
  const token = Cookies.get('token'); 
  fetch(`http://localhost/api/comments/displayed/${displayedId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(responseData => {
    if (responseData.data && Array.isArray(responseData.data)) {
      setComments(responseData.data);
      setCommentVisibility(prevState => ({ ...prevState, [displayedId]: true }));
      console.log(responseData.data);
    } else {
      console.error('Expected responseData.data to be an array, got:', responseData);
    }
  })
  .catch(error => console.error('Error fetching comments:', error));
}

async function handlePostComment(id, setComments, user) {
  console.log(user);
  const textareaElement = document.querySelector(`#textarea-${id}`);
  const token = Cookies.get('token');
  if (textareaElement && textareaElement.value.trim()) {
    const commentText = textareaElement.value;
    try {
      const response = await fetch('http://localhost/api/putacomment', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: commentText, displayed_id: id })
      });
      const data = await response.json();
      console.log('Comment posted:', data);
      textareaElement.value = '';
      setComments(prevComments => [...prevComments, { ...data, user: { name: user.user_name }, created_at: new Date() , text:commentText}]);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  } else {
    alert('Please enter a comment before posting!');
  }
}
function Feed(props) {
    const { Content, onShare, id, HaveShare, partaged_iiiid , user , would_display_image} = props;
    const [content, setContent] = useState(Content);
    const [comments, setComments] = useState([]);
    const [commentVisibility, setCommentVisibility] = useState({});
    const [loadCount, setLoadCount] = useState(0);
    const [activeHearts, setActiveHearts] = useState({}); 
    const [imageUrl, setImageUrl] = useState('');


    const toggleHeartActive = (contentId) => {
      setActiveHearts(prevState => ({
          ...prevState,
          [contentId]: !prevState[contentId]
      }));
  };

useEffect(() => {
    if ((content.element_type !== 'nothing' && content.element_path !== 'nothing') && (!partaged_iiiid  || would_display_image)) {
        if(content.element_type == 1){
          fetch(`http://localhost/api/media/checkback/${content.element_path}`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
        })
        .then(response => response.blob()) // Handling the response as
        .then(blob => {
            const url = URL.createObjectURL(blob);
            setImageUrl(url); // Set the image URL for 
            console.log('Deployment successful:', url);
        })
        .catch(error => console.error('Error fetching media:', error));
        }else if(content.element_type == 2){
          fetch(`http://localhost/api/media/videoback/${content.element_path}`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
        })
        .then(response => response.blob()) // Handling the response as
        .then(blob => {
            const url = URL.createObjectURL(blob);
            setImageUrl(url); // Set the image URL for 
            console.log('Deployment successful:', url);
        })
        .catch(error => console.error('Error fetching media:', error));
        }
    }
}, [content.element_type, content.element_path]);
    useEffect(() => {
      setLoadCount(prevCount => prevCount + 1);
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
        <div className="feed">
            <div className="head">
                <div className="user">
                    <div className="profile-photo">
                        <img src="./images/profile-13.jpg" alt="Profile"/>
                    </div>
                    <div className="info">
                        <h3>{partaged_iiiid ? content.original_user_name : content.user_name}</h3>
                        <small>          
                            <Timepassed key={content.updated_at} updated_at={partaged_iiiid ? content.partaged_updated_at : content.updated_at}/>
                        </small>
                    </div>
                </div>
                <span className="edit">
                {HaveShare && (
                    <i className="uil uil-ellipsis-h"></i>
                )}
                </span>
            </div>
            <div className="post-text">
            {partaged_iiiid ? content.text : (content.content_text === "nothing" ? null : content.content_text)}              

            </div>
            {partaged_iiiid ?
            <div className='shared-post'>
                    
                    <Feed 
                    key={0.5 * (content.id + content.partage_id) * (content.id + content.partage_id + 1) + content.partage_id}
                    HaveShare={false}
                    idofdisplayed={content.partage_id}
                    Content={content}
                    id={0.5 * (content.id + content.partage_id) * (content.id + content.partage_id + 1) + content.partage_id}
                    onShare={() => onShare(content)}
                    />
                
            </div>
            : null}
            
            <div className="photo">
            {content.element_path && (!partaged_iiiid || would_display_image) ? (
                content.element_type == 1 ? 
                <img src={imageUrl} alt="Feed" /> :
                content.element_type == 2 ?
                <video src={imageUrl} controls alt="Feed Video" /> :
                null
            ) : null}
                
 
            </div>

            <div className="action-buttons">
                {HaveShare && (
                    <>
                        <div className="interaction-buttons">
                        <span id={`heartfor${content.id}`} onClick={() => toggleHeartActive(content.id)}><i className={`uil uil-heart ${activeHearts[content.id] ? 'active' : ''}`}></i></span>
                            <span   onClick={() => handleToggleComment(id)}><i className="uil uil-comment-dots"></i></span>
                            <span  onClick={(e) => { e.preventDefault(); onShare(); }}><i className="uil uil-share-alt"></i></span>
                        </div>
                        <div className="bookmark">
                            <span><i className="uil uil-bookmark-full" ></i></span>
                        </div>
                    </>
                )}
                
            
            </div>
            {HaveShare && (
            <>
                {/* <div className="liked-by">
                    <span><img src="./images/profile-10.jpg" alt="Profile 10"/></span>
                    <span><img src="./images/profile-4.jpg" alt="Profile 4"/></span>
                    <span><img src="./images/profile-15.jpg" alt="Profile 15"/></span>
                    <p>Liked by <b>Ernest Achiever</b> and <b>2, 323 others</b></p>
                </div>

                <div className="caption">
                    <p><b>Lana Rose</b> Lorem ipsum dolor sit quisquam eius. 
                    <span className="harsh-tag">#lifestyle</span></p>
                </div> */}
                <a className="cursor-pointer">
                {!commentVisibility[id] && (
                  <div className="comments text-muted" onClick={(e) => { e.preventDefault(); fetchCommentsForDisplayedId(content.displayed_id, setComments, setCommentVisibility); }}>
                    View all 277 comments
                      
                  </div>
                )}
                </a>
                {commentVisibility[id] && comments.map(comment => (
                  <div class="comments_displayed">
                    <Comment_displaying 
                    key={0.5 * (comment.id + comment.displayed_id) * (comment.id + comment.displayed_id + 1) + comment.displayed_id}
                    userName={comment.user.name}
                    postTime={comment.created_at}
                    postContent={comment.text}
                    commenttt = {comment}
                    />
                  </div>
                
                ))}
                {commentVisibility[id] && (
                  
                <div className="addComments">
                <div className="reaction">
                  <h3><i className="far fa-smile"></i></h3>
                  {/* ddddddddddddd */}
                  
                  {/* ddddddddd */}
                </div>
                <input type="text"
                       className="text"
                       placeholder="Add a comment..."
                       id={`textarea-${id}`}
                       />
                <button onClick={() => handlePostComment(id, setComments, user)} className="Pooost">Post</button>
              </div>
            )}
            </>
            )}
            
     
        </div>
    );
}

export default Feed;