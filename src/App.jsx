import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css';
import CreateSurvey from './components/CreateSurvey/CreateSurvey';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import Survey from './components/Survey/Survey';

function App() {

  return (
    <>
      <BrowserRouter>

        <Header />



        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/create' element={<CreateSurvey />} />
          <Route path='/survey' element={<Survey />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
