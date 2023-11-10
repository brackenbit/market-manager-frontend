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

export const AddStallholderPane = () => {
    const { authState } = useOktaAuth();
    // Display flags
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    // Stallholder info
    const [stallName, setStallName] = useState("");
    const [category, setCategory] = useState("Category *");
    const [contactName, setContactName] = useState("");
    const [preferredName, setPreferredName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [regular, setRegular] = useState(false);
    const [stallSize, setStallSize] = useState(1);
    const [characteristics, setCharacteristics] = useState("");
    // Use custom hook for stallholder categories
    const {
        stallholderCategories,
        isLoadingStallholderCategories,
        httpErrorStallholderCategories,
    } = useStallholderCategories();

    function clearFields() {
        setStallName("");
        setCategory("Category");
        setContactName("");
        setPreferredName("");
        setPhone("");
        setEmail("");
        setRegular(false);
        setStallSize(1);
        setCharacteristics("");
    }

    async function submitNewStallholder() {
        const url = `http://localhost:8080/api/admin/add/stallholder`;
        // Only proceed if authenticated and required fields are filled
        if (
            authState?.isAuthenticated &&
            stallName !== "" &&
            category !== "Category" &&
            contactName !== "" &&
            phone !== "" &&
            email !== ""
        ) {
            // Create new AddStallholderRequest with the entered data
            const newStallholder: AddStallholderRequest =
                new AddStallholderRequest(
                    stallName,
                    category,
                    contactName,
                    preferredName,
                    phone,
                    email,
                    regular,
                    stallSize,
                    characteristics
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
                    Please fill out required fields
                </div>
            )}

            <h4>New Stallholder Details</h4>
            <p>
                <em>* Required fields</em>
            </p>

            <div className="">
                <EditStallholderFields
                    stallholderCategories={stallholderCategories}
                    stallName={stallName}
                    setStallName={setStallName}
                    category={category}
                    setCategory={setCategory}
                    contactName={contactName}
                    setContactName={setContactName}
                    preferredName={preferredName}
                    setPreferredName={setPreferredName}
                    phone={phone}
                    setPhone={setPhone}
                    email={email}
                    setEmail={setEmail}
                    regular={regular}
                    setRegular={setRegular}
                    stallSize={stallSize}
                    setStallSize={setStallSize}
                    characteristics={characteristics}
                    setCharacteristics={setCharacteristics}
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
