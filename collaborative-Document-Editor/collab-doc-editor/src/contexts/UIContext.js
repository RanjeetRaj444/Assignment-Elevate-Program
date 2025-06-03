import React, { createContext, useState, useContext } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [isSuggestionMode, setIsSuggestionMode] = useState(false);
    const [isCommenting, setIsCommenting] = useState(false);
    const [activeModal, setActiveModal] = useState(null);

    const toggleSuggestionMode = () => {
        setIsSuggestionMode(prev => !prev);
    };

    const toggleCommenting = () => {
        setIsCommenting(prev => !prev);
    };

    const openModal = (modalType) => {
        setActiveModal(modalType);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    return (
        <UIContext.Provider value={{
            isSuggestionMode,
            toggleSuggestionMode,
            isCommenting,
            toggleCommenting,
            activeModal,
            openModal,
            closeModal
        }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    return useContext(UIContext);
};