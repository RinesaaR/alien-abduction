import React from "react";
import { Button, Card, Image } from 'semantic-ui-react';
import { Quiz } from "../../../app/models/quiz";

interface Props {
    quiz: Quiz;
    cancelSelectQuiz: () => void;
    openForm: (id: string) => void;
}

export default function QuizDetails({ quiz, cancelSelectQuiz, openForm }: Props){
    return(
        <Card>
            <Card.Content>
                <Card.Header>{quiz.quizName}</Card.Header>
                <Card.Meta>{quiz.owner}</Card.Meta>
                <Card.Description>{quiz.timer}</Card.Description>
            </Card.Content>

            <Card.Content extra >
                <Button.Group width='2' style={{marginLeft: '2px'}}>
                <Button onClick={() => openForm(quiz.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectQuiz} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}