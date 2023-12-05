import {
    TODO_ERROR,
    TODO_SUCCESS,
    ADD_NEWTODO_ERROR,
    ADD_NEWTODO_SUCCESS,
    ADD_NEWTODO_LOADING,
    DELETED_TODO_ERROR,
    DELETED_TODO_SUCCESS,
    UPDATE_TODO_STATUS_ERROR,
    UPDATE_TODO_STATUS_SUCCESS
} from "../actions/todoActions";
import { CSRF_ERROR, CSRF_SUCCESS } from "../actions/authActions";

const initialStateToDoList = {
    loading: false,
    success: null,
    todos: [],
    error: null,
    csrfToken: null
}
// Modify your reducer to handle an array of todos
const todoReducer = (state = initialStateToDoList, action) => {
    switch (action.type) {
        case CSRF_SUCCESS:
            return {
                ...state,
                csrfToken: action.payload.csrfToken,
                loading: false,
            }
        case CSRF_ERROR:
            return {
                ...state,
                csrfToken: null,
                error: action.payload,
                loading: false,
            }
        case ADD_NEWTODO_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
                success: null
            };
        case TODO_SUCCESS:
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    loading: false,
                    todos: action.payload,
                    error: null
                };
            } else {
                return state;
            }
        case TODO_ERROR:
            return {
                ...state,
                loading: false,
                todos: [], // Reset todos to an empty array in case of an error
            };
        case ADD_NEWTODO_SUCCESS:
            // Concatenate the new todo to the existing todos
            const newTodo = action.payload.todo;

            return {
                ...state,
                loading: false,
                success: action.payload.message,
                todos: [...state.todos, newTodo],
                error: null
            };
        case ADD_NEWTODO_ERROR:
            return {
                ...state,
                loading: false,
                success: null,
                todos: [...state.todos],
                error: action.payload,

            }
        case DELETED_TODO_SUCCESS:
            const deletedTodoId = action.payload.todo._id;
            return {
                ...state,
                loading: false,
                success: action.payload.message,
                todos: state.todos.filter((todo) => todo._id !== deletedTodoId),
                error: null
            }
        case DELETED_TODO_ERROR:
            return {
                ...state,
                loading: false,
                success: null,
                todos: [...state.todos],
                error: action.payload,
            }
        case UPDATE_TODO_STATUS_SUCCESS:
            const updatedTodo = action.payload.todo;
            const updatedTodoId = updatedTodo._id;
            const updatedTodos = state.todos.map((todo) =>
                todo._id === updatedTodoId ? updatedTodo : todo
            );
            return {
                ...state,
                loading: false,
                success: action.payload.message,
                todos: updatedTodos,
            };
        case UPDATE_TODO_STATUS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

export { todoReducer };
