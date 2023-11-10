/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * EditStallholderPane
 * Choose from a (searchable) list of stallholders, and make changes to a stallholder
 * using a form of input fields.
 *
 * TODO - Partially functional GUI; changes can't be submitted to back end at this stage.
 */

import { useEffect, useState } from "react";
import { StallholderList } from "../../../Utils/StallholderList";
import { EditStallholderFields } from "./EditStallholderFields";
import { SpinnerLoading } from "../../../Utils/SpinnerLoading";
import useStallholderDetail from "../../../../CustomHooks/useStallholderDetail";
import useStallholderCategories from "../../../../CustomHooks/useStallholderCategories";
import StallholderModel from "../../../../models/StallholderModel";

export const EditStallholderPane = () => {
    // Display flags
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    // Stallholder info
    // Define blankStallholder for initial load:
    const blankStallholder: StallholderModel = {
        id: 0,
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
        useState<StallholderModel>(blankStallholder);

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
    // Update editedStallholder to the new stallholder (if it exists)
    useEffect(() => {
        if (stallholder) {
            setEditedStallholder(stallholder);
        }
    }, [isLoadingStallholder]);

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
            <div className="row">
                <div className="col-6">
                    <StallholderList onClickFunction={onStallholderClick} />
                </div>
                <div className="col-6">
                    <h5>Stallholder ID: {stallholder?.id}</h5>
                    <EditStallholderFields
                        stallholderCategories={stallholderCategories}
                        stallholder={editedStallholder}
                        setStallholder={setEditedStallholder}
                    />
                </div>
            </div>
        </div>
    );
};
