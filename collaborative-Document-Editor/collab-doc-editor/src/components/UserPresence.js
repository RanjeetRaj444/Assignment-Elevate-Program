import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { usePresence } from '../hooks/usePresence';

const UserPresence = () => {
    const { users } = useContext(UserContext);
    const { cursorPositions } = usePresence();

    return (
        <div className="user-presence">
            <h3>Active Users</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name}
                        {cursorPositions[user.id] && (
                            <span className="cursor-indicator" style={{ left: cursorPositions[user.id].x }}>
                                |
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserPresence;