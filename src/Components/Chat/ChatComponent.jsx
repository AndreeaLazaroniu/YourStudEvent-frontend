import React, { useEffect } from 'react';
import { signalRService } from './SignalRService';

export const ChatComponent = () => {
    useEffect(() => {
        signalRService.start();
        signalRService.addToGroup("myGroup");
    }, []);

    const sendMessage = () => {
        signalRService.send("myGroup", "Hello, world!");
    };

    return (
        <button onClick={sendMessage}>Send Message</button>
    );
};

export default ChatComponent;