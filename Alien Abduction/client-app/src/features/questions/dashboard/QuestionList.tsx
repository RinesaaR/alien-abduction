import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function QuestionList() {
    const {questionStore} = useStore();
    const {deleteQuestion, questionsByQuestionText, loading} = questionStore;

    const [target, setTarget] = useState('');

    function handleQuestionDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteQuestion(id);
    }
    return (
        <Segment >
            <Item.Group divided>
                {questionsByQuestionText.map(question => (
                    <Item key = {question.id}>
                        <Item.Content>
                            <Item.Header as='a'>{question.questionText}</Item.Header>
                            <Item.Description >
                                <div style={{color: 'green'}}>{question.answer}</div>
                            </Item.Description>
                            <Item.Description >
                                <div style={{color: 'red'}}>{question.option}</div>
                            </Item.Description>
                            <Item.Extra>
                            <Button onClick={() => questionStore.selectQuestion(question.id)} floated='right' content='Edit' color='blue' />
                            <Button 
                                    name={question.id}
                                    loading={loading && target === question.id} 
                                    onClick={(e) => handleQuestionDelete(e, question.id)} 
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
})