// src/App.jsx
import React from 'react';
import Header from './components/Header';
import ExhibitionBanner from './components/ExhibitionBanner';
import ExhibitionGrid from './components/ExhibitionGrid';


const App = () => {
  return (
    <div>
      <Header />
      <ExhibitionBanner />
      <ExhibitionGrid />
     
    </div>
  );
}

export default App;
