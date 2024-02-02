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
import { EditStallholderForm } from "./EditStallholderForm";
import { SpinnerLoading } from "../../../Utils/SpinnerLoading";
import useStallholderDetail from "../../../../CustomHooks/useStallholderDetail";
import { useOktaAuth } from "@okta/okta-react";
import StallholderAttributeModel from "../../../../models/StallholderAttributeModel";

export const EditStallholderPane = () => {
    // State, custom hooks, and useEffect -----------------------------------
    // Okta
    const { authState } = useOktaAuth();

    // Display flags
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    // displaySuccess resets on change to stallholder details, or selection of new stallholder

    // useStallholderDetail state/hook
    const [stallholderSelectedId, setStallholderSelectedId] = useState<
        number | null
    >(null);
    const {
        stallholder: stallholderSelectedModel,
        isLoadingStallholder,
        httpErrorStallholder,
    } = useStallholderDetail(stallholderSelectedId);

    // Stallholder detail fields
    // Define blankStallholder for initial state
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
    // stallholderEdited reflects the input fields,
    // i.e. may be dynamically changed by user,
    // and is overwritten (with stallholderSelected) when loading a new stallholder
    // or cancelling changes
    const [stallholderEdited, setStallholderEdited] =
        useState<StallholderAttributeModel>(blankStallholder);

    // stallholderSelected holds the current stallholder details returned from API
    // NB: this is a StallholderAttributeRequest rather than StallholderModel
    // model returned from API is converted by useEffect below
    const [stallholderSelected, setStallholderSelected] =
        useState<StallholderAttributeModel>();

    // useEffect - update stallholderSelected and stallholderEdited
    // when stallholderSelectedModel is updated
    useEffect(() => {
        if (stallholderSelectedModel) {
            const newStallholder: StallholderAttributeModel =
                new StallholderAttributeModel(
                    stallholderSelectedModel.attributes.stallName,
                    stallholderSelectedModel.attributes.category,
                    stallholderSelectedModel.attributes.contactName,
                    stallholderSelectedModel.attributes.preferredName,
                    stallholderSelectedModel.attributes.phone,
                    stallholderSelectedModel.attributes.email,
                    stallholderSelectedModel.attributes.regular,
                    stallholderSelectedModel.attributes.stallSize,
                    stallholderSelectedModel.attributes.characteristics
                );
            setStallholderSelected(newStallholder);
            setStallholderEdited(newStallholder);
            // Reset displaySuccess here also
            setDisplaySuccess(false);
        }
    }, [stallholderSelectedModel]);

    // useEffect - reset displaySuccess when changes are made to stallholderEdited
    // (useEffect may not be needed here, but this works and allows a simple interface
    //  between EditStallholderPane and EditStallholderForm.)
    useEffect(() => {
        setDisplaySuccess(false);
    }, [stallholderEdited]);

    // Functions ----------------------------------------------------------

    // cancelChanges
    // cancel changes made to stallholder details
    function cancelChanges() {
        // Revert stallholderEdited to stallholderSelected
        if (stallholderSelected) {
            setStallholderEdited(stallholderSelected);
        }
    }

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

    if (httpErrorStallholder) {
        return (
            <div className="container m-5">
                <div className="alert alert-danger">
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
                    <StallholderList
                        onClickFunction={setStallholderSelectedId}
                    />
                </div>
                <div className="col-6">
                    <h5>Stallholder ID: {stallholderSelectedModel?.id}</h5>
                    {isLoadingStallholder ? (
                        <SpinnerLoading />
                    ) : (
                        <EditStallholderForm
                            stallholderAttributes={stallholderEdited}
                            setStallholderAttributes={setStallholderEdited}
                        />
                    )}
                    {/* Bottom buttons */}
                    <div className="row my-3">
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
