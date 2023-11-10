/*
 * Market Manager
 * (C) Brackenbit 2023
 */

import { AddStallholderPane } from "./components/AddStallholderPane";
import { EditStallholderPane } from "./components/EditStallholderPane";
import { ArchiveStallholderPane } from "./components/ArchiveStallholderPane";

export const StallholderAdminPage = () => {
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
                    <AddStallholderPane />
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-edit-stallholder"
                    role="tabpanel"
                    aria-labelledby="nav-edit-stallholder-tab"
                >
                    <EditStallholderPane />
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-archive-stallholder"
                    role="tabpanel"
                    aria-labelledby="nav-archive-stallholder-tab"
                >
                    <ArchiveStallholderPane />
                </div>
            </div>
        </div>
    );
};
