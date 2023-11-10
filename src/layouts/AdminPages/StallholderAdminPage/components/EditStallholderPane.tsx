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

export const EditStallholderPane = () => {
    // Display flags
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    // Stallholder info input fields
    const [stallName, setStallName] = useState("");
    const [category, setCategory] = useState("Category *");
    const [contactName, setContactName] = useState("");
    const [preferredName, setPreferredName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [regular, setRegular] = useState(false);
    const [stallSize, setStallSize] = useState(1);
    const [characteristics, setCharacteristics] = useState("");
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

    function onStallholderClick(stallholderId: number) {
        // Set the selected stallholder:
        setSelectedStallholderId(stallholderId);
        // This triggers useStallholderDetail hook to reload.
        // Update to input fields is triggered by useEffect below.
    }

    // On change in isLoadingStallholder,
    // update input fields if stallholder exists:
    useEffect(() => {
        if (stallholder) {
            setStallName(stallholder.name);
            setCategory(stallholder.category);
            setContactName(stallholder.contactName);
            setPreferredName(stallholder.preferredName);
            setPhone(stallholder.phone);
            setEmail(stallholder.email);
            setRegular(stallholder.regular);
            setStallSize(stallholder.stallSize);
            setCharacteristics(stallholder.characteristics);
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
                </div>
            </div>
        </div>
    );
};
