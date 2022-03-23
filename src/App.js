import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from "./components/Header/Header";
import Home from './Pages/Home/Home';
import Quiz from './Pages/Quiz/Quiz';
import Results from './Pages/Results/Results';

function App() {
  const [questions, setQuestions] = useState();
  const [name, setName] = useState();
  const [score, setScore] = useState(0);


  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(data.results);
  };

  return (
    <BrowserRouter>
    <div className="app" style={{ backgroundImage: 'url(./ques1.png)' }}>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home 
        name={name}
        setName={setName}
        fetchQuestions={fetchQuestions}
        />}
        />
        <Route path='/quiz' element={<Quiz 
        name={name}
        questions={questions}
        score={score}
        setScore={setScore}
        setQuestions={setQuestions}
        />}
        />
        <Route path='/results' element={<Results 
          name={name}
          score={score}
        />} 
        />
      </Routes>
       </div>
       <Footer />
    </BrowserRouter>
  );
}

export default App;
