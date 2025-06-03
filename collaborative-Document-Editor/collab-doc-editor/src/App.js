import React from 'react';
import { UserProvider } from './contexts/UserContext';
import { DocumentProvider } from './contexts/DocumentContext';
import { UIProvider } from './contexts/UIContext';
import DocumentEditor from './components/DocumentEditor';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <UserProvider>
            <DocumentProvider>
                <UIProvider>
                    <div className="app-container">
                        <Sidebar />
                        <DocumentEditor />
                    </div>
                </UIProvider>
            </DocumentProvider>
        </UserProvider>
    );
}

export default App;