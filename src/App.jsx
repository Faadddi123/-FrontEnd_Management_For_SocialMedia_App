import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Routes, useNavigate ,Navigate} from 'react-router-dom';
import LittleRegisterForm from './components/littleregister';
import LittleLoginForm from './components/littlelogin';
import Messageform from './components/messageform';
import MessageBox from './components/messagebox';
import NearbyUsers from "./components/requestusers";
import Postrequest from "./components/postrequest";
import PostCard from "./components/postcard";
function NavigationHandler() {
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);




 



  useEffect(() => {
    const validateToken = async () => {
      setIsLoading(true);
      const token = Cookies.get('token');
      if (!token) {
        setIsTokenValid(false);
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch('http://localhost/api/tokenvalidate', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        setIsTokenValid(response.ok);
      } catch (error) {
        console.error('Error validating token:', error);
        setIsTokenValid(false);
      }
      setIsLoading(false);
    };

    validateToken();
  }, []);

  useEffect(() => {
    if (isTokenValid !== null) {
      // navigate(isTokenValid ? "/messages" : "/login");
    }
  }, [isTokenValid, navigate]);



  if (isLoading) {
    return <div className="fixed-top d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div>Loading...</div>
    </div>;
  }


  return null; // This component does not risdfdsijfender dssanyssthing
}


function App() {
  const [messageBoxes, setMessageBoxes] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isSharing, setIsSharing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [text , setText] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('No token available');
      return;
    }

    try {
      const response = await fetch('http://localhost/api/posts/display', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data); // Assuming the data is ansqds array of posts
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };
  const handleAddMessageBox = (userId) => {
    const newBox = {
      userId: userId,
      key: Date.now() // Using the current timestamp as a unique key
    };

    // Add the new message box and remove tsqdhe first one if there are already four
    setMessageBoxes(prevBoxes => {
      const updatedBoxes = [...prevBoxes, newBox];
      if (updatedBoxes.length > 4) {
        return updatedBoxes.slice(1); // Remove the dqsdsqqfirst element
      }
      return updatedBoxes;
    });
  };



  function handleShare(postinfo) {
    setCurrentPostId(postinfo);
    console.log(postinfo);
    setIsSharing(true);
  }


  function handleTextChange(event) {
    console.log(event.target.value); // This will log the text input to the console
    // Handle text processing hsqdsqqsdsqere
  }



  const handleNewPost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost/api/importashare', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content_text: text }) // Senggugud only text as JSON
      });
      const responseData = await response.json();
      console.log(responseData);
      
      const userinfo = await getUserinfo(responseData.post.user_id);
      Object.assign(responseData.post, userinfo); // Merge userinfo into the post object
      const postinfo = responseData.post;
      console.log(postinfo);
      onPostSuccess(postinfo); // Call the onPostSuccess function passed as a prop
      handleClearingText();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  
  return (
  <Router>
    <NavigationHandler />
    <Routes>
      <Route path="/login" element={<LittleLoginForm />} />
      <Route path="/register" element={<LittleRegisterForm />} />
      <Route path="/messages" element={<Messageform />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/message" element={
        <div className="container">
          <div className="row " style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {messageBoxes.map((box, index) => (
              <div key={box.key} className="col-md-3 message-box" style={{ order: index * (-1) }}>
                <MessageBox initialReceiverId={box.userId} componentKey={box.key} />
              </div>
            ))}
          </div>
          <div className='container-fluid gedf-wrapper'>
            <div className='row '>
              <div className='col-md-4 '>
                <div className='fixed-top mt-8 col-md-4'>
                  <NearbyUsers onAddMessageBox={handleAddMessageBox} />
                </div>
              </div>
              <div className='col-md-6 gedf-main'>
                <Postrequest onPostSuccess={handleNewPost} />
                <div>
                  {posts.map(post => (
                    <PostCard key={post.id} Content={post} onShare={() => handleShare(post)} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      } />
    </Routes>
    {isSharing && (
      <div className="fixed-top d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}>
        <div className="card gedf-card">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="mr-2">  
            {/*  */}
            <img className="rounded-circle" src="https://picsum.photos/50/50" width="45" alt="" />
          </div>
          <div className="m-2">
            <input className="h5 m-0 rounded border-0" placeholder='type here ...'/>
          </div>
          <div>
            <div className="dropdown">
              <button className="fa fa-times border-0  btn-primary  " type="button"  onClick={() => setIsSharing(false)}>
              </button>
              
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">
        <PostCard key={currentPostId.id} Content={currentPostId} onShare={() => handleShare(currentPostId)} />
        </p>
      </div>
      <div className="card-footer">
        <button className="card-link btn btn-primary" >
          <i className="fa fa-mail-forward "></i> Share
        </button>
      </div>
    </div>
        
      </div>
    )}
  </Router>
);
}

export default App;