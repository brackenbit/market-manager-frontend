/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * LandingRedirect
 * Redirects logged-in user to /home, and non-logged-in user to /landing
 */

import { useOktaAuth } from "@okta/okta-react";
import { Redirect, Route } from "react-router-dom";

export const LandingRedirect = () => {
    const { authState } = useOktaAuth();

    return (
        <Route path="/" exact>
            {authState && authState?.isAuthenticated ? (
                <Redirect to="/home" />
            ) : (
                <Redirect to="/landing" />
            )}
        </Route>
    );
};
