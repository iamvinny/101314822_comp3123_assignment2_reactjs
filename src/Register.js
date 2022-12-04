import axios from "axios";
import React, {useRef} from "react";
import {Auth} from "./UserMiddleware";
import {Link, useNavigate} from "react-router-dom";
const API_LINK = "https://vinicius-101314822-employees.herokuapp.com";

export default function Register() {
    const navigate = useNavigate();
    const auth = Auth();

    async function performRegister(event) {
        event.preventDefault();

        const user = {
            username: username_ref.current.value,
            password: password_ref.current.value,
            email:    email_ref.current.value,
        };

        try {
            await axios.post(`${API_LINK}/api/user/signup`, user);
            localStorage.setItem("employee-system", JSON.stringify(user));
            auth.login({username: user.username, password: user.password});
            navigate("/", { replace: true });
        } catch (error) {
            document.getElementById("error_feedback").innerHTML = '<span class="text-danger">Something went wrong, check the fields.</span>';
            console.log(error);
        }
    }

    const username_ref = useRef();
    const password_ref = useRef();
    const email_ref = useRef();

    return (
    <div style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "400px"}}>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Register</h5>
                <form className="form-signin" onSubmit={(event) => performRegister(event)}>

                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">
                            Email address
                        </label>
                        <input type="email" id="email" className="form-control" placeholder="Email address" required autoFocus ref={email_ref} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputUsername" className="form-label">
                            Username
                        </label>
                        <input type="text" id="username" className="form-control" placeholder="Username" required ref={username_ref} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">
                            Password
                        </label>
                        <input type="password" id="password" className="form-control" placeholder="Password" required ref={password_ref} />
                    </div>

                    <div id="error_feedback"></div>

                    <button className="btn btn-primary btn-block mt-3" type="submit">
                        Sign up
                    </button>

                    <hr/>

                    <Link to="/login">Already have an account? Login!</Link>

                </form>
            </div>
        </div>
    </div>
    );
}
