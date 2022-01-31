import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Quiz } from '../../../app/models/quiz';
import QuizDetails from '../details/QuizDetails';
import QuizForm from '../form/QuizForm';
import QuizList from './QuizList';

interface Props {
    quizzes: Quiz[];
    selectedQuiz: Quiz | undefined;
    selectQuiz: (id: string) => void;
    cancelSelectQuiz: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (quiz: Quiz) => void;
    deleteQuiz: (id: string) => void;
    submitting: boolean;
}

export default function QuizDashboard({quizzes, selectedQuiz, deleteQuiz,
    selectQuiz, cancelSelectQuiz, editMode, openForm, 
    closeForm, createOrEdit, submitting}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <QuizList quizzes={quizzes} 
                    selectQuiz={selectQuiz} 
                    deleteQuiz={deleteQuiz}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedQuiz && !editMode &&
                <QuizDetails 
                    quiz={selectedQuiz} 
                    cancelSelectQuiz={cancelSelectQuiz}
                    openForm={openForm} 
                />}
                {editMode &&
                <QuizForm 
                closeForm={closeForm} 
                quiz={selectedQuiz} 
                createOrEdit={createOrEdit} 
                submitting={submitting}
                />}
            </Grid.Column>
        </Grid>
    )
}