import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Quiz } from '../models/quiz';
import NavBar from './NavBar';
import QuizDashboard from '../../features/quizzes/dashboard/QuizDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';


function App() {
  const [quizzes, setQuiz] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Quizzes.list().then(response => {
      let quizzes: Quiz[] = [];
      response.forEach(quiz => {
        quiz.quizName = quiz.quizName;
        quizzes.push(quiz);
      })
      setQuiz(quizzes);
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
    setSubmitting(true);
    if (quiz.id) {
      agent.Quizzes.update(quiz).then(() => {
        setQuiz([...quizzes.filter(x => x.id !== quiz.id), quiz])
        setSelectedQuiz(quiz);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      quiz.id = uuid();
      agent.Quizzes.create(quiz).then(() => {
        setQuiz([...quizzes, quiz])
        setSelectedQuiz(quiz);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteQuiz(id: string) {
    setSubmitting(true);
    agent.Quizzes.delete(id).then(() => {
      setQuiz([...quizzes.filter(x => x.id !== id)]);
      setSubmitting(false);
    })

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
          submitting={submitting}
        />
      </Container>

    </>
  );
}

export default App;