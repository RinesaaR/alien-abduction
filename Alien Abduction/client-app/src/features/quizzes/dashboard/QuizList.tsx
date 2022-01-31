import react from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import { Quiz } from '../../../app/models/quiz';

interface Props {
    quizzes: Quiz[];
    selectQuiz: (id: string) => void;
    deleteQuiz: (id: string) => void;
}
export default function QuizList({ quizzes, selectQuiz, deleteQuiz }: Props){
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
                                <Button onClick={() => deleteQuiz(quiz.id)} floated='right' content='Delete' color='red' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}

            </Item.Group>
        </Segment>
    )
}