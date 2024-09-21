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
import Timepassed from "./components/timepassed";
import Navbar from './components/navbar';
import Profile_name from './components/profile_name';
import Sidebar from './components/sidebar';
import Inputform from './components/inputform';
import PostForm from './components/postform';
import Messageelements from './components/messageelements';
import CustomizeTheme from './components/customisation';
import { ThemeModalProvider } from './context/thememodal';
import ProfileCard from './components/elements/Profile';
import SendPic from './components/SendImage/MediaUpload';
import { event } from 'jquery';
import './App.css' ;





function NavigationHandler() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(null);


console.count('loading')
 



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
      navigate(isTokenValid ? "/home" : "/login");
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
  const [infouserinfo , seteuserinfo] = useState([]);
  const [TextForShare , setTextForShare] = useState('');
  const [postinfosspecifique , setpostinfosspecifique] = useState([]);
  const [SharedContent , setSharedContent] = useState([]);
  const [profilePic, setProfilePic] = useState('');
  const [ShowProfile , setShowProfile] = useState(false);
  const [ShowProfileName , setShowProfileName] = useState('');
  useEffect(() => {
    getUserinfo();
    fetchPosts();
    if(Cookies.get('token')){

      fetchProfilePic().then(picUrl => {
        setProfilePic(picUrl);
      });

    }
    
  }, []);




async function fetchProfilePic() {
  const token = Cookies.get('token');
  if (!token) {
    console.error('No token available');
    return;
  }

  try {
    const response = await fetch('http://localhost/api/gettheauthprofilpic', {
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
    console.error('Error fetching profile picture:', error);
    return null; 
  }
} 


  const getUserinfo = async () => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('No token available');
      return;
    }
    try {
      const response = await fetch('http://localhost/api/getusernameoftheauth', {
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
      seteuserinfo(data);
      console.log(data); 
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };


  // async function getUsername(id) {
  //   console.log(id);
  //   const token = Cookies.get('token');
  //   if (!token) {
  //     console.error('No token available');
  //     return undefined;
  //   }
  //   try {
  //     const response = await fetch(`http://localhost/api/getusername/${id}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch username');
  //     }
  //     const data = await response.json();
  //     // Assuming the username is stored under a key 'name' in the response data
  //     return data.name; // Directly return the name
  //   } catch (error) {
  //     console.error('Error fetching username:', error);
  //     return undefined; // Return undefined in case of any error
  //   }
  // }

  function displayVid(contentType) {
      if (contentType === 'home') {
        fetchPosts();
      } else if (contentType === 'vids') {
        handleDisplayingOnlyVideos();
      }
  }

  const handleDisplayingOnlyVideos = async () => {
    setShowProfile(false);

    const token = Cookies.get('token');
    if (!token) {
      console.error('No token available');
      return;
    }
    try {
      
      const response = await fetch('http://localhost/api/posts/displayVidPosts', {
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
      setPosts(data); 
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  

  };

  const fetchPosts = async () => {
    setShowProfile(false);
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
      setPosts(data); 
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };



  const ShowProfileElements = async (profilename) => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('No token available');
      return;
    }

    try {
      const url = `http://localhost/api/posts/displayProfile/${encodeURIComponent(profilename)}`;
        const response = await fetch(url, {
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
      setPosts(data); 
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };


  function displayProfile(profilename){
    console.log(profilename);
    setShowProfileName(profilename);
    setShowProfile(true);
    ShowProfileElements(profilename);
  }

  const handleAddMessageBox = (userId) => {
    const newBox = {
      userId: userId,
      key: Date.now() // Using the current timestamp as a unique key
    };

   
    setMessageBoxes(prevBoxes => {
      const updatedBoxes = [...prevBoxes, newBox];
      if (updatedBoxes.length > 4) {
        return updatedBoxes.slice(1); // Remove the dqsdsqqfirst element
      }
      return updatedBoxes;
    });
  };

  

  function handleShare(postinfo) {
    console.log(postinfo)
    setCurrentPostId(postinfo);
   
    setIsSharing(true);
  }


  function handleTextChange(event) {
    console.log(event.target.value); 

  }


  const handleNewPost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
    console.log(posts);
  };

  const handleTextChangeForShareInput = (event) => {
    setTextForShare(event.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost/api/importashare', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content_text: text }) 
      });
      const responseData = await response.json();
      console.log(responseData);
      
      const userinfo = await getUserinfo(responseData.post.user_id);
      Object.assign(responseData.post, userinfo); 
      const postinfo = responseData.post;
      console.log(postinfo);
      onPostSuccess(postinfo); 
      handleClearingText();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  useEffect(()=>{

  },[])



  async function handleShareClick() {
    const inputText = TextForShare; 
    const postId = currentPostId.id; 
    console.log(currentPostId)
    const token = Cookies.get('token');
    if (!token) {
      console.error('No token available');
      return;
    }
    try {
      const response = await fetch('http://localhost/api/importashare', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: inputText, post_id: postId }) // Updated to use text and postId
      });
      const responseData = await response.json();
  ;
      setIsSharing(false);
      
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  
  return (
    
  <Router>
    <NavigationHandler />
  
    
    <Routes>
      <Route path="/login" element={
      <main>

          <div className='Login'>
            <div className='card'>

            <LittleLoginForm  />
            </div>
          </div>

      </main>
      } />
      <Route path="/register" element={
        <main>
          <div className='Register'>
            <div className='card'>  
              <LittleRegisterForm />
            </div>
          </div>
        </main>
      
      } />
      <Route path="/messages" element={<Messageform />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/message" element={
        <div className="container">
          <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
            {messageBoxes.map((box, index) => (
              <div key={box.key} className="message-box" style={{ order: index * (-1) }}>
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
                    
                      <PostCard key={0.5*(post.id + post.partage_id)*(post.id + post.partage_id +  1) + post.partage_id} id={post.displayed_id} Content={post} HaveShare={true}  partaged_iiiid = {post.partage_id} user = {infouserinfo} idofdisplayed = {post.id} onShare={() => handleShare(post)} />
                     
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      } />
      <Route path="/home" element={
        <>
        <Navbar profilePic={profilePic}/>
        <ThemeModalProvider>
          <main>
          <div className="row">
            {messageBoxes.map((box, index) => (
              <div key={box.key}  className={`message-box col-${index + 1}`}>
                <MessageBox initialReceiverId={box.userId} componentKey={box.key} />
              </div>
            ))}
          </div>
            <div className="container">
              <div className="left">

                <Profile_name profilePic={profilePic} username={infouserinfo.user_name}/>
              
                <Sidebar displayVid={displayVid}/>
              </div>
              <div className="middle">
                {!ShowProfile ? <Inputform profilePic={profilePic} onPostSuccess={handleNewPost}/> : null}
                <div className="feeds">
                    {ShowProfile? <ProfileCard user_name = {ShowProfileName}/> : null} 
                  {posts.map(post => (
                      <PostForm
                          key={0.5 * (post.id + post.partage_id) * (post.id + post.partage_id + 1) + post.partage_id}
                          id={post.displayed_id}
                          Content={post}
                          HaveShare={true}
                          for_sharing={true}
                          partaged_iiiid={post.partage_id}
                          user={infouserinfo}
                          idofdisplayed={post.id}
                          onShare={() => handleShare(post)}
                          ShowProfilFor={displayProfile} 
                      />
                  ))}
                </div>

              </div>
              <div className="right">
                <div className="messages">

                  <Messageelements onAddMessageBox={handleAddMessageBox}/>
                </div>

              </div>
            </div>
          </main>

          <CustomizeTheme />
        
        </ThemeModalProvider>
        </>
      } />
    </Routes>
    {isSharing && (
      <div className="overlay">
        <div className="feed">
          <div className="head">
              <div className="user">
                  <div className="profile-photo">
                      <img src={profilePic} alt='pic'/>
                  </div>
                  <div className="info">
                      <h3>{infouserinfo.user_name}</h3>
                      
                  </div>
              </div>
              <span className="edit " onClick={() => setIsSharing(false)}>
                  <i className="uil uil-multiply"></i>
              </span>
          </div>
          <div>
          <input className="Input-for-overlay input-container" placeholder='type here ...' value={TextForShare} onChange={handleTextChangeForShareInput}/>
          <hr />
          </div>
          <div className='shared-post original-shared'>
          <PostForm key={0.5*(currentPostId.id + currentPostId.partage_id)*(currentPostId.id + currentPostId.partage_id +  1) + currentPostId.partage_id} id
                ={0.5*(currentPostId.id + currentPostId.partage_id)*(currentPostId.id + currentPostId.partage_id +  1) + currentPostId.partage_id} HaveShare = {false} Content={currentPostId} would_display_image = {true}  onShare={() => handleShare(currentPostId)} />
          </div>
          {/* <div className="photo">
              <img src="./images/profile-13.jpg" alt="Profile" />
              
          </div> */}

          <div className="action-buttons">
              <div className="interaction-buttons">
                  {/* <span><i className="uil uil-heart"></i></span>
                  <span><i className="uil uil-comment-dots"></i></span> */}
                  <span onClick={handleShareClick}><i className="uil uil-share-alt"></i></span>
              </div>
              {/* <div className="bookmark">
                  <span><i className="uil uil-bookmark-full"></i></span>
              </div> */}
          </div>

          
        </div>

      </div>  
    )}
  </Router>
);
}

export default App;