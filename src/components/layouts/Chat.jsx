import React from 'react';

import { Button } from '../';
import Input from '../forms/Input';

import { Send } from '@material-ui/icons';

import './Chat.scss';

export default ({ messages, value, onChange, onSubmit }) => {
    return (
        <div className="chat-wrapper elevation">
            <div className="chat-header"></div>

            <div className="chat-body">
                {messages.length ? (
                    messages.map(
                        ({ content, user: { isCurrentUser, kordy } }, i) => (
                            <div
                                key={i}
                                className={`message elevation${
                                    isCurrentUser ? ' is-user' : ''
                                }`}
                            >
                                {!isCurrentUser && (
                                    <div className="user">{kordy}</div>
                                )}
                                <div className="content">{content}</div>
                            </div>
                        ),
                    )
                ) : (
                    <div>No messages found...</div>
                )}
            </div>

            <div className="chat-footer">
                <form onChange={onChange} onSubmit={onSubmit}>
                    <Input
                        className="chat-input"
                        type="text"
                        value={value}
                        spellCheck={false}
                    />
                    <Button
                        type="submit"
                        id="send"
                        label={<Send color="primary" />}
                    />
                </form>
            </div>
        </div>
    );
};
