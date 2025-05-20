import { createContext, useContext, useEffect, useState } from "react";

const CandidateContext = createContext();

export const useCandidates = () => useContext(CandidateContext);

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  function getAllCandidates() {
    const savedCandidates = localStorage.getItem("candidates");
    if (savedCandidates) {
      setCandidates(JSON.parse(savedCandidates));
    } else {
      console.log("No candidates found in local storage.");
    }
  }
  useEffect(() => {
    getAllCandidates();
  }, []);

  const addCandidate = (candidate) => {
    localStorage.setItem(
      "candidates",
      JSON.stringify([...candidates, candidate])
    );
    getAllCandidates();
  };

  const deleteCandidate = (id) => {
    localStorage.setItem(
      "candidates",
      JSON.stringify(candidates.filter((candidate) => candidate.id !== id))
    );
    getAllCandidates();
  };

  return (
    <CandidateContext.Provider
      value={{ candidates, addCandidate, deleteCandidate }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
