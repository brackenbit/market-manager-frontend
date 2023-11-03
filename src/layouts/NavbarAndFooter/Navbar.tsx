/*
 * Market Manager
 * (C) Brackenbit 2023
 */

import { useOktaAuth } from "@okta/okta-react";
import { Link, NavLink } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { DarkModeToggle } from "./DarkModeToggle";

export const Navbar = () => {
    const { oktaAuth, authState } = useOktaAuth();

    if (!authState) {
        return <SpinnerLoading />;
    }

    const handleLogout = async () => oktaAuth.signOut();

    // TEMP - to support dev work with Postman
    console.log(authState);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark main-colour py-3">
            <div className="container-fluid">
                <span className="navbar-brand">Market Manager</span>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle Navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavDropdown"
                >
                    {/* Left-hand items */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/markets">
                                Markets
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/stallholders">
                                Stallholders
                            </NavLink>
                        </li>
                        {authState.isAuthenticated &&
                            authState.accessToken?.claims?.userType ===
                                "admin" && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin">
                                        Admin
                                    </NavLink>
                                </li>
                            )}
                    </ul>
                    {/* Right-hand items */}
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item m-1">
                            <DarkModeToggle />
                        </li>
                        {!authState.isAuthenticated ? (
                            <li className="nav-item m-1">
                                <Link
                                    type="button"
                                    className="btn btn-outline-light"
                                    to="/login"
                                >
                                    Log In
                                </Link>
                            </li>
                        ) : (
                            <li className="nav-item m-1">
                                <button
                                    className="btn btn-outline-light"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
