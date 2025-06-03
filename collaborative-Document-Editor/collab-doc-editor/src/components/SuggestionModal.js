import React, { useContext } from 'react';
import { UIContext } from '../contexts/UIContext';

const SuggestionModal = ({ suggestions, onApprove, onReject }) => {
    const { isModalOpen, closeModal } = useContext(UIContext);

    return (
        <div className={`modal ${isModalOpen ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box">
                    <h2 className="title">Suggestions</h2>
                    {suggestions.length === 0 ? (
                        <p>No suggestions available.</p>
                    ) : (
                        <ul>
                            {suggestions.map((suggestion, index) => (
                                <li key={index} className="suggestion-item">
                                    <p>{suggestion.text}</p>
                                    <button onClick={() => onApprove(suggestion)}>Approve</button>
                                    <button onClick={() => onReject(suggestion)}>Reject</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
        </div>
    );
};

export default SuggestionModal;