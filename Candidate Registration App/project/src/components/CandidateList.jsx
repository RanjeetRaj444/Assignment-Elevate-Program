import { useState } from 'react';
import { useCandidates } from '../contexts/CandidateContext';
import CandidateItem from './CandidateItem';

const CandidateList = () => {
  const { candidates } = useCandidates();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  if (candidates.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 text-center animate-slide-up">
        <svg className="w-16 h-16 text-secondary-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <h3 className="text-xl font-medium text-secondary-700 mb-2">No candidates yet</h3>
        <p className="text-secondary-500">Register your first candidate using the form above</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-secondary-900">
          Registered Candidates
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input py-1 pl-8 pr-4 text-sm"
          />
          <svg className="w-4 h-4 text-secondary-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {filteredCandidates.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-secondary-500">No results found for "{searchTerm}"</p>
        </div>
      ) : (
        <div>
          {filteredCandidates.map(candidate => (
            <CandidateItem key={candidate.id} candidate={candidate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateList;