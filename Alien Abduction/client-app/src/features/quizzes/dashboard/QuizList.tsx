import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import { Quiz } from '../../../app/models/quiz';

interface Props {
    quizzes: Quiz[];
    selectQuiz: (id: string) => void;
    deleteQuiz: (id: string) => void;
    submitting: boolean;
}
export default function QuizList({ quizzes, selectQuiz, deleteQuiz, submitting }: Props) {
    const [target, setTarget] = useState('');

    function handleQuizDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteQuiz(id);
    }
    return (
        <Segment>
            <Item.Group divided>
                {quizzes.map(quiz => (
                    <Item key = {quiz.id}>
                        <Item.Content>
                            <Item.Header as='a'>{quiz.quizName}</Item.Header>
                            <Item.Meta >{quiz.owner}</Item.Meta>
                            <Item.Description >
                                <div>{quiz.timer}</div>
                            </Item.Description>
                            <Item.Extra>
                            <Button onClick={() => selectQuiz(quiz.id)} floated='right' content='View' color='blue' />
                            <Button 
                                    name={quiz.id}
                                    loading={submitting && target === quiz.id} 
                                    onClick={(e) => handleQuizDelete(e, quiz.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}

            </Item.Group>
        </Segment>
    )
}