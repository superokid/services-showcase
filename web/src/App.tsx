import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Leaderboard from './pages/Leaderboard';
import GameDisplay from './pages/GameDisplay';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <GameDisplay />
        <Leaderboard />
      </QueryClientProvider>
    </div>
  );
}

export default App;
