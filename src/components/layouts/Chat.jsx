import React, { useState, forwardRef, useRef } from 'react';
import api from '../../services/api';
import CustomScrollbar from 'react-scrollbars-custom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Button } from '../';
import Input from '../forms/Input';

import Icon from '@mdi/react';
import { mdiSend, mdiPaperclip } from '@mdi/js';

import './Chat.scss';

export default forwardRef(
    ({ data, messages, onSubmit, onLeave, status }, ref) => {
        const [message, setMessage] = useState('');

        const fileInputRef = useRef(null);

        const handleFileInput = ({ target: { files } }) => {
            console.log(files);
            const form = new FormData();

            [...files].forEach((file) => form.append('files', file));

            api.post('/createPost', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => console.error(error));
        };

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
                                    onClick={() => fileInputRef.current.click()}
                                    label={
                                        <Icon
                                            path={mdiPaperclip}
                                            size={1}
                                            color="#303030"
                                        />
                                    }
                                    circular
                                />
                            }
                        />
                        <Button
                            id="send"
                            type="submit"
                            label={
                                <Icon path={mdiSend} size={1} color="#ffffff" />
                            }
                        />
                    </form>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileInput}
                    multiple
                    hidden
                />
            </div>
        );
    },
);
