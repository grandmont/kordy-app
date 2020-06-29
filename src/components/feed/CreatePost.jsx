import React, { useState, useEffect, useContext, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import api from '../../services/api';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@mdi/react';
import { mdiClose, mdiEmoticonCoolOutline, mdiImageMultiple } from '@mdi/js';

import { Button } from '../';
import { Input } from '../forms';

import { AuthContext } from '../../config/contexts/AuthContext';

import './CreatePost.scss';

const INPUT_LIMIT = 8;

export default ({ onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [thumbnails, setThumbnails] = useState([]);
    const [content, setContent] = useState('');

    const { currentUser } = useContext(AuthContext);

    const fileInputRef = useRef(null);

    const revokeThumbnails = () => {
        thumbnails.forEach(({ url }) => URL.revokeObjectURL(url));
    };

    const handleFileInput = ({ target: { files: targetFiles } }) => {
        if (files.length >= INPUT_LIMIT) return;

        const newFiles = [...targetFiles].map((file) =>
            Object.assign(file, { id: uuidv4() }),
        );

        setFiles([...files, ...newFiles].slice(0, INPUT_LIMIT));
    };

    const handleRemoveFile = (id) => {
        setFiles(files.filter((file) => file.id !== id));
    };

    useEffect(() => {
        revokeThumbnails();

        setThumbnails(
            [...files].map((file) => ({
                id: file.id,
                url: URL.createObjectURL(file),
            })),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files]);

    const handleCreatePost = () => {
        if (!content && !files.length) return;

        setLoading(true);

        const form = new FormData();
        files.forEach((file) => form.append('files', file));
        form.append('content', content);

        api.post('/createPost', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(({ data }) => {
                const { id: postId } = data;
                onSuccess(postId);
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setLoading(false);
                setContent('');
                setFiles([]);
            });
    };

    return (
        <div
            className={`create-post-wrapper post-wrapper elevation${
                loading ? ' loading' : ''
            }`}
        >
            {loading && (
                <div className="post-loader">
                    <CircularProgress color="inherit" />
                </div>
            )}
            <div className="create-post-header">
                <h1 className="title">Create a new post</h1>
                <Button
                    circular
                    className="close-post"
                    onClick={onClose}
                    label={<Icon path={mdiClose} size={0.75} color="#ffffff" />}
                />
            </div>
            <div className="divider horizontal" />
            <div className="post-header">
                <Avatar src={currentUser?.profile} />

                <div className="post-info">
                    <p className="kordy">{currentUser?.kordy}</p>
                </div>
            </div>

            <div className="post-body">
                <Input
                    className="create-post-textarea"
                    placeholder={`What are you thinking, ${currentUser?.kordy}?`}
                    onChange={({ target: { value } }) => setContent(value)}
                    value={content}
                    spellCheck={false}
                    rows={3}
                    rowsMax={10}
                    multiline
                />
            </div>
            <div className={`thumbnails${thumbnails.length ? ' open' : ''}`}>
                {thumbnails.map(({ url, id }) => (
                    <div key={id} className="thumbnail elevation">
                        <img src={url} alt={`thumbnail-${id}`} />
                        <Button
                            className="remove-thumbnail"
                            onClick={() => handleRemoveFile(id)}
                            circular
                            label={
                                <Icon
                                    path={mdiClose}
                                    size={0.75}
                                    color="#ffffff"
                                />
                            }
                        />
                    </div>
                ))}
            </div>

            <div className="post-footer">
                <div className="post-actions">
                    <Button
                        circular
                        light
                        label={
                            <Icon
                                path={mdiEmoticonCoolOutline}
                                size={1.1}
                                color="#303030"
                            />
                        }
                    />
                    <Button
                        light
                        elevation={false}
                        disabled={files.length >= INPUT_LIMIT}
                        onClick={() => fileInputRef.current.click()}
                        label={
                            <Icon
                                path={mdiImageMultiple}
                                size={1}
                                color="#303030"
                            />
                        }
                        circular
                    />
                </div>
                <Button onClick={handleCreatePost} label="Create post" />
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
};
