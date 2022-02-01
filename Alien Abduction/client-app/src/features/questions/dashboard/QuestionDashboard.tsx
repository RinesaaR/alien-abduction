import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import QuestionForm from '../form/QuestionForm';
import QuestionList from './QuestionList';

export default observer(function QuestionDashboard() {

    const {questionStore} = useStore();
    const {selectedQuestion, editMode} = questionStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <QuestionList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedQuestion && !editMode 
                }
                {editMode &&
                <QuestionForm />}
            </Grid.Column>
        </Grid>
    )
})