import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const usePresence = () => {
    const { users, setUsers } = useContext(UserContext);
    const [cursorPositions, setCursorPositions] = useState({});

    useEffect(() => {
        const handleUserJoin = (userId) => {
            setUsers((prevUsers) => [...prevUsers, userId]);
        };

        const handleUserLeave = (userId) => {
            setUsers((prevUsers) => prevUsers.filter((user) => user !== userId));
        };

        const handleCursorUpdate = (userId, position) => {
            setCursorPositions((prevPositions) => ({
                ...prevPositions,
                [userId]: position,
            }));
        };

        // Simulated WebSocket or event listener setup
        const simulatedWebSocket = {
            onUserJoin: handleUserJoin,
            onUserLeave: handleUserLeave,
            onCursorUpdate: handleCursorUpdate,
        };

        // Cleanup function to remove event listeners
        return () => {
            // Remove event listeners or cleanup logic
        };
    }, [setUsers]);

    return { users, cursorPositions };
};

export default usePresence;