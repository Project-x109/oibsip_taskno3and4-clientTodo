import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./modal.css";
import EmailInput from './EmailInput'
import TaskInput from './TaskInput';
import LabelSelection from './LabelSelection';
import TagInput from './TagSelection'
import PrioritySelection from './Priority'
import DueDate from "./DueDate";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addNewTodo } from "../redux/actions/todoActions";
import { todoLists } from "../redux/actions/todoActions";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getCsrf } from "../redux/actions/authActions";
function AddTodo() {
    const successMessage = useSelector((state) => state.todo.success);
    const errorMessage = useSelector((state) => state.todo.error);
    const csrfToken = useSelector((state) => state.todo.csrfToken)
    const isLoggedIn = localStorage.getItem('isLoggedIn');


    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emails, setEmails] = useState([]);
    const [tasks, setTasks] = useState('');
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [dueDate, setDueDate] = useState('');

    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    const handleLabelChange = (newLabels) => {
        setSelectedLabels(newLabels);
    };
    const handleAddEmail = (newEmails) => {
        setEmails(newEmails);
    }
    const onTaskChange = (newTask) => {
        setTasks(newTask)
    }
    const handleTagChange = (newTags) => {
        setSelectedTags(newTags); // Update the selected tags in the parent component
    };
    const handlePriorityChange = (newPriority) => {
        setSelectedPriority(newPriority);
    }
    const handleDueDate = (date) => {
        setDueDate(date)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            text: tasks,
            priority: selectedPriority,
            dueDate: dueDate,
            labels: selectedLabels,
            sharedWith: emails,
            tags: selectedTags
        }
        dispatch(addNewTodo(formData, csrfToken,isLoggedIn));
        setTasks(''); // Clear the task input
        setSelectedPriority(''); // Clear the selected priority
        setSelectedLabels([]); // Clear the selected labels
        setEmails([]); // Clear the email input
        setSelectedTags([]); // Clear the selected tags
        setDueDate(''); // Clear the due date
        closeModal();
    }
    useEffect(() => {
        dispatch(getCsrf())

    }, [dispatch]);
    useEffect(() => {
        if (errorMessage) {
            // Display error message using Swal
            Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessage.error,
            });
        }
        if (successMessage) {
            // Display the success message using Swal
            Swal.fire({
                icon: "success",
                title: "Success",
                text: successMessage,
            });
        }
    }, [errorMessage, successMessage]);
    useEffect(() => {
        // Dispatch the action to load todos when the component mounts
        dispatch(todoLists(csrfToken,isLoggedIn));
    }, [dispatch, csrfToken,isLoggedIn]); // Include csrfToken as a dependency if needed
    return (
        <>
            {isModalOpen && (
                <div className="modal fade show overlay" tabIndex="-1" role="dialog" aria-labelledby="todoModalLabel" aria-hidden="true" style={{ display: "block" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="todoModalLabel">Add Todo</h5>
                                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>

                                    <div className="mb-3">
                                        <TaskInput onTaskChange={onTaskChange} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <PrioritySelection onPriorityChange={handlePriorityChange} selectedPriority={selectedPriority} />
                                    </div>

                                    <div className="form-group mb-3">
                                        <LabelSelection selectedLabels={selectedLabels} onLabelChange={handleLabelChange} />
                                    </div>

                                    <div className="form-group mb-3">
                                        <EmailInput onEmailAdd={handleAddEmail} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <TagInput selectedTags={selectedTags} onTagChange={handleTagChange} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <DueDate onDueDateChange={handleDueDate} />
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal} data-dismiss="modal">Close</button>
                                <button type="button" onClick={handleSubmit} className="btn btn-primary">Save Todo</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <button className="btn btn-primary" onClick={openModal}>Add Task</button>
        </>
    );
}

export default AddTodo;