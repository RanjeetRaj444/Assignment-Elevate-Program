import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);

    const addUser = (user) => {
        setUsers((prevUsers) => [...prevUsers, user]);
    };

    const removeUser = (userId) => {
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
    };

    const setCurrentUser = (userId) => {
        setCurrentUserId(userId);
    };

    return (
        <UserContext.Provider value={{ users, currentUserId, addUser, removeUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};