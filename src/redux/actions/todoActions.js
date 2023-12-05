import axios from "axios";

const backendServerURL = "https://todoback1-kcfc.onrender.com";

export const TODO_ERROR = "TODO_ERROR";
export const TODO_SUCCESS = "TODO_SUCCESS";
export const ADD_NEWTODO_SUCCESS = "ADD_NEWTODO_SUCCESS";
export const ADD_NEWTODO_ERROR = "ADD_NEWTODO_ERROR";
export const ADD_NEWTODO_LOADING = "ADD_NEWTODO_LOADING";
export const DELETED_TODO_SUCCESS = "DELETED_TODO_SUCCESS";
export const DELETED_TODO_ERROR = "DELETED_TODO_ERROR";
export const UPDATE_TODO_STATUS_SUCCESS = "UPDATE_TODO_STATUS_SUCCESS";
export const UPDATE_TODO_STATUS_ERROR = "UPDATE_TODO_STATUS_ERROR";

export const todoLists = (csrfToken, isLoggedIn) => async (dispatch) => {
    try {
        dispatch({ type: ADD_NEWTODO_LOADING });

        const headers = {
            'Authorization': `${isLoggedIn}`,
            "X-CSRF-Token": csrfToken,
        };

        const todoListResponse = await axios.get(
            `${backendServerURL}/todos/todos`,
            {
                withCredentials: true,
                headers
            }
        );
        if (todoListResponse.data) {
            dispatch({ type: TODO_SUCCESS, payload: todoListResponse?.data });
        } else {
            dispatch({
                type: TODO_ERROR,
                payload: "Invalid response from the server",
            });
        }

    } catch (error) {
        if (error.response && error.response.data) {
            dispatch({ type: TODO_ERROR, payload: error.response.data });
        } else {
            dispatch({
                type: TODO_ERROR,
                payload: "An error occurred while displaying all the lists",
            });
        }
    }

}

export const addNewTodo = (formData, csrfToken, isLoggedIn) => async (dispatch) => {

    try {
        dispatch({ type: ADD_NEWTODO_LOADING });
        const headers = {
            'Authorization': `${isLoggedIn}`,
            "X-CSRF-Token": csrfToken,
        };

        const addNewTodoResponse = await axios.post(
            `${backendServerURL}/todos/todos/new`,
            formData,
            {
                withCredentials: true,
                headers
            }
        );
        if (addNewTodoResponse.data) {
            dispatch({ type: ADD_NEWTODO_SUCCESS, payload: addNewTodoResponse.data });
        } else {
            dispatch({
                type: ADD_NEWTODO_ERROR,
                payload: "Invalid response from the server",
            });
        }


    }
    catch (error) {
        if (error.response && error.response.data) {
            dispatch({ type: ADD_NEWTODO_ERROR, payload: error.response.data });
        } else {
            dispatch({
                type: ADD_NEWTODO_ERROR,
                payload: "An error occurred while Registring the new todo",
            });
        }
    }
}
export const deleteTodo = (id, csrfToken, isLoggedIn) => async (dispatch) => {
    try {
        dispatch({ type: ADD_NEWTODO_LOADING });
        const headers = {
            'Authorization': `${isLoggedIn}`,
            "X-CSRF-Token": csrfToken,
        };
        const deleteTodoResponse = await axios.delete(
            `${backendServerURL}/todos/todos/delete/${id}`,
            {
                withCredentials: true,
                headers
            }
        );
        if (deleteTodoResponse.data) {
            dispatch({ type: DELETED_TODO_SUCCESS, payload: deleteTodoResponse.data });
        } else {
            dispatch({
                type: DELETED_TODO_ERROR,
                payload: "Invalid response from the server",
            });
        }


    }
    catch (error) {
        if (error.response && error.response.data) {
            dispatch({ type: DELETED_TODO_ERROR, payload: error.response.data });
        } else {
            dispatch({
                type: DELETED_TODO_ERROR,
                payload: "An error occurred while Deleting the Todo",
            });
        }
    }
}
export const updateStatus = (id, csrfToken, isLoggedIn) => async (dispatch) => {
    try {
        dispatch({ type: ADD_NEWTODO_LOADING });
        const headers = {
            'Authorization': `${isLoggedIn}`,
            "X-CSRF-Token": csrfToken,
        };
        const updateStatusResponse = await axios.put(
            `${backendServerURL}/todos/todos/update/${id}`,
            {},
            {
                withCredentials: true,
                headers
            }
        );
        if (updateStatusResponse.data) {
            dispatch({ type: UPDATE_TODO_STATUS_SUCCESS, payload: updateStatusResponse.data })
        }
        else {
            dispatch({ type: UPDATE_TODO_STATUS_ERROR, payload: "An error occured while updating the status" })
        }

    }
    catch (error) {
        if (error.response && error.response.data) {
            dispatch({ type: UPDATE_TODO_STATUS_ERROR, payload: error.response.data });
        } else {
            dispatch({
                type: UPDATE_TODO_STATUS_ERROR,
                payload: "An error occurred while Updating the Todo",
            });
        }
    }
}