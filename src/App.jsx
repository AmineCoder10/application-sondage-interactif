import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import CreateSurvey from './components/CreateSurvey/CreateSurvey';
import Survey from './components/Survey/Survey';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SurveyForm from './components/SurveyForm/SurveyForm';
import OurTeam from './components/OurTeam/OurTeam';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/create' element={<CreateSurvey />} />
        <Route path='/survey' element={<Survey />} />
        <Route path='/survey/:id' element={<SurveyForm />} />
        <Route path='/ourteam' element={<OurTeam />} />
      </Routes>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={2000}
        closeOnClick={false}
      />
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
