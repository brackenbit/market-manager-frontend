/*
 * Market Manager
 * (C) Brackenbit 2023
 */

import StallholderCategoryModel from "../../../../models/StallholderCategoryModel";

export const EditStallholderFields: React.FC<{
    stallholderCategories: StallholderCategoryModel[];

    // TODO - passing this many props has a bad code smell,
    // but I don't want to pack too many changes into one commit.
    stallName: string;
    setStallName: any;
    category: string;
    setCategory: any;
    contactName: string;
    setContactName: any;
    preferredName: string;
    setPreferredName: any;
    phone: string;
    setPhone: any;
    email: string;
    setEmail: any;
    regular: boolean;
    setRegular: any;
    stallSize: number;
    setStallSize: any;
    characteristics: string;
    setCharacteristics: any;
}> = (props) => {
    return (
        <div className="">
            <form method="POST">
                {/* stallName */}
                <div className="form-floating mb-2">
                    <input
                        type="text"
                        className="form-control"
                        id="stallNameInput"
                        placeholder="" // Bootstrap floating label requires placeholder present
                        required
                        onChange={(e) => props.setStallName(e.target.value)}
                        value={props.stallName}
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
                            {props.category}
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
                                                props.setCategory(
                                                    stallholderCategory.name
                                                )
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
                        placeholder=""
                        required
                        onChange={(e) => props.setContactName(e.target.value)}
                        value={props.contactName}
                    />
                    <label htmlFor="contactNameInput">Contact Name *</label>
                </div>
                {/* preferredName */}
                <div className="form-floating mb-2">
                    <input
                        type="text"
                        className="form-control"
                        id="preferredNameInput"
                        placeholder=""
                        required
                        onChange={(e) => props.setPreferredName(e.target.value)}
                        value={props.preferredName}
                    />
                    <label htmlFor="preferredNameInput">Preferred Name</label>
                </div>
                {/* phone */}
                <div className="form-floating mb-2">
                    <input
                        type="text"
                        className="form-control"
                        id="phoneInput"
                        placeholder=""
                        required
                        onChange={(e) => props.setPhone(e.target.value)}
                        value={props.phone}
                    />
                    <label htmlFor="phoneInput">Phone *</label>
                </div>
                {/* email */}
                <div className="form-floating mb-2">
                    <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        placeholder=""
                        required
                        onChange={(e) => props.setEmail(e.target.value)}
                        value={props.email}
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
                        // TODO - receiving warning although this works perfectly:
                        checked={props.regular}
                        onClick={() => props.setRegular(!props.regular)}
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
                        placeholder=""
                        required
                        onChange={(e) =>
                            props.setStallSize(Number(e.target.value))
                        }
                        value={props.stallSize}
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
                        placeholder=""
                        required
                        onChange={(e) =>
                            props.setCharacteristics(e.target.value)
                        }
                        value={props.characteristics}
                    />
                    <label htmlFor="characteristicsInput">
                        Characteristics
                    </label>
                </div>
            </form>
        </div>
    );
};
