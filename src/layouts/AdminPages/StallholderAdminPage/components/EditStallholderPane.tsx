/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * EditStallholderPane
 * Choose from a (searchable) list of stallholders, and make changes to a stallholder
 * using a form of input fields.
 */

import { useEffect, useState } from "react";
import { StallholderList } from "../../../Utils/StallholderList";
import { EditStallholderFields } from "./EditStallholderFields";
import { SpinnerLoading } from "../../../Utils/SpinnerLoading";
import useStallholderDetail from "../../../../CustomHooks/useStallholderDetail";
import useStallholderCategories from "../../../../CustomHooks/useStallholderCategories";
import StallholderModel from "../../../../models/StallholderModel";
import { useOktaAuth } from "@okta/okta-react";
import StallholderAttributeRequest from "../../../../models/StallholderAttributeRequest";

export const EditStallholderPane = () => {
    const { authState } = useOktaAuth();
    // Display flags
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

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

    // Use custom hooks for stallholder detail and categories
    const [selectedStallholderId, setSelectedStallholderId] = useState<
        number | null
    >(null);
    const { stallholder, isLoadingStallholder, httpErrorStallholder } =
        useStallholderDetail(selectedStallholderId);
    const {
        stallholderCategories,
        isLoadingStallholderCategories,
        httpErrorStallholderCategories,
    } = useStallholderCategories();

    // On click on a stallholder in the list:
    function onStallholderClick(stallholderId: number) {
        // Set the selected stallholder:
        setSelectedStallholderId(stallholderId);
        // This triggers useStallholderDetail hook to reload.
        // Update to input fields is triggered by useEffect below.
    }

    // On change in isLoadingStallholder,
    // Update editedStallholder to new stallholder data (if it exists)
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
        } else {
            // Display warning
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }

    if (isLoadingStallholderCategories) {
        return <SpinnerLoading />;
    }

    if (httpErrorStallholderCategories) {
        return (
            <div className="container m-5">
                <div className="alert alert-danger">
                    {httpErrorStallholderCategories}
                </div>
            </div>
        );
    }

    if (httpErrorStallholder) {
        return (
            <div className="container m-5">
                <div className="alert alert-danger">{httpErrorStallholder}</div>
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
                    <StallholderList onClickFunction={onStallholderClick} />
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
