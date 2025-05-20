import { CandidateProvider } from './contexts/CandidateContext';
import CandidateForm from './components/CandidateForm';
import CandidateList from './components/CandidateList';

function App() {
  return (
    <CandidateProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary-600 mb-2">
              Candidate Portal
            </h1>
            <p className="text-secondary-500 max-w-2xl mx-auto">
              Register and manage candidate profiles with our streamlined application process
            </p>
          </header>
          
          <div className="grid gap-8">
            <CandidateForm />
            <CandidateList />
          </div>
          
          <footer className="mt-12 text-center text-sm text-secondary-400">
            <p>© {new Date().getFullYear()} Candidate Registration System. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </CandidateProvider>
  );
}

export default App;