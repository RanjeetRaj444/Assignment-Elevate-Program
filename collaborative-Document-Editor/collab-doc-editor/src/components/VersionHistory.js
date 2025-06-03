import React, { useContext } from 'react';
import { DocumentContext } from '../contexts/DocumentContext';

const VersionHistory = () => {
    const { versionHistory, revertToVersion } = useContext(DocumentContext);

    const handleRevert = (version) => {
        revertToVersion(version);
    };

    return (
        <div className="version-history">
            <h2>Version History</h2>
            <ul>
                {versionHistory.map((version, index) => (
                    <li key={index}>
                        <span>{new Date(version.timestamp).toLocaleString()}</span>
                        <button onClick={() => handleRevert(version)}>Revert</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VersionHistory;