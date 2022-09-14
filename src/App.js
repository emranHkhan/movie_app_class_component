import React from 'react';
import './style.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';

export default function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <Movies />
    </>
  );
}
