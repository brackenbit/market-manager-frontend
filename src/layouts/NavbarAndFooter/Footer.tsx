/*
 * Market Manager
 * (C) Brackenbit 2023
 */

import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <div className="main-colour">
            <footer className="container d-flex flex-wrap justify-content-between align-items-center py-2 main-colour">
                <p className="col-md-4 mb-0 text-white">© Brackenbit</p>
                <ul className="nav navbar-dark col-md-4 justify-content-end">
                    <li className="nav-item">
                        <Link className="nav-link px-2 text-white" to="/">
                            Home
                        </Link>
                    </li>
                </ul>
            </footer>
        </div>
    );
};
