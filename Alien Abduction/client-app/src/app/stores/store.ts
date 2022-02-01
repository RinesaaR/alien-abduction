import { createContext, useContext } from "react";
import QuizStore from "./quizStore";

interface Store {
    quizStore: QuizStore
}

export const store: Store = {
    quizStore: new QuizStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}