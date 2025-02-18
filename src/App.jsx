import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'
import MapComponent from './components/mapComponent';
import { useState } from 'react';
import Info from './components/info';
import { InfoProvider } from './context/info';

function App() {

  return (
    <InfoProvider>
      <MapComponent/>
      <Info />
      </InfoProvider>
  )
}

export default App