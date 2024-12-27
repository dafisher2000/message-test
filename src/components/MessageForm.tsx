import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { sendMessage } from '../services/messageService';

export function MessageForm() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('sending');
    setError(null);

    const response = await sendMessage({ content: message });
    
    if (response.success) {
      setStatus('success');
      setMessage('');
      setTimeout(() => setStatus('idle'), 2000);
    } else {
      setStatus('error');
      setError(response.error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="message" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Enter your message here..."
          />
        </div>
        
        <button
          type="submit"
          disabled={status === 'sending' || !message.trim()}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? (
            'Sending...'
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </button>

        {status === 'success' && (
          <p className="text-green-600 text-sm text-center">Message sent successfully!</p>
        )}
        
        {status === 'error' && (
          <p className="text-red-600 text-sm text-center">{error || 'Failed to send message'}</p>
        )}
      </form>
    </div>
  );
}