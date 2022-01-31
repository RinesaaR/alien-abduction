import axios, { AxiosResponse } from 'axios';
import { Quiz } from '../models/quiz';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(100);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Quizzes = {
    list: () => requests.get<Quiz[]>('/quiz'),
    details: (id: string) => requests.get<Quiz>(`/quiz/${id}`),
    create: (quiz: Quiz) => requests.post<void>('/quiz', quiz),
    update: (quiz: Quiz) => axios.put<void>(`/quiz/${quiz.id}`, quiz),
    delete: (id: string) => axios.delete<void>(`/quiz/${id}`)
}

const agent = {
    Quizzes
}

export default agent;