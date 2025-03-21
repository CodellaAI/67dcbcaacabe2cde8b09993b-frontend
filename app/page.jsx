
"use client";

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const createEntry = async () => {
    setLoading(true);
    setStatus('Creating entry...');
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/entries`, {
        timestamp: new Date(),
        message: 'Entry created from frontend button click'
      });
      
      setStatus(`Success! Entry created with ID: ${response.data.entry._id}`);
    } catch (error) {
      console.error('Error creating entry:', error);
      setStatus(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Simple MongoDB Entry Creator
        </h1>
        
        <div className="flex flex-col items-center">
          <button
            onClick={createEntry}
            disabled={loading}
            className={`px-6 py-3 text-white font-medium rounded-md ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          >
            {loading ? 'Creating...' : 'Create MongoDB Entry'}
          </button>
          
          {status && (
            <div className={`mt-6 p-4 w-full rounded-md ${
              status.includes('Success') 
                ? 'bg-green-100 text-green-800' 
                : status.includes('Error') 
                ? 'bg-red-100 text-red-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {status}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
