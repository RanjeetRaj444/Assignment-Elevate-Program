import React, { createContext, useState, useEffect } from 'react';

export const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
    const [content, setContent] = useState('');
    const [versionHistory, setVersionHistory] = useState([]);
    const [editState, setEditState] = useState(false);

    useEffect(() => {
        // Load initial document content and version history if needed
        const initialContent = ''; // Fetch or set initial content
        setContent(initialContent);
        setVersionHistory([{ content: initialContent, timestamp: new Date() }]);
    }, []);

    const updateContent = (newContent) => {
        setContent(newContent);
        setVersionHistory((prevHistory) => [
            ...prevHistory,
            { content: newContent, timestamp: new Date() },
        ]);
    };

    const toggleEditState = () => {
        setEditState((prevState) => !prevState);
    };

    const revertToVersion = (versionIndex) => {
        if (versionIndex < versionHistory.length) {
            setContent(versionHistory[versionIndex].content);
        }
    };

    return (
        <DocumentContext.Provider
            value={{
                content,
                updateContent,
                editState,
                toggleEditState,
                versionHistory,
                revertToVersion,
            }}
        >
            {children}
        </DocumentContext.Provider>
    );
};