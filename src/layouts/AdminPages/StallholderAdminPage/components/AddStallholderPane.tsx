/*
 * Market Manager
 * (C) Brackenbit 2023
 */

import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import StallholderAttributeModel from "../../../../models/StallholderAttributeModel";
import { EditStallholderForm } from "./EditStallholderForm";

export const AddStallholderPane = () => {
    const { authState } = useOktaAuth();
    // Display flags
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    // Stallholder info
    // Define blankStallholder for initial load and clearFields():
    const blankStallholder: StallholderAttributeModel = {
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
    const [stallholderAttributes, setStallholderAttributes] =
        useState<StallholderAttributeModel>(blankStallholder);

    function clearFields() {
        setStallholderAttributes(blankStallholder);
    }

    // submitNewStallholder
    // POST the new stallholder to the backend
    async function submitNewStallholder() {
        // Only proceed if authenticated and required fields are filled
        if (
            authState?.isAuthenticated &&
            stallholderAttributes.stallName !== "" &&
            stallholderAttributes.category !== "Category" &&
            stallholderAttributes.contactName !== "" &&
            stallholderAttributes.phone !== "" &&
            stallholderAttributes.email !== ""
        ) {
            const url = `http://localhost:8080/api/admin/add/stallholder`;

            // Set up request options for the imminent POST request
            const requestOptions = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(stallholderAttributes),
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
                <EditStallholderForm
                    stallholderAttributes={stallholderAttributes}
                    setStallholderAttributes={setStallholderAttributes}
                />

                {/* Bottom buttons */}
                <div className="row my-3">
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
