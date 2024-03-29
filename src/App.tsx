/*
 * Market Manager
 * (C) Brackenbit 2023
 */

import "./App.css";
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";
import { Route, Switch, useHistory } from "react-router-dom";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { OktaConfig } from "./lib/OktaConfig";
import LoginWidget from "./auth/LoginWidget";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { LandingPage } from "./layouts/LandingPage/LandingPage";
import { LandingRedirect } from "./layouts/LandingPage/LandingRedirect";
import { StallholdersPage } from "./layouts/StallholdersPage/StallholdersPage";
import { MarketsPage } from "./layouts/MarketsPage/MarketsPage";
import { StallholderPage } from "./layouts/StallholderPage/StallholderPage";
import { AdminPage } from "./layouts/AdminPages/AdminPage/AdminPage";
import { MarketPage } from "./layouts/MarketPage/MarketPage";
import { MarketAdminPage } from "./layouts/AdminPages/MarketAdminPage/MarketAdminPage";
import { StallholderAdminPage } from "./layouts/AdminPages/StallholderAdminPage/StallholderAdminPage";
import { AppContextProvider } from "./context/AppContextProvider";

const oktaAuth = new OktaAuth(OktaConfig);

export const App = () => {
    const customAuthHandler = () => {
        history.push("/login");
    };

    const history = useHistory();

    const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
        history.replace(
            toRelativeUrl(originalUri || "/", window.location.origin)
        );
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Security
                oktaAuth={oktaAuth}
                restoreOriginalUri={restoreOriginalUri}
                onAuthRequired={customAuthHandler}
            >
                <AppContextProvider>
                    <Navbar />
                    <div className="flex-grow-1">
                        <Switch>
                            <Route path="/" exact>
                                <LandingRedirect />
                            </Route>
                            <Route path="/home">
                                <HomePage />
                            </Route>
                            <Route path="/landing">
                                <LandingPage />
                            </Route>
                            <Route
                                path="/login"
                                render={() => (
                                    <LoginWidget config={OktaConfig} />
                                )}
                            ></Route>
                            <Route
                                path="/login/callback"
                                component={LoginCallback}
                            ></Route>
                            <SecureRoute path="/markets" exact>
                                <MarketsPage />
                            </SecureRoute>
                            <SecureRoute path="/markets/marketday">
                                <MarketPage />
                            </SecureRoute>
                            <SecureRoute path="/markets/:marketId">
                                <MarketPage />
                            </SecureRoute>
                            <SecureRoute path="/stallholders" exact>
                                <StallholdersPage />
                            </SecureRoute>
                            <SecureRoute path="/stallholders/:stallholderId">
                                <StallholderPage />
                            </SecureRoute>
                            <SecureRoute path="/admin" exact>
                                <AdminPage />
                            </SecureRoute>
                            <SecureRoute path="/admin/market">
                                <MarketAdminPage />
                            </SecureRoute>
                            <SecureRoute path="/admin/stallholder">
                                <StallholderAdminPage />
                            </SecureRoute>
                        </Switch>
                    </div>
                    <Footer />
                </AppContextProvider>
            </Security>
        </div>
    );
};
