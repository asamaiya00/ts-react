import React from 'react';
import './App.css';
import PokemonSearch from './components/PokemonSearch';

function App() {
  return (
    <div className="App">
      <PokemonSearch name='Animesh' numberOfPokemons={10} />
    </div> 
  );
}

export default App; 
