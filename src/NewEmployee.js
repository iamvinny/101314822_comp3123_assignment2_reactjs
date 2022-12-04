import axios from "axios";
import {Modal} from "bootstrap";
import React, {useState, useEffect, useRef} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
const API_LINK = "https://vinicius-101314822-employees.herokuapp.com";

export default function NewEmployee({ type }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = sessionStorage.getItem("token");

    const [employee, setEmployee] = useState({first_name: "", last_name: "", email: "", gender: "", salary: "",});

    const is_edit = type === "edit" ? true : false;

    useEffect(() => {
        if (is_edit) {
            async function fetchEmployee() {
                const result = await axios.get(`${API_LINK}/api/emp/employees/${id}`, {
                  headers: {
                    'Authorization': 'Bearer ' + token
                  }
                });

                setEmployee(result.data);
            }
            fetchEmployee();
        }
    }, [is_edit, id]);

    const first_name_ref = useRef();
    const last_name_ref = useRef();
    const email_ref = useRef();
    const gender_ref = useRef();
    const salary_ref = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newEmployee = {
            first_name: first_name_ref.current.value,
            last_name: last_name_ref.current.value,
            email: email_ref.current.value,
            gender: gender_ref.current.value,
            salary: salary_ref.current.value,
        };

        try {
            if (is_edit) {
                console.log(employee)
                await axios.put(
                    `${API_LINK}/api/emp/employees/${id}`,
                    employee,
                    {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }
                );

                new Modal(document.getElementById("edit")).show();
            } else {
                // Make a post request to '/api/emp/employees' using axios and the newEmployee object with headers
                await axios.post(
                    `${API_LINK}/api/emp/employees`,
                    newEmployee,
                    {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }
                );

                new Modal(document.getElementById("add")).show();
            }
            navigate("/");
        } catch (error) {
            document.getElementById("error_feedback").innerHTML = '<span class="text-danger">Email is already in use!</span>';
            console.log(error);
        }
    };

    const ModalComponent = ({ id, title, message }) => {
        return (
            <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {message}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container mt-3">
            <h1 className="text-center">
                {is_edit ? "Update" : "Add"} Employee
            </h1>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">
                                First Name
                            </label>
                            <input type="text" className="form-control" id="firstName" ref={first_name_ref} value={is_edit ? employee.first_name : null} onChange={(e) => setEmployee({ first_name: e.target.value }) } required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">
                                Last Name
                            </label>
                            <input type="text" className="form-control" id="lastName" ref={last_name_ref} value={employee.last_name} onChange={(e) => setEmployee({ last_name: e.target.value }) } required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input type="email" className="form-control" id="email" ref={email_ref} value={employee.email} onChange={(e) => setEmployee({ email: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">
                                Gender
                            </label>
                            <select className="form-select" id="gender" ref={gender_ref} value={employee.gender} onChange={(e) => setEmployee({ gender: e.target.value })} required>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="salary" className="form-label">
                                Salary
                            </label>
                            <input type="text" className="form-control" id="salary" ref={salary_ref} value={employee.salary} onChange={(e) => setEmployee({ salary: e.target.value })} required />
                        </div>

                        <div id="error_feedback"></div>

                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-success">
                                {is_edit ? "Update" : "Add"}
                            </button>
                        </div>
                        <div className="d-grid gap-2">
                            {/* Link button returns to home page */}
                            <Link to="/" className="btn btn-danger mt-3">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            <ModalComponent id="add" title="Success" message="Employee added successfully!" />
            <ModalComponent id="edit" title="Success" message="Employee updated successfully!" />
        </div>
    );
}