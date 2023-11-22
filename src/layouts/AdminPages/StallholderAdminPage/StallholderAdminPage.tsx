/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * StallholderAdminPage
 * Provides tabs to select stallholder-related admin functions.
 * Actual admin functions are provided by the dedicated components loaded in these tabs.
 */

import { AddStallholderPane } from "./components/AddStallholderPane";
import { EditStallholderPane } from "./components/EditStallholderPane";
import { ArchiveStallholderPane } from "./components/ArchiveStallholderPane";
import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { Redirect } from "react-router-dom";

export const StallholderAdminPage = () => {
    const { authState } = useOktaAuth();
    // Toggled to force reload of components when tabs are changed:
    const [addTabActive, setAddTabActive] = useState(true);
    const [editTabActive, setEditTabActive] = useState(false);
    const [archiveTabActive, setArchiveTabActive] = useState(false);

    function addTabClicked() {
        setAddTabActive(true);
        setEditTabActive(false);
        setArchiveTabActive(false);
    }

    function editTabClicked() {
        setAddTabActive(false);
        setEditTabActive(true);
        setArchiveTabActive(false);
    }

    function archiveTabClicked() {
        setAddTabActive(false);
        setEditTabActive(false);
        setArchiveTabActive(true);
    }

    // Redirect back to home if not admin
    if (authState?.accessToken?.claims.userType !== "admin") {
        return <Redirect to={"/home"} />;
    }

    return (
        <div className="container mt-3">
            {/* TODO - will be replaced with breadcrumbs */}
            <h3>Stallholder Admin</h3>

            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                        className="nav-link active"
                        id="nav-add-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-add-stallholder"
                        type="button"
                        role="tab"
                        aria-controls="nav-add-stallholder-tab"
                        aria-selected="true"
                        onClick={addTabClicked}
                    >
                        Add Stallholder
                    </button>
                    <button
                        className="nav-link"
                        id="nav-edit-stallholder-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-edit-stallholder"
                        type="button"
                        role="tab"
                        aria-controls="nav-edit-stallholder-tab"
                        aria-selected="false"
                        onClick={editTabClicked}
                    >
                        Edit Stallholder
                    </button>
                    <button
                        className="nav-link"
                        id="nav-archive-stallholder-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-archive-stallholder"
                        type="button"
                        role="tab"
                        aria-controls="nav-archive-stallholder-tab"
                        aria-selected="false"
                        onClick={archiveTabClicked}
                    >
                        Archive Stallholder
                    </button>
                </div>
            </nav>

            <div className="tab-content" id="nav-tab-content">
                <div
                    className="tab-pane fade show active"
                    id="nav-add-stallholder"
                    role="tabpanel"
                    aria-labelledby="nav-add-stallholder-tab"
                >
                    {addTabActive ? <AddStallholderPane /> : <></>}
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-edit-stallholder"
                    role="tabpanel"
                    aria-labelledby="nav-edit-stallholder-tab"
                >
                    {editTabActive ? <EditStallholderPane /> : <></>}
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-archive-stallholder"
                    role="tabpanel"
                    aria-labelledby="nav-archive-stallholder-tab"
                >
                    {archiveTabActive ? <ArchiveStallholderPane /> : <></>}
                </div>
            </div>
        </div>
    );
};
