import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chatbox = (props) => {
    return ( 
        <ScrollToBottom>
            {props.messages.map((message, index) => <div key={index}><div>{message}</div></div>)}
        </ScrollToBottom>
     );
}
 
export default Chatbox;