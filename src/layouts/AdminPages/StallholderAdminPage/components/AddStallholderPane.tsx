/*
 * Market Manager
 * (C) Brackenbit 2023
 */

import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { SpinnerLoading } from "../../../Utils/SpinnerLoading";
import AddStallholderRequest from "../../../../models/AddStallholderRequest";
import { EditStallholderFields } from "./EditStallholderFields";
import useStallholderCategories from "../../../../CustomHooks/useStallholderCategories";
import StallholderModel from "../../../../models/StallholderModel";

export const AddStallholderPane = () => {
    const { authState } = useOktaAuth();
    // Display flags
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    // Stallholder info
    // Define blankStallholder for initial load and clearFields():
    const blankStallholder: StallholderModel = {
        id: 0, // id not used by this component
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
    const [stallholder, setStallholder] =
        useState<StallholderModel>(blankStallholder);

    // Use custom hook for stallholder categories
    const {
        stallholderCategories,
        isLoadingStallholderCategories,
        httpErrorStallholderCategories,
    } = useStallholderCategories();

    function clearFields() {
        setStallholder(blankStallholder);
    }

    async function submitNewStallholder() {
        const url = `http://localhost:8080/api/admin/add/stallholder`;
        // Only proceed if authenticated and required fields are filled
        if (
            authState?.isAuthenticated &&
            stallholder.name !== "" &&
            stallholder.category !== "Category" &&
            stallholder.contactName !== "" &&
            stallholder.phone !== "" &&
            stallholder.email !== ""
        ) {
            // Create new AddStallholderRequest with the entered data
            const newStallholder: AddStallholderRequest =
                new AddStallholderRequest(
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

            // Set up request options for the imminent POST request
            const requestOptions = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newStallholder),
            };

            // Make POST request
            const submitNewStallholderResponse = await fetch(
                url,
                requestOptions
            );
            if (!submitNewStallholderResponse.ok) {
                throw new Error("Something went wrong!");
            }
            // Display success and clear fields
            clearFields();
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

    return (
        <div className="mt-3">
            {displaySuccess && (
                <div className="alert alert-success" role="alert">
                    Stallholder added successfully
                </div>
            )}
            {displayWarning && (
                <div className="alert alert-warning" role="alert">
                    Please fill out required fields (*)
                </div>
            )}

            <h4>New Stallholder Details</h4>
            <p>
                <em>* Required fields</em>
            </p>

            <div className="">
                <EditStallholderFields
                    stallholderCategories={stallholderCategories}
                    stallholder={stallholder}
                    setStallholder={setStallholder}
                />

                {/* Bottom buttons */}
                <div className="row mt-3">
                    <div className="col"></div>
                    <div className="col-auto">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={submitNewStallholder}
                        >
                            Add Stallholder
                        </button>
                    </div>
                    <div className="col-auto">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={clearFields}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
