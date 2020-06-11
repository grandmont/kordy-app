import React, { useState, forwardRef } from 'react';
import CustomScrollbar from 'react-scrollbars-custom';

import CircularProgress from '@material-ui/core/CircularProgress';

import { Button } from '../';
import Input from '../forms/Input';

import { Send, AttachFile } from '@material-ui/icons';

import './Chat.scss';

export default forwardRef(
    ({ data, messages, onSubmit, onLeave, status }, ref) => {
        const [message, setMessage] = useState('');

        const statusComponent = {
            loading: (
                <div className="chat-off">
                    <h1 className="title">Searching for random new friends!</h1>
                    <CircularProgress
                        className="circular-loader"
                        color="inherit"
                    />
                </div>
            ),
            on: (
                <>
                    <div className="presentation">
                        You are now talking with a stranger!
                    </div>
                    {messages.map(
                        ({ content, user: { id, isCurrentUser } }, i) => (
                            <div
                                key={i}
                                className={`message ${
                                    isCurrentUser ? ' is-user' : ''
                                }${
                                    id !== messages[i - 1]?.user.id
                                        ? ' first'
                                        : ''
                                }`}
                            >
                                <div className="content">{content}</div>
                            </div>
                        ),
                    )}
                </>
            ),
            off: (
                <div className="chat-off">
                    <h1 className="title">The chat ended :(</h1>
                    <p className="sub-title">But don't give up yet!</p>
                    <Button label="Let's try again?" />
                </div>
            ),
        };

        return (
            <div ref={ref} className={`chat-wrapper elevation ${status}`}>
                <div className="chat-header"></div>

                <div className="chat-body">
                    <CustomScrollbar disableTrackYWidthCompensation noScrollX>
                        {statusComponent[status]}
                        <span id="dummy" />
                    </CustomScrollbar>
                </div>

                <div className="chat-footer">
                    <form
                        className="elevation"
                        onChange={({ target: { value } }) => setMessage(value)}
                        onSubmit={(event) => {
                            event.preventDefault();
                            // Clear the text input
                            if (message.length) {
                                onSubmit(message);
                                setMessage('');
                            }
                        }}
                    >
                        <Input
                            className="chat-input"
                            type="text"
                            value={message}
                            spellCheck={false}
                            placeholder="Type awesome things..."
                            rightIcon={
                                <Button
                                    id="attach"
                                    className="light"
                                    elevation={false}
                                    label={<AttachFile />}
                                    circular
                                />
                            }
                        />
                        <Button
                            id="send"
                            type="submit"
                            label={<Send fill="#ffffff" />}
                        />
                    </form>
                </div>
            </div>
        );
    },
);
