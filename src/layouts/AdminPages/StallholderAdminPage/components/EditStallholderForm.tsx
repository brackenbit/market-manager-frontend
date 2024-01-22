/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * EditStallholderForm
 * Reusable form for editing stallholder attributes.
 */

import StallholderAttributeRequest from "../../../../models/StallholderAttributeRequest";
import StallholderCategoryModel from "../../../../models/StallholderCategoryModel";
import { TextInput } from "../../../Utils/TextInput";

export const EditStallholderForm: React.FC<{
    stallholderCategories: StallholderCategoryModel[];
    stallholderAttributes: StallholderAttributeRequest;
    setStallholderAttributes: any;
}> = (props) => {
    // Handle change in input fields
    // (Category dropdown is handled separately below.)
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let value;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        } else {
            value = e.target.value;
        }
        props.setStallholderAttributes({
            ...props.stallholderAttributes,
            [e.target.name]: value,
        });
    }

    return (
        <div className="">
            <form method="POST">
                <TextInput
                    label="Stall Name *"
                    id="stallName"
                    required={true}
                    onChange={handleChange}
                    value={props.stallholderAttributes.stallName}
                />
                {/* category */}
                <div className="my-3">
                    <div className="dropdown">
                        <button
                            type="button"
                            className="btn btn-secondary dropdown-toggle"
                            id="dropdownSearchCategory"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {props.stallholderAttributes.category}
                        </button>
                        <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownSearchCategory"
                        >
                            {props.stallholderCategories.map(
                                (
                                    stallholderCategory: StallholderCategoryModel
                                ) => (
                                    <li key={stallholderCategory.id}>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() =>
                                                props.setStallholderAttributes({
                                                    ...props.stallholderAttributes,
                                                    category:
                                                        stallholderCategory.name,
                                                })
                                            }
                                        >
                                            {stallholderCategory.name}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
                <TextInput
                    label="Contact Name *"
                    id="contactName"
                    required={true}
                    onChange={handleChange}
                    value={props.stallholderAttributes.contactName}
                />
                <TextInput
                    label="Preferred Name"
                    id="preferredName"
                    onChange={handleChange}
                    value={props.stallholderAttributes.preferredName}
                />
                <TextInput
                    label="Phone *"
                    id="phone"
                    required={true}
                    onChange={handleChange}
                    value={props.stallholderAttributes.phone}
                />
                <TextInput
                    label="Email *"
                    id="email"
                    required={true}
                    onChange={handleChange}
                    value={props.stallholderAttributes.email}
                />
                {/* regular */}
                <div className="form-check my-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="regularCheckbox"
                        name="regular"
                        checked={props.stallholderAttributes.regular}
                        onChange={handleChange}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="regularCheckbox"
                    >
                        Regular Attendee
                    </label>
                </div>
                {/* stallSize */}
                <div className="form-floating mb-2">
                    <input
                        type="number"
                        className="form-control"
                        id="stallSizeInput"
                        name="stallSize"
                        placeholder=""
                        required
                        onChange={handleChange}
                        value={props.stallholderAttributes.stallSize}
                    />
                    <label htmlFor="stallSizeInput">Stall Size</label>
                </div>
                {/* TEMP - inelegant way of setting characteristics as placeholder */}
                <TextInput
                    label="Characteristics"
                    id="characteristics"
                    onChange={handleChange}
                    value={props.stallholderAttributes.characteristics}
                />
            </form>
        </div>
    );
};
