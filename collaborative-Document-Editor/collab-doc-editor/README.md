# Collaborative Document Editor

## Project Description
The Collaborative Document Editor is a real-time editing application that allows multiple users to edit a document simultaneously. It features user presence tracking, inline commenting, version history, and permission management, making it ideal for collaborative work environments.

## Features List
- **Real-time Sync**: Simulates collaborative editing with shared document state management.
- **User Presence & Cursor Tracking**: Displays active users and their cursor positions.
- **Document Permissions & Sharing**: Manages view/edit access for users.
- **Comments & Suggestions**: Inline commenting system with suggestion mode for proposals.
- **Version History**: Allows users to view and revert to previous document versions.

## Setup Instructions
1. Clone the repository:
   ```
   git clone https://github.com/microsoft/vscode-extension-samples.git
   ```
2. Navigate to the project directory:
   ```
   cd collab-doc-editor
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open your browser and go to `http://localhost:3000` to view the application.

## Context & Hook Architecture
- **UserContext**: Manages user session data, presence, and IDs.
- **DocumentContext**: Handles the current document content, edit state, and version history.
- **UIContext**: Manages UI states such as modals and editing modes.
- **Custom Hooks**:
  - `useDocument()`: Manages shared document state and version control.
  - `usePresence()`: Tracks active users and their cursor positions.
  - `usePermissions()`: Controls document access and sharing permissions.

## Collaboration Simulation Details
The application simulates collaborative editing through:
- Real-time updates using WebSocket mocks or setInterval for syncing.
- Optimistic updates to prevent conflicts during simultaneous edits.

## Version Control Description
The version control feature stores snapshots of the document at regular intervals or upon saving. Users can revert to earlier versions through a dropdown or modal interface.

## Folder Structure
- **public/**: Contains the main HTML entry point.
- **src/**: Contains all source code, including components, contexts, hooks, and styles.
- **package.json**: Configuration file for npm.

This README provides an overview of the Collaborative Document Editor project, its features, setup instructions, and architecture details.