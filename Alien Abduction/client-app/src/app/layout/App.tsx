import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Quiz } from '../models/quiz';
import NavBar from './NavBar';
import QuizDashboard from '../../features/quizzes/dashboard/QuizDashboard';
import {v4 as uuid} from 'uuid';


function App() {
  const [quizzes, setQuiz] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Quiz[]>('http://localhost:5000/api/quiz').then(response => {
      setQuiz(response.data);
    })
  }, [])

  function handleSelectQuiz(id: string) {
    setSelectedQuiz(quizzes.find(x => x.id === id));
  }

  function handleCancelSelectQuiz() {
    setSelectedQuiz(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectQuiz(id) : handleCancelSelectQuiz();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditQuiz(quiz: Quiz) {
    quiz.id 
      ? setQuiz([...quizzes.filter(x => x.id !== quiz.id), quiz])
      : setQuiz([...quizzes, {...quiz, id: uuid()}]);
    setEditMode(false);
    setSelectedQuiz(quiz);
  }

  function handleDeleteQuiz(id: string) {
    setQuiz([...quizzes.filter(x => x.id !== id)])
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <QuizDashboard 
          quizzes={quizzes} 
          selectedQuiz={selectedQuiz}
          selectQuiz={handleSelectQuiz}
          cancelSelectQuiz={handleCancelSelectQuiz}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditQuiz}
          deleteQuiz={handleDeleteQuiz}
        />
      </Container>

    </>
  );
}

export default App;