import React from "react";
import {Link} from "react-router-dom";

export default function Header() {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Employee Management</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" to="/">Home</Link>
                            <Link className="nav-link" to="/new">Add Employee</Link>
                            <a className="nav-link" href="/login">Logout</a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
        
    );
}