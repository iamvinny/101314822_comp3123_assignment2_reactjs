import axios from "axios";
import React, { useRef } from "react";
import { Auth } from "./UserMiddleware";
import { Link, useNavigate } from "react-router-dom";
const API_LINK = "https://vinicius-101314822-employees.herokuapp.com";

export default function Login() {
    const navigate = useNavigate();
    const auth = Auth();

    async function performLogin(event) {
        event.preventDefault();
        const user = {
            username: username.current.value,
            password: password.current.value,
        };
        try {
            
            const response = await axios.post(`${API_LINK}/api/user/login`,
                {
                    username: username.current.value,
                    password: password.current.value,
                }
            );
            
            if(response.data.jwt_token == "") {
                console.log('Login Failed!');
            } else {
                console.log('User authenticated!');
                sessionStorage.setItem("token", response.data.jwt_token);
                auth.login(user);
                navigate("/");
            }

        } catch (error) {
            document.getElementById("error_feedback").innerHTML = '<span class="text-danger">Username or password incorrect!</span>';
            console.log(error);
        }
    }

    const username = useRef();
    const password = useRef();

    return (
        <div style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "400px"}}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Login</h5>
                    <form onSubmit={performLogin}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input type="text" className="form-control" id="username" ref={username} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input type="password" className="form-control" id="password" ref={password} required />
                        </div>

                        <div id="error_feedback"></div>

                        <button type="submit" className="btn btn-primary mt-3">
                            Login
                        </button>

                        <hr/>

                        <Link to="/register">Don't have an account? Register!</Link>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}