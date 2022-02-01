import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import QuizDashboard from '../../features/quizzes/dashboard/QuizDashboard';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import QuestionDashboard from '../../features/questions/dashboard/QuestionDashboard';

function App() {
  const {quizStore} = useStore();
  const {questionStore} = useStore();

  useEffect(() => {
    quizStore.loadQuizzes();
  }, [quizStore])

  useEffect(() => {
    questionStore.loadQuestions();
  }, [questionStore])

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <QuizDashboard/>
        <QuestionDashboard/>
      </Container>

    </>
  );
}

export default observer(App);