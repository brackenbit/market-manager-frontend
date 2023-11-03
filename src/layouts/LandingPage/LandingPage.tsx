/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * LandingPage
 * Info page provided to non-logged-in user
 */

import { Link } from "react-router-dom";
import { DemoInfoModal } from "./components/DemoInfoModal";
import { SignUpModal } from "./components/SignUpModal";

export const LandingPage = () => {
    return (
        <div>
            <div className="container-lg">
                <div className="row mt-5 align-items-center">
                    <div className="col-12 col-md-6">
                        <div className="container">
                            <h1 className="display-5 fw-bold mb-3">
                                Market Manager
                            </h1>
                            <p className="lead">
                                Helping manage farmer's markets.
                            </p>
                            <ul>
                                <li>Manage stallholders</li>
                                <li>Plan market days</li>
                                <li>Track fees</li>
                                <li>Manage sites</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="container">
                            <div className="row my-2">
                                <div className="col-8">
                                    <h2>New user?</h2>
                                </div>
                                <div className="col-4 text-center">
                                    <button
                                        className="btn btn-lg main-colour"
                                        data-bs-toggle="modal"
                                        data-bs-target="#signUpModal"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-8">
                                    <h2>Returning user?</h2>
                                </div>
                                <div className="col-4 text-center">
                                    <Link
                                        type="button"
                                        className="btn btn-lg main-colour"
                                        to="/login"
                                    >
                                        Log In
                                    </Link>
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-8">
                                    <h2>Interested in a demo?</h2>
                                </div>
                                <div className="col-4 text-center">
                                    <button
                                        className="btn btn-lg main-colour"
                                        data-bs-toggle="modal"
                                        data-bs-target="#demoInfoModal"
                                    >
                                        Info
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SignUpModal />
            <DemoInfoModal />
        </div>
    );
};
