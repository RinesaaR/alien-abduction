import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function QuizDetails() {
    const {quizStore} = useStore();
    const {selectedQuiz: quiz, openForm, cancelSelectedQuiz} = quizStore;

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{quiz?.quizName}</Card.Header>
                <Card.Meta>{quiz?.timer}</Card.Meta>
                <Card.Description>{quiz?.owner}</Card.Description>
            </Card.Content>

            <Card.Content extra >
                <Button.Group width='2' style={{marginLeft: '2px'}}>
                <Button onClick={() => openForm(quiz?.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedQuiz} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})