import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TodoItem, TodoItemsSchema } from '../../entity';

const todos = localStorage.getItem('todos');

const initialState: TodoItemsSchema = {
    todos: (todos && JSON.parse(todos)) || []
};

export const todoItemsSlice = createSlice({
    name: 'todoItems',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.todos.push({
                id: state.todos.length ? state.todos[state.todos.length - 1].id + 1 : 0,
                title: action.payload,
                date: new Date().toString()
            })
            localStorage.setItem("todos", JSON.stringify(state.todos));
        },
        deleteToDo: (state, action: PayloadAction<number>) => {
            let { todos } = state;
            state.todos = todos.filter((item : TodoItem) => 
                item.id !== action.payload
            );
            localStorage.setItem("todos", JSON.stringify(state.todos));
        },
        saveEditedTodo: (state, action: PayloadAction<TodoItem>) => {
            let { todos } = state;
            state.todos = todos.map((item) => 
                item.id === action.payload.id ? action.payload : item
            );
            localStorage.setItem("todos", JSON.stringify(state.todos));
        },
    },
});

export const { actions: todoItemsActions } = todoItemsSlice;
export const { reducer: todoItemsReducer } = todoItemsSlice;
