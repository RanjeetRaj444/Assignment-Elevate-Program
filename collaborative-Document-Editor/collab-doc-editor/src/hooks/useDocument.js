import { useState, useEffect, useContext } from 'react';
import { DocumentContext } from '../contexts/DocumentContext';

const useDocument = () => {
    const { documentState, setDocumentState, versionHistory, setVersionHistory } = useContext(DocumentContext);
    const [currentContent, setCurrentContent] = useState(documentState.content);
    
    useEffect(() => {
        setCurrentContent(documentState.content);
    }, [documentState.content]);

    const updateContent = (newContent) => {
        const newVersion = {
            content: currentContent,
            timestamp: new Date().toISOString(),
        };
        setVersionHistory([...versionHistory, newVersion]);
        setDocumentState({ ...documentState, content: newContent });
    };

    const revertToVersion = (version) => {
        setDocumentState({ ...documentState, content: version.content });
    };

    return {
        currentContent,
        updateContent,
        revertToVersion,
    };
};

export default useDocument;