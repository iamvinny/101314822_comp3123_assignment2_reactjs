import axios from "axios";
import {Link} from "react-router-dom";
import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
const API_LINK = "https://vinicius-101314822-employees.herokuapp.com";

export default function ViewEmployee() {
    const {id} = useParams();
    const [loading, isLoading] = useState(true);
    const [employee, propagateEmployee] = useState({});
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (!loading) {
            const spinner = document.getElementById("spinner");
            spinner.remove();
        }
        async function getEmployee() {
            const employee = await axios.get(`${API_LINK}/api/emp/employees/${id}`, {
              headers: {
                'Authorization': 'Bearer ' + token
              }
            });
            
            isLoading(false);
            propagateEmployee(employee.data);
        }
        getEmployee();
    }, [loading, id]);

    return (
        <div className="container mt-3">
        <h1 className="text-center">
            View Employee
        </h1>

        <div className="row justify-content-center">
            <div className="col-md-6">
                <div id="liveAlertPlaceholder"></div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            First Name
                        </label>
                        <input type="text" className="form-control" id="firstName" value={employee.first_name} disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                            Last Name
                        </label>
                        <input type="text" className="form-control" id="lastName" value={employee.last_name} disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input type="text" className="form-control" id="email" value={employee.email} disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label">
                            Gender
                        </label>
                        <input type="text" className="form-control" id="gender" value={employee.gender} disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="salary" className="form-label">
                            Salary
                        </label>
                        <input type="text" className="form-control" id="email" value={employee.salary} disabled />
                    </div>
                    <div className="d-grid gap-2">
                        {/* Link button returns to home page */}
                        <Link to="/" className="btn btn-primary mt-3">
                            Back
                        </Link>
                        <div id="spinner" className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}
