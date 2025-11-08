import { useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/header';
import MainPage from './components/MainPage.jsx';
import Footer from './components/footer';

function App() {

  return (
    <>
      <Header />
      <MainPage />
      <Footer />
    </>
  )
}

export default App;
