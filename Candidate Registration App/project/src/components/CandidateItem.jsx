import { useState } from 'react';
import { useCandidates } from '../contexts/CandidateContext';

const CandidateItem = ({ candidate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { deleteCandidate } = useCandidates();
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleDelete = () => {
    deleteCandidate(candidate.id);
  };
  
  return (
    <div className={`candidate-card mb-4 ${isExpanded ? 'ring-1 ring-primary-200' : ''}`}>
      <div 
        className="p-4 cursor-pointer flex items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="h-12 w-12 rounded-full overflow-hidden mr-4 flex-shrink-0 ring-2 ring-primary-100">
          <img 
            src={candidate.profilePicture} 
            alt={candidate.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-grow min-w-0">
          <h3 className="font-medium text-secondary-900 truncate">{candidate.name}</h3>
          <p className="text-sm text-secondary-500 truncate">{candidate.email}</p>
        </div>
        
        <div className="ml-2 flex items-center">
          <span className="text-xs text-secondary-400 mr-2 hidden sm:inline-block">
            {formatDate(candidate.createdAt)}
          </span>
          
          <svg 
            className={`w-5 h-5 text-secondary-400 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-1 animate-fade-in border-t border-secondary-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm">
                <span className="text-secondary-500">Phone: </span>
                <span className="text-secondary-700">{candidate.phone}</span>
              </p>
              <p className="text-sm capitalize">
                <span className="text-secondary-500">Gender: </span>
                <span className="text-secondary-700">{candidate.gender}</span>
              </p>
            </div>
            
            <div>
              <p className="text-sm">
                <span className="text-secondary-500">Skills: </span>
                <span className="text-secondary-700">
                  {candidate.skills.map((skill, index) => (
                    <span key={skill} className="inline-block bg-primary-50 text-primary-700 rounded-full px-2 py-0.5 text-xs mr-1 mb-1">
                      {skill}
                    </span>
                  ))}
                </span>
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            {!showDeleteConfirm ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(true);
                }}
                className="btn btn-secondary text-xs"
              >
                Delete
              </button>
            ) : (
              <div className="flex items-center gap-2 animate-fade-in">
                <span className="text-xs text-secondary-500">Confirm delete?</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteConfirm(false);
                  }}
                  className="btn btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  className="btn btn-danger text-xs"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateItem;