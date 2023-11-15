/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * EditStallholderPane
 * Choose from a (searchable) list of stallholders, and make changes to a stallholder
 * using a form.
 */

import { useEffect, useRef, useState } from "react";
import { StallholderList } from "../../../Utils/StallholderList";
import { EditStallholderFields } from "./EditStallholderFields";
import { SpinnerLoading } from "../../../Utils/SpinnerLoading";
import useStallholderDetail from "../../../../CustomHooks/useStallholderDetail";
import useStallholderCategories from "../../../../CustomHooks/useStallholderCategories";
import { useOktaAuth } from "@okta/okta-react";
import StallholderAttributeRequest from "../../../../models/StallholderAttributeRequest";
import useStallholders from "../../../../CustomHooks/useStallholders";
import { StallholderListSearchBar } from "../../../Utils/StallholderListSearchBar";
import { Pagination } from "../../../Utils/Pagination";

export const EditStallholderPane = () => {
    const { authState } = useOktaAuth();
    const isInitialMount = useRef(true);

    // Display flags
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    // useStallholders state/hook
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [currentPage, setCurrentPage] = useState(1);
    const [stallholdersPerPage] = useState(12);
    const {
        stallholders,
        isLoadingStallholders,
        httpErrorStallholders,
        totalNumberOfStallholders,
        totalPages,
        fetchStallholders,
    } = useStallholders(
        search,
        selectedCategory,
        currentPage,
        stallholdersPerPage
    );

    // useStallholderDetail state/hook
    const [selectedStallholderId, setSelectedStallholderId] = useState<
        number | null
    >(null);
    const { stallholder, isLoadingStallholder, httpErrorStallholder } =
        useStallholderDetail(selectedStallholderId);

    // useStallholderCategories hook
    const {
        stallholderCategories,
        isLoadingStallholderCategories,
        httpErrorStallholderCategories,
    } = useStallholderCategories();

    // Stallholder info
    // Define blankStallholder for initial load:
    const blankStallholder: StallholderAttributeRequest = {
        name: "",
        category: "Category *",
        contactName: "",
        preferredName: "",
        phone: "",
        email: "",
        regular: false,
        stallSize: 1,
        characteristics: "",
    };
    // editedStallholder state may be changed as a result of either
    // user changes to input fields, or loading new stallholder
    const [editedStallholder, setEditedStallholder] =
        useState<StallholderAttributeRequest>(blankStallholder);

    // Toggle to reset manual changes
    const [cancelChanges, setCancelChanges] = useState(false);

    // On click on a stallholder in the list:
    function onStallholderClick(stallholderId: number) {
        setSelectedStallholderId(stallholderId);
        // This triggers useStallholderDetail hook to reload.
        // Update to input fields is triggered by useEffect below.
    }

    // On change in isLoadingStallholder,
    // Update editedStallholder to new stallholder data (if it exists).
    // Also triggered by cancelChanges, to revert to stallholder
    useEffect(() => {
        if (stallholder) {
            const newStallholder: StallholderAttributeRequest =
                new StallholderAttributeRequest(
                    stallholder.name,
                    stallholder.category,
                    stallholder.contactName,
                    stallholder.preferredName,
                    stallholder.phone,
                    stallholder.email,
                    stallholder.regular,
                    stallholder.stallSize,
                    stallholder.characteristics
                );
            setEditedStallholder(newStallholder);
        }
    }, [isLoadingStallholder, cancelChanges]);

    // useEffect to handle category changes
    useEffect(() => {
        // Ignore on initialMount
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else if (search !== "") {
            // If search is not blank, clear it,
            // (change of category most often implies new search)
            // and triggered _delayed_ fetchStallholders (see below)
            setSearch("");
            setDoDelayedFetch(true);
        } else {
            // If search is already blank, simply fetchStallholders.
            fetchStallholders();
        }
    }, [selectedCategory]);

    // useEffect to trigger delayed reload of stallholders
    // Required when search has just been cleared, to prevent fetchStallholders
    // being called with stale search state.
    const [doDelayedFetch, setDoDelayedFetch] = useState(false);
    useEffect(() => {
        if (doDelayedFetch) {
            fetchStallholders();
            setDoDelayedFetch(false);
        }
    }, [search]);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // editStallholder
    // POST the updated stallholder to the backend
    async function editStallholder() {
        // Only proceed if authenticated and required fields are filled
        if (
            authState?.isAuthenticated &&
            editedStallholder.name !== "" &&
            editedStallholder.category !== "Category" &&
            editedStallholder.contactName !== "" &&
            editedStallholder.phone !== "" &&
            editedStallholder.email !== ""
        ) {
            const url = `http://localhost:8080/api/admin/edit/stallholder/?stallholderId=${selectedStallholderId}`;

            // Set up request options for the imminent POST request
            const requestOptions = {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedStallholder),
            };

            // Make POST request
            const submitNewStallholderResponse = await fetch(
                url,
                requestOptions
            );
            if (!submitNewStallholderResponse.ok) {
                throw new Error("Something went wrong!");
            }
            // Display success
            setDisplayWarning(false);
            setDisplaySuccess(true);
            // And update stallholders
            fetchStallholders();
        } else {
            // Display warning
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }

    if (
        isLoadingStallholders ||
        isLoadingStallholderCategories ||
        isLoadingStallholder
    ) {
        return <SpinnerLoading />;
    }

    if (
        httpErrorStallholders ||
        httpErrorStallholderCategories ||
        httpErrorStallholder
    ) {
        return (
            <div className="container m-5">
                <div className="alert alert-danger">
                    {httpErrorStallholders ? httpErrorStallholders : ""}
                    {httpErrorStallholderCategories
                        ? httpErrorStallholderCategories
                        : ""}
                    {httpErrorStallholder ? httpErrorStallholder : ""}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="alert alert-warning my-3">
                Currently under construction.
            </div>
            {displaySuccess && (
                <div className="alert alert-success" role="alert">
                    Stallholder edited successfully
                </div>
            )}
            {displayWarning && (
                <div className="alert alert-warning" role="alert">
                    Please fill out required fields (*)
                </div>
            )}
            <div className="row">
                <div className="col-6">
                    <StallholderListSearchBar
                        search={search}
                        setSearch={setSearch}
                        searchClicked={fetchStallholders}
                        stallholderCategories={stallholderCategories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                    <StallholderList
                        stallholders={stallholders}
                        onClickFunction={onStallholderClick}
                    />
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            paginate={paginate}
                        />
                    )}
                </div>
                <div className="col-6">
                    <h5>Stallholder ID: {stallholder?.id}</h5>
                    <EditStallholderFields
                        stallholderCategories={stallholderCategories}
                        stallholderAttributes={editedStallholder}
                        setStallholderAttributes={setEditedStallholder}
                    />
                    {/* Bottom buttons */}
                    <div className="row mt-3">
                        <div className="col"></div>
                        <div className="col-auto">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={editStallholder}
                            >
                                Edit Stallholder
                            </button>
                        </div>
                        <div className="col-auto">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setCancelChanges(!cancelChanges)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
