import { useState , useEffect} from "react";
// import "./css/messagebox.css"; //sdssdssqdfqsdsqdsqsqcscsdsqdqs
import Cookies from 'js-cookie';
import $ from 'jquery';
function MessageBox({ initialReceiverId, componentKey }) {
    const [isVisible, setIsVisible] = useState(true);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [receiverId, setReceiverId] = useState(initialReceiverId);
    const [username, setUsername] = useState('');
    const [lastSentMessageId, setLastSentMessageId] = useState(null);
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

    // Cleanup function to remove the event listener wthe component unmounts
    return () => {
        $(chatBoxSelector).off('click', toggleChat);
    };
}, [componentKey]); // Added componentKey as a dependency to re-bind if it changes


useEffect(() => {
    const loadMessages = async () => {
        const token = Cookies.get('token');
        try {
            const response = await fetch('http://localhost/api/loadingmessages', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    other_user_id: receiverId
                })
            });
            if (!response.ok) {
                throw new Error('Failed to load messages');
            }
            const loadedMessages = await response.json();
            setMessages(loadedMessages.reverse());
            if (loadedMessages.length > 0) {
                setLastSentMessageId(loadedMessages[0].id); // Assuming the latest message is at index 0 after reverse
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    loadMessages(); // Initial load

    const intervalId = setInterval(() => {
        if (lastSentMessageId !== null) {
            loadMessages(); // Start polling only if lastSentMessageId is set
        }
    }, 1000);

    return () => clearInterval(intervalId);
}, [receiverId, lastSentMessageId]);

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
            id: messages.length + 1, // Assuming IDs are sequential
            text: inputText,
            sender: 'Sender',
            receiver_id: receiverId,
            sender_id: Cookies.get('userId')
        };
        setMessages([...messages, newMessage]);
        setInputText('');
        try {
            const response = await fetch('http://localhost/api/sendmessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    message: newMessage.text,
                    receiver_id: newMessage.receiver_id
                })
            });
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
            const responseData = await response.json();
            setLastSentMessageId(responseData.id); // Update last sent message ID
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
   
      
        <div className="chat-main">
          <div className=" chat-header ">
            <div className="message-bar">
              <div className="col-md-6 username pl-2">
                <h6 className="m-0">{username}</h6>
              </div>
              <div className="options">
                    <i className="uil uil-plus icon-spacing" aria-hidden="true" onClick={handleClose}></i>
                    {/* <i className="fa fa-circle text-sulive-video icon-spacing" aria-hidden="true"></i> */}
                    <i className={`uil uil-times hide-chat-box${componentKey}`} aria-hidden="true" ></i>                </div>

            </div>
          </div>
          <div className={`chat-content${componentKey}`}>
            <div className=" chats">
              <ul className="p-0">
                {/* messaxxge sended */}
                {messages.map((message, index) => (
                    message.sender_id == Cookies.get('userId') ?
                    <li key={index} className="pl-2 pr-2 bg-primary rounded-pill text-white text-center send-msg mb-1">
                        <div className="p-1">{message.text}</div>
                    </li>
                    :
                    <li key={index} className="">
                        <div className="receive-msg">
                          <div className="receive-msg-desc ">
                              <p className="">
                                <div className="">
                                  {message.text}
                                </div>
                              </p>
                          </div>
                        </div>
                    </li>
                    ))}
              </ul>
            </div>
            <div className="message-input">
              <input type="text"                 
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="" placeholder="Type a message..." />
              <div className="uil tabler--send">
              </div>
            </div>
          </div>
        </div>
      
    
  );
}

export default MessageBox;