import React from 'react';
import { MessageForm } from './components/MessageForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Message Sender
        </h1>
        <MessageForm />
      </div>
    </div>
  );
}

export default App;