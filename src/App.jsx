import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import HomePage from './components/HomePage/HomePage';
import CreateSurvey from './components/CreateSurvey/CreateSurvey';
import Survey from './components/Survey/Survey';
import Header from './components/Header/Header';

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
