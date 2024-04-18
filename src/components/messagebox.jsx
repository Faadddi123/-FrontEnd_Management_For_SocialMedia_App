import { useState , useEffect} from "react";
import "./css/messagebox.css"; //sdssdssqdfqsdsqdsqsqcscsdsqdqs
import Cookies from 'js-cookie';
import $ from 'jquery';
function MessageBox({ initialReceiverId, componentKey }) {
    const [isVisible, setIsVisible] = useState(true);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [receiverId, setReceiverId] = useState(initialReceiverId);
    const [username, setUsername] = useState('');
  const handleClose = () => {
    setIsVisible(false);
  };


  useEffect(() => {
    console.log("Fetching username for ID:", initialReceiverId);
    getUsername(initialReceiverId).then(data => {
        setUsername(data.name);
        console.log("Fetched username:", data.name);
    }).catch(error => console.error('Failed to fetch username:', error));
}, [initialReceiverId]);




useEffect(() => {




    const toggleChat = () => {
        $(`.chat-content${componentKey}`).slideToggle();
    };

    const chatBoxSelector = `.hide-chat-box${componentKey}`;
    $(chatBoxSelector).on('click', toggleChat);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
        $(chatBoxSelector).off('click', toggleChat);
    };
}, [componentKey]); // Added componentKey as a dependency to re-bind if it changes


  useEffect(() => {
        
    const loadMessages = async () => {
        const token = Cookies.get('token');
        // console.log(Cookies.get('userId'));
        // if (initialReceiverId === Cookies.get('userId')){
        //     setReceiverId(3);
        //     console.log(receiverId);
        // }
        try {
            const response = await fetch('http://localhost/api/loadingmessages', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    other_user_id: receiverId // Include receiver_id ine payload
                })
            });
            if (!response.ok) {
                throw new Error('Failed to load messages');
            }
            const loadedMessages = await response.json();
            // console.log(loadMessages);
            setMessages(loadedMessages.reverse());
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    loadMessages();
}, []);

async function getUsername(id) {
  const token = Cookies.get('token'); // Ensure you have qsddsaccess to 'Cookies'
  try {
      const response = await fetch(`http://localhost/api/getusername/${id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      });
      if (!response.ok) {
          throw new Error('Failed to fetch username');
      }
      const data = await response.json();
      console.log(data);
      return data; // This will return the fetched data
  } catch (error) {
      console.error('Error fetching username:', error);
  }
}

const handleSend = async () => {
    const token = Cookies.get('token');
    if (inputText.trim() !== '') {
        const newMessage = {
            id: messages.length + 2,
            text: inputText,
            sender: 'Sender' ,
            receiver_id: receiverId ,// Assuming you have this value set appropriately
            sender_id: Cookies.get('userId')
        };
        setMessages([...messages, newMessage]);
        // console.log(messages);
        setInputText('');
        console.log(Cookies.get('userId'));
        try {
            const response = await fetch('http://localhost/api/sendmessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Replace `yourAuthToken` the actual token
                },
                body: JSON.stringify({
                    message: newMessage.text,
                    receiver_id: newMessage.receiver_id // Include receiver_id in the payl
                })
            });
            // console.log(token);
            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const responseData = await response.json();
            console.log('Message sent successfully:', responseData);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
};

const handleInputChange = (e) => {
    setInputText(e.target.value);
};

const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        handleSend();
    }
};



//   if (!isVisible) return null;

  return (
    <div className="container">
      {/* <div className="row ptqsdqs-3"sqd> */}
        <div className="chat-main">
          <div className="col-md-12 chat-header rounded-top bg-primary text-white">
            <div className="row">
              <div className="col-md-6 username pl-2">
                <i className="fa fa-circle text-success" aria-hidden="true"></i>
                <h6 className="m-0">{username}</h6>
              </div>
              <div className="col-md-6 options text-right pr-2 d-flex justify-content-between align-items-center">
                    <i className="fa fa-plus icon-spacing" aria-hidden="true"></i>
                    <i className="fa fa-circle text-success live-video icon-spacing" aria-hidden="true"></i>
                    <i className="fa fa-phone icon-spacing" aria-hidden="true"></i>
                    <i className="fa fa-cog icon-spacing" aria-hidden="true"></i>
                    <i className={`fa fa-times hide-chat-box${componentKey}`} aria-hidden="true" onClick={handleClose}></i>                </div>

            </div>
          </div>
          <div className={`chat-content${componentKey}`}>
            <div className="col-md-12 chats border bg-white">
              <ul className="p-0">
                {/* messaxxge sended */}
                {messages.map((message, index) => (
                    message.sender_id == Cookies.get('userId') ?
                    <li key={index} className="pl-2 pr-2 bg-primary rounded-pill text-white text-center send-msg mb-1">
                        <div className="p-1">{message.text}</div>
                    </li>
                    :
                    <li key={index} className="p-1 rounded mb-1">
                        <div className="receive-msg">
                        <div className="receive-msg-desc text-center mt-1 ml-1 pl-2 pr-2">
                            <p className="pl-2 pr-2 rounded-pill">
                              <div className="p-1">
                                {message.text}
                              </div>
                            </p>
                        </div>
                        </div>
                    </li>
                    ))}
              </ul>
            </div>
            <div className="col-md-12 message-box border pl-2 pr-2 border-top-0 bg-white">
              <input type="text"                 
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="pl-0 pr-0 w-100" placeholder="Type a message..." />
              <div className="tools">
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default MessageBox;