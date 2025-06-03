import React, { useEffect } from 'react';
import { useDocument } from '../hooks/useDocument';
import { usePresence } from '../hooks/usePresence';
import Sidebar from './Sidebar';

const DocumentEditor = () => {
    const { content, updateContent } = useDocument();
    const { users, trackCursor } = usePresence();

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                // Prevent default behavior for Enter key
                event.preventDefault();
            }
        };

        document.addEventListener('keypress', handleKeyPress);
        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

    const handleChange = (event) => {
        updateContent(event.target.innerText);
    };

    return (
        <div className="document-editor">
            <Sidebar users={users} />
            <div
                contentEditable
                className="editor"
                onInput={handleChange}
                onBlur={trackCursor}
                suppressContentEditableWarning={true}
            >
                {content}
            </div>
        </div>
    );
};

export default DocumentEditor;