import React from 'react';
import UserPresence from './UserPresence';
import CommentsPanel from './CommentsPanel';
import VersionHistory from './VersionHistory';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>User Presence</h2>
            <UserPresence />
            <h2>Comments</h2>
            <CommentsPanel />
            <h2>Version History</h2>
            <VersionHistory />
        </div>
    );
};

export default Sidebar;