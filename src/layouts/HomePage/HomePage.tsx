/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * HomePage
 * HomePage providing a dashboard and entry point for a user.
 * NB: Currently placeholder content until further user engagement is done.
 */

import { useOktaAuth } from "@okta/okta-react";

export const HomePage = () => {
    const { authState } = useOktaAuth();

    return (
        <div className="container">
            <div className="card my-3">
                <h3 className="card-header">
                    Welcome,{" "}
                    {authState?.accessToken?.claims.given_name
                        ? authState.accessToken.claims.given_name
                        : authState?.accessToken?.claims.sub}
                </h3>
            </div>
            <div className="card my-3">
                <h5 className="card-header">Manage Markets</h5>
                <ul className="list-group list-group-flush">
                    <a
                        className="list-group-item list-group-item-action"
                        href="/markets/marketday"
                    >
                        Jump to <span className="text-warning">Market Day</span>
                    </a>
                    <a
                        className="list-group-item list-group-item-action"
                        href="/markets"
                    >
                        View all Markets
                    </a>
                </ul>
            </div>
            <div className="card my-3">
                <h5 className="card-header">Manage Stallholders</h5>
                <ul className="list-group list-group-flush">
                    <a
                        className="list-group-item list-group-item-action"
                        href="/stallholders"
                    >
                        View all Stallholders
                    </a>
                </ul>
            </div>
            <div className="card my-3">
                <h5 className="card-header">Other Dashboard Content</h5>
                <div className="card-body">
                    <div className="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </div>
                </div>
            </div>
        </div>
    );
};
