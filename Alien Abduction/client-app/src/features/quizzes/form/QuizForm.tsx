import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function QuizForm() {
    const {quizStore} = useStore();
    const {selectedQuiz, closeForm, createQuiz, updateQuiz, loading} = quizStore;

    const initialState = selectedQuiz ?? {
        id:'',
        quizName:'',
        timer: 0,
        owner: ''
    }

    const [quiz, setQuiz] = useState(initialState);

    function handleSubmit() {
        quiz.id ? updateQuiz(quiz) : createQuiz(quiz);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setQuiz({...quiz, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
            <Form.Input placeholder='Quiz Name' value={quiz.quizName} name='quizName' onChange={handleInputChange} />
                <Form.TextArea placeholder='Timer' value={quiz.timer} name='timer' onChange={handleInputChange} />
                <Form.Input placeholder='Owner' value={quiz.owner} name='owner' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})