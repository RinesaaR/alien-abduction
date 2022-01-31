import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [quiz, setQuiz] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/quiz').then(response => {
      console.log(response);
      setQuiz(response.data);
    })
  }, [])

  return (
    <div>
      <Header size='huge'>Huge Header</Header>
        <List>
          {quiz.map((quiz: any)=>(
            <List.Item key={quiz.id}>
              {quiz.quizName}
              </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
