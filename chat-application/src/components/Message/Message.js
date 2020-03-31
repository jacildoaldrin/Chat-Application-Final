import React from 'react';

const Message = (props) => {
    let currentUser = (props.message.username === props.username);
    return currentUser ?
        (
        <div>
            <label><strong>You:</strong> {props.message.message}</label>
        </div>
        )
        :
        (
        <div>
            <label><strong>{props.message.username}:</strong> {props.message.message}</label>
        </div>
        );
}
 
export default Message;