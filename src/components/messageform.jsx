import React, { useState , useEffect } from 'react';
import Cookies from 'js-cookie';

function MessagingForm({ initialReceiverId = 4 }) {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [receiverId, setReceiverId] = useState(initialReceiverId); // Initialize with a default or null
    

    
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
                        other_user_id: receiverId // Include receiver_id in the payload
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



    const handleSend = async () => {
        const token = Cookies.get('token');
        if (inputText.trim() !== '') {
            const newMessage = {
                id: messages.length + 2,
                text: inputText,
                sender: 'Sender' ,
                receiver_id: receiverId ,// Assuming youdsdsave this value set appropriately
                sender_id: 3
            };
            
            setMessages([...messages, newMessage]);
            // console.log(messages);
            setInputText('');

            try {
                const response = await fetch('http://localhost/api/sendmessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Replace `yourAuthToken` with the actual token
                    },
                    body: JSON.stringify({
                        message: newMessage.text,
                        receiver_id: newMessage.receiver_id // Include receiver_id in the payload
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

    return (
        <div>
            <div>
                {messages.map(message => (
                    
                    <p key={message.id}>
                        <strong>{message.sender_id !== Cookies.get('userId') ? 'You' : 'Other User'}:</strong> {message.text}
                    </p>
                ))}
            </div>
            <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}

export default MessagingForm;