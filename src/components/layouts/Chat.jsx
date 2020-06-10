import React, { forwardRef } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import { Button } from '../';
import Input from '../forms/Input';

import { Send, AttachFile } from '@material-ui/icons';

import './Chat.scss';

export default forwardRef(
    (
        {
            data,
            messages,
            value,
            onChange,
            onSubmit,
            onLeave,
            onScroll,
            loading,
        },
        ref,
    ) => (
        <div className={`chat-wrapper elevation${loading ? ' loading' : ''}`}>
            <div className="chat-header"></div>

            <div className="chat-body" onScroll={onScroll} ref={ref}>
                {loading ? (
                    <div className="searching-users">
                        <h1>Searching for random new friends!</h1>
                        <CircularProgress color="inherit" />
                    </div>
                ) : (
                    <>
                        <div className="presentation">
                            You are now talking with a stranger!
                        </div>
                        {messages.map(
                            ({ content, user: { id, isCurrentUser } }, i) => {
                                return (
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
                                );
                            },
                        )}
                        <p id="dummy"></p>
                    </>
                )}
            </div>

            <div className="chat-footer">
                <form onChange={onChange} onSubmit={onSubmit}>
                    <Button
                        className="elevation"
                        id="exit"
                        disabled={loading}
                        onClick={onLeave}
                        label="ESC"
                    />

                    <Input
                        className="chat-input"
                        type="text"
                        value={value}
                        spellCheck={false}
                        placeholder="Type awesome things..."
                        rightIcon={
                            <Button
                                className="light"
                                id="attach"
                                disabled={loading}
                                elevation={false}
                                circular
                                label={<AttachFile />}
                            />
                        }
                    />

                    <Button
                        className="elevation"
                        type="submit"
                        id="send"
                        disabled={loading}
                        label={<Send fill="#ffffff" />}
                    />
                </form>
            </div>
        </div>
    ),
);
