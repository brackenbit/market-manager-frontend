/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * EditStallholderFields
 * Reusable form for editing stallholder attributes.
 */

import StallholderAttributeRequest from "../../../../models/StallholderAttributeRequest";
import StallholderCategoryModel from "../../../../models/StallholderCategoryModel";
import StallholderModel from "../../../../models/StallholderModel";

export const EditStallholderFields: React.FC<{
    stallholderCategories: StallholderCategoryModel[];
    stallholderAttributes: StallholderAttributeRequest;
    setStallholderAttributes: any;
}> = (props) => {
    // Handle change in input fields
    // (Category dropdown is handled separately below.)
    function handleChange(e: any) {
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
                {/* stallName */}
                <div className="form-floating mb-2">
                    <input
                        type="text"
                        className="form-control"
                        id="stallNameInput"
                        name="name"
                        placeholder="" // Bootstrap floating label requires placeholder present
                        required
                        onChange={handleChange}
                        value={props.stallholderAttributes.name}
                    />
                    <label htmlFor="stallNameInput">Stall Name *</label>
                </div>
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
                {/* contactName */}
                <div className="form-floating mb-2">
                    <input
                        type="text"
                        className="form-control"
                        id="contactNameInput"
                        name="contactName"
                        placeholder=""
                        required
                        onChange={handleChange}
                        value={props.stallholderAttributes.contactName}
                    />
                    <label htmlFor="contactNameInput">Contact Name *</label>
                </div>
                {/* preferredName */}
                <div className="form-floating mb-2">
                    <input
                        type="text"
                        className="form-control"
                        id="preferredNameInput"
                        name="preferredName"
                        placeholder=""
                        required
                        onChange={handleChange}
                        value={props.stallholderAttributes.preferredName}
                    />
                    <label htmlFor="preferredNameInput">Preferred Name</label>
                </div>
                {/* phone */}
                <div className="form-floating mb-2">
                    <input
                        type="text"
                        className="form-control"
                        id="phoneInput"
                        name="phone"
                        placeholder=""
                        required
                        onChange={handleChange}
                        value={props.stallholderAttributes.phone}
                    />
                    <label htmlFor="phoneInput">Phone *</label>
                </div>
                {/* email */}
                <div className="form-floating mb-2">
                    <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        name="email"
                        placeholder=""
                        required
                        onChange={handleChange}
                        value={props.stallholderAttributes.email}
                    />
                    <label htmlFor="emailInput">Email *</label>
                </div>
                {/* regular */}
                <div className="form-check my-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="regularCheckbox"
                        name="regular"
                        // TODO - receiving warning although this works perfectly:
                        checked={props.stallholderAttributes.regular}
                        onClick={handleChange}
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
                {/* characteristics */}
                {/* TEMP - inelegant way of setting characteristics as placeholder */}
                <div className="form-floating mb-2">
                    <input
                        type="text"
                        className="form-control"
                        id="characteristicsInput"
                        name="characteristics"
                        placeholder=""
                        required
                        onChange={handleChange}
                        value={props.stallholderAttributes.characteristics}
                    />
                    <label htmlFor="characteristicsInput">
                        Characteristics
                    </label>
                </div>
            </form>
        </div>
    );
};
