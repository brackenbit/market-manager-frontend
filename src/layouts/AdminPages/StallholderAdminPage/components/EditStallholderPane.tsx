/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * EditStallholderPane
 * Choose from a (searchable) list of stallholders, and make changes to a stallholder
 * using a form.
 */

import { useEffect, useState } from "react";
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
    // State, custom hooks, and useEffect -----------------------------------
    // Okta
    const { authState } = useOktaAuth();

    // Display flags
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    // useStallholders state/hook
    // searchEditing is dynamically changed by user
    const [searchEditing, setSearchEditing] = useState("");
    // searchSubmitted is updated (to equal searchEditing) only on explicit user action
    // the useStallholders hook re-runs on change to searchSubmitted
    const [searchSubmitted, setSearchSubmitted] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [currentPage, setCurrentPage] = useState(1);
    const [stallholdersPerPage] = useState(12);
    const {
        stallholders,
        isLoadingStallholders,
        httpErrorStallholders,
        totalNumberOfStallholders,
        totalPages,
    } = useStallholders(
        searchSubmitted,
        selectedCategory,
        currentPage,
        stallholdersPerPage
    );

    // useStallholderDetail state/hook
    const [stallholderSelectedId, setStallholderSelectedId] = useState<
        number | null
    >(null);
    const {
        stallholder: stallholderSelectedModel,
        isLoadingStallholder,
        httpErrorStallholder,
    } = useStallholderDetail(stallholderSelectedId);

    // useStallholderCategories hook
    const {
        stallholderCategories,
        isLoadingStallholderCategories,
        httpErrorStallholderCategories,
    } = useStallholderCategories();

    // Stallholder detail fields
    // Define blankStallholder for initial state
    const blankStallholder: StallholderAttributeRequest = {
        stallName: "",
        category: "Category *",
        contactName: "",
        preferredName: "",
        phone: "",
        email: "",
        regular: false,
        stallSize: 1,
        characteristics: "",
    };
    // stallholderEdited reflects the input fields,
    // i.e. may be dynamically changed by user,
    // and is overwritten (with stallholderSelected) when loading a new stallholder
    // or cancelling changes
    const [stallholderEdited, setStallholderEdited] =
        useState<StallholderAttributeRequest>(blankStallholder);

    // stallholderSelected holds the current stallholder details returned from API
    // NB: this is a StallholderAttributeRequest rather than StallholderModel
    // model returned from API is converted by useEffect below
    const [stallholderSelected, setStallholderSelected] =
        useState<StallholderAttributeRequest>();

    // useEffect - update stallholderSelected and stallholderEdited
    // when stallholderSelectedModel is updated
    useEffect(() => {
        if (stallholderSelectedModel) {
            const newStallholder: StallholderAttributeRequest =
                new StallholderAttributeRequest(
                    stallholderSelectedModel.stallName,
                    stallholderSelectedModel.category,
                    stallholderSelectedModel.contactName,
                    stallholderSelectedModel.preferredName,
                    stallholderSelectedModel.phone,
                    stallholderSelectedModel.email,
                    stallholderSelectedModel.regular,
                    stallholderSelectedModel.stallSize,
                    stallholderSelectedModel.characteristics
                );
            setStallholderSelected(newStallholder);
            setStallholderEdited(newStallholder);
        }
    }, [stallholderSelectedModel]);

    // Functions ----------------------------------------------------------

    // TODO - significant code duplication between here, StallholdersPage, ArchiveStallholderPane
    // refactor needed, but want to commit this working update first.

    // cancelChanges
    // cancel changes made to stallholder details
    function cancelChanges() {
        // Revert stallholderEdited to stallholderSelected
        if (stallholderSelected) {
            setStallholderEdited(stallholderSelected);
        }
    }

    // onCategoryChange
    // clear search fields and set category
    // (Change of category most often indicates start of new search, so
    //  clearing search fields improves usability.)
    function onCategoryChange(newCategory: string) {
        setSearchEditing("");
        setSearchSubmitted("");
        setSelectedCategory(newCategory);
        setCurrentPage(1);
    }

    // handleSearch
    // update searchSubmitted to reflect searchEditing
    function handleSearch() {
        setSearchSubmitted(searchEditing);
        setCurrentPage(1);
    }

    // paginate
    // set current page number
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // editStallholder
    // POST the updated stallholder to the backend
    async function editStallholder() {
        // Only proceed if authenticated and required fields are filled
        if (
            authState?.isAuthenticated &&
            stallholderEdited.stallName !== "" &&
            stallholderEdited.category !== "Category" &&
            stallholderEdited.contactName !== "" &&
            stallholderEdited.phone !== "" &&
            stallholderEdited.email !== ""
        ) {
            const url = `http://localhost:8080/api/admin/edit/stallholder/?stallholderId=${stallholderSelectedId}`;

            // Set up request options for the imminent POST request
            const requestOptions = {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(stallholderEdited),
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
                        search={searchEditing}
                        setSearch={setSearchEditing}
                        searchClicked={handleSearch}
                        stallholderCategories={stallholderCategories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={onCategoryChange}
                    />
                    <StallholderList
                        stallholders={stallholders}
                        onClickFunction={setStallholderSelectedId}
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
                    <h5>Stallholder ID: {stallholderSelectedModel?.id}</h5>
                    <EditStallholderFields
                        stallholderCategories={stallholderCategories}
                        stallholderAttributes={stallholderEdited}
                        setStallholderAttributes={setStallholderEdited}
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
                                onClick={cancelChanges}
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
