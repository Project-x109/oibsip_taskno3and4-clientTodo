import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector } from "react-redux/es/hooks/useSelector";
import ReactPaginate from 'react-paginate';
import { todoLists } from "../redux/actions/todoActions";
import { profile } from "../redux/actions/authActions"
import { useDispatch } from "react-redux";
import AddTodo from "./AddTodo"
import Loader from "./Loader";
import { deleteTodo, updateStatus } from "../redux/actions/todoActions"
import Swal from "sweetalert2";
import UpdateIcon from '@mui/icons-material/Update';
import { getCsrf } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/authActions";


function AciveTodo() {
    const userTodos = useSelector((state) => state.todo.todos)
    const loading = useSelector((state) => state.todo.loading)
    const csrfToken = useSelector((state) => state.todo.csrfToken)
    const user = useSelector((state) => state.auth.username)
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();
    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    const pageSize = 5;
    const offset = currentPage * pageSize;
    const pagedData = userTodos?.slice(offset, offset + pageSize).filter((todo) => todo.complete === false);
    const handleDeleteTodo = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this todo!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(deleteTodo(id, csrfToken, isLoggedIn));
            }
        });
    };
    const handleStatusUpdate = async (id, complete) => {
        const badgeClass = complete
            ? "badge bg-danger"
            : "badge bg-success";

        const statusMessage = complete
            ? "Active"
            : "Completed";

        Swal.fire({
            title: 'Are you sure?',
            html: `<span>You are updating the status to <span class="${badgeClass}">${statusMessage}</span></span>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(updateStatus(id, csrfToken, isLoggedIn));
            }
        });
    }
    useEffect(() => {
        dispatch(getCsrf())
    }, [dispatch]);
    useEffect(() => {
        dispatch(todoLists(csrfToken, isLoggedIn));
        dispatch(profile(csrfToken))
    }, [dispatch, csrfToken, isLoggedIn]);
    if (!isLoggedIn) {
        Swal.fire({
            icon: "info",
            title: 'Login is Required',
            text: 'Login before You can Access this Page.'
        }).then(async () => navigate("/"));
        return navigate("/")
    }
    const handleLogout = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are Logging Out!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
        }).then(async (result) => {
            if (result.isConfirmed) {

                localStorage.removeItem('isLoggedIn');
                dispatch(logout(csrfToken));
                navigate("/")
            }
        });
    }
    const todoList = pagedData?.map((todo) => (
        // Your existing code to display tasks
        <tr key={todo._id} id={`ex1-tab-${todo._id}`} href={`#ex1-tabs-${todo._id}`} aria-controls={`ex1-tabs-${todo._id}`} className="fw-normal">
            <td className="align-middle">
                <span>{todo.text}</span>
            </td>
            <td className="align-middle">
                <h6 className="mb-0"><span className={!todo.complete ? "badge bg-danger" : "badge bg-success"}>{!todo.complete ? "Active" : "Completed"}</span></h6>
            </td>
            <td className="align-middle">
                <h6 className="mb-0"><span className={todo.priority === "Medium" ? "badge bg-warning" :
                    (todo.priority === "Low" ? "badge bg-danger" : "badge bg-success")}>{todo.priority}</span></h6>
            </td>
            <td className="align-middle">
                <span>{formatDate(todo.dueDate)}</span>
            </td>
            <td className="align-middle">
                <div>

                    {todo.labels.map((label, index) => (
                        <span key={index} className={label === "General" ? "badge bg-primary mx-1" : (label === "Personal" ? "badge bg-success mx-1" : "badge bg-danger mx-1")}>
                            {label}
                        </span>
                    ))}
                </div>
            </td>
            <td className="align-middle">
                <div>
                    {todo.tags.map((tag, index) => (
                        <span key={index} className="badge bg-info mx-1">
                            {tag}
                        </span>
                    ))}
                </div>
            </td>
            <td>
                <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                    {
                        todo?.sharedUsers?.map((user, index) => (
                            <li
                                key={index}
                                data-bs-toggle="tooltip"
                                data-popup="tooltip-custom"
                                data-bs-placement="top"
                                className="avatar avatar-xs pull-up"
                                title={user.username}
                            >
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp" style={{ height: "50px" }} alt="Avatar" className="rounded-circle" />
                            </li>
                        ))}
                </ul>
            </td>
            <td className="align-middle">
                <a href="#!" data-mdb-toggle="tooltip" title="Done">
                    <i className="bi bi-check text-success me-3"></i>
                </a>
                <a href="#!" onClick={() => handleStatusUpdate(todo._id, todo.complete)} data-mdb-toggle="tooltip" title="Done">
                    <UpdateIcon className=" me-3" />
                </a>
                <a href="#!" onClick={() => handleDeleteTodo(todo._id)} data-mdb-toggle="tooltip" title="Remove">
                    <i className="bi bi-trash text-danger"></i>
                </a>
            </td>
        </tr>
    ));
    return (
        <>
            {loading ? <Loader /> : ""}
            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-12 col-xl-10">
                            <div className="card">
                                <div className="card-header p-3">
                                    <h5 className="mb-0"><i className="fas fa-tasks me-2"></i>Welcome {user}</h5>
                                </div>
                                <div className="card-header p-3">
                                    <button onClick={() => handleLogout()} type="button" className="btn btn-outline-primary">
                                        <span className="tf-icons bx bx-pie-chart-alt"></span>&nbsp; Logout
                                    </button>
                                </div>
                                <ul className="nav nav-tabs mb-4 pb-2" id="ex1" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link" id="ex1-tab-1" data-mdb-toggle="tab" href="/todo" role="tab"
                                            aria-controls="ex1-tabs-1" aria-selected="true">All</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link active" id="ex1-tab-2" data-mdb-toggle="tab" href="/activetodo" role="tab"
                                            aria-controls="ex1-tabs-2" aria-selected="false">Active</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link" id="ex1-tab-3" data-mdb-toggle="tab" href="/completedtodo" role="tab"
                                            aria-controls="ex1-tabs-3" aria-selected="false">Completed</a>
                                    </li>
                                </ul>
                                <div className="card-body" data-mdb-perfect-scrollbar="true" style={{ position: "relative", height: "400px" }}>
                                    <div className="table-responsive text-nowrap">

                                        <table className="mb-0 table text-nowrap">
                                            <thead>
                                                <tr>

                                                    <th scope="col">Task</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Priority</th>
                                                    <th scope="col">DueDate</th>
                                                    <th scope="col">Label</th>
                                                    <th scope="col">Tags</th>
                                                    <th scope="col">Team Member</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-border-bottom-0">
                                                {todoList}

                                            </tbody>
                                        </table>

                                    </div>


                                </div>
                                <div className="card-footer text-end p-3">
                                    <ReactPaginate
                                        previousLabel={<button type="button" className="btn btn-outline-primary">
                                            <span className="tf-icons bx bx-pie-chart-alt"></span>&nbsp; Privious
                                        </button>}
                                        nextLabel={<button type="button" className="btn btn-outline-primary">
                                            <span className="tf-icons bx bx-pie-chart-alt"></span>&nbsp; Next
                                        </button>}
                                        breakLabel={'...'}
                                        pageCount={Math.ceil(userTodos?.length / pageSize)}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageChange}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                        pageLinkClassName={'badge bg-primary rounded-pill mx-1'} // Style for page numbers
                                    />
                                    <AddTodo />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}
export default AciveTodo;