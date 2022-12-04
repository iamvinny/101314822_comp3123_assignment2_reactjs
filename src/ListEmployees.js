import axios from "axios";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
const API_LINK = "https://vinicius-101314822-employees.herokuapp.com";

export default function ListEmployees() {
    const [employees, setEmployees] = useState([]);
    const [loading, isLoading] = useState(true);
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (!loading) {
            const spinner = document.getElementById("spinner");
            spinner.remove();
        }
        async function fetchEmployees() {
            const employees = await axios.get(`${API_LINK}/api/emp/employees`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            isLoading(false);
            setEmployees(employees.data);
        }
        fetchEmployees();
    }, [loading]);

    function DeleteModal({ employee }) {
        return (
            <div className="modal fade" id={`delete${employee._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Delete Employee
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Danger Alert */}
                            <div className="alert alert-danger" role="alert">
                                Are you sure you want to delete {employee.first_name} {employee.last_name}?
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => {
                                axios.delete(`${API_LINK}/api/emp/employees/`, {
                                        params: {
                                            eid: employee._id
                                        },
                                        headers: {
                                            "Authorization": "Bearer " + token
                                        }
                                    }).then(() => {
                                        window.location.reload();
                                    });
                                }}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-3">
            <h1 className="text-center">Employees List</h1>
            <Link className="btn btn-success" to="/new">
                Add Employee
            </Link>
            <div className="spinner-border text-primary" role="status" id="spinner">
                <span className="visually-hidden">Loading...</span>
            </div>
            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.email}</td>
                            <td>
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(employee.salary)}
                            </td>
                            <td>
                                <Link className="btn btn-warning" to={`/edit/${employee._id}`}>
                                    Edit
                                </Link>
                                <button className="btn btn-danger ms-2" data-bs-toggle="modal" data-bs-target={`#delete${employee._id}`}>
                                    Delete
                                </button>
                                <DeleteModal employee={employee} />
                                <Link className="btn btn-info ms-2" to={`/view/${employee._id}`}>
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}