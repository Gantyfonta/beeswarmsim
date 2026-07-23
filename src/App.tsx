import React from 'react';
import { GameUI } from './components/GameUI';

export default function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-black select-none">
      <GameUI />
    </div>
  );
}
