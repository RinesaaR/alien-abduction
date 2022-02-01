import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import QuizDashboard from '../../features/quizzes/dashboard/QuizDashboard';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {quizStore} = useStore();

  useEffect(() => {
    quizStore.loadQuizzes();
  }, [quizStore])

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <QuizDashboard/>
      </Container>

    </>
  );
}

export default observer(App);