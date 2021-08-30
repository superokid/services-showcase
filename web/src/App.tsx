import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Leaderboard from './pages/Leaderboard';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Leaderboard />
      </QueryClientProvider>
    </div>
  );
}

export default App;
