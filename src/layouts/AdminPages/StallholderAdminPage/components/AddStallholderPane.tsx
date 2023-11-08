/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * TODO - Non-functional GUI implemented.
 * Backend needs update to support this.
 */

import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import StallholderCategoryModel from "../../../../models/StallholderCategoryModel";
import { SpinnerLoading } from "../../../Utils/SpinnerLoading";

export const AddStallholderPane = () => {
    const { authState } = useOktaAuth();
    const [httpError, setHttpError] = useState(null);
    const [stallholderCategories, setStallholderCategories] = useState<
        StallholderCategoryModel[]
    >([]);
    const [isLoadingStallholderCategories, setIsLoadingStallholderCategories] =
        useState(true);
    // Stallholder info
    const [stallName, setStallName] = useState("");
    const [category, setCategory] = useState("Category");
    const [contactName, setContactName] = useState("");
    const [preferredName, setPreferredName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [regular, setRegular] = useState(false);
    const [stallSize, setStallSize] = useState(1);
    const [characteristics, setCharacteristics] = useState("");

    // useEffect - fetchStallholderCategories
    // Load list of (authoritative) stallholder categories
    // Used e.g. to populate category selection, and enforced on new stallholder creation.
    // NOT enforced at DB level, or on existing stallholders.
    // (Trade off to give flexibility/reliability at cost of (fixable) inconsistency.)
    useEffect(() => {
        const fetchStallholderCategories = async () => {
            if (authState && authState.isAuthenticated) {
                const url: string =
                    "http://localhost:8080/api/stallholderCategories/search/findAllByOrderByNameAsc";

                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        "Content-Type": "application/json",
                    },
                };

                const response = await fetch(url, requestOptions);
                if (!response.ok) {
                    throw new Error("Failed to fetch stallholder categories");
                }

                const responseJson = await response.json();
                const responseData =
                    responseJson._embedded.stallholderCategories;

                // Load retrieved data into an array of StallholderCategoryModel
                const loadedStallholderCategories: StallholderCategoryModel[] =
                    [];
                for (const key in responseData) {
                    loadedStallholderCategories.push({
                        id: responseData[key].id,
                        name: responseData[key].name,
                    });
                }
                setStallholderCategories(loadedStallholderCategories);
            }

            setIsLoadingStallholderCategories(false);
        };

        fetchStallholderCategories().catch((error: any) => {
            // Error encountered - stop loading and set HTTP error
            setIsLoadingStallholderCategories(false);
            setHttpError(error.message);
        });
        window.scrollTo(0, 0);
    }, []);

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

    if (isLoadingStallholderCategories) {
        return <SpinnerLoading />;
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <div className="alert alert-danger">{httpError}</div>
            </div>
        );
    }

    return (
        <div className="mt-3">
            <h4>New Stallholder Details</h4>

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
                            onChange={(e) => setStallName(e.target.value)}
                            value={stallName}
                        />
                        <label htmlFor="stallNameInput">Stall Name</label>
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
                                {category}
                            </button>
                            <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownSearchCategory"
                            >
                                {stallholderCategories.map(
                                    (
                                        stallholderCategory: StallholderCategoryModel
                                    ) => (
                                        <li key={stallholderCategory.id}>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                                onClick={() =>
                                                    setCategory(
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
                            onChange={(e) => setContactName(e.target.value)}
                            value={contactName}
                        />
                        <label htmlFor="contactNameInput">Contact Name</label>
                    </div>
                    {/* preferredName */}
                    <div className="form-floating mb-2">
                        <input
                            type="text"
                            className="form-control"
                            id="preferredNameInput"
                            placeholder=""
                            required
                            onChange={(e) => setPreferredName(e.target.value)}
                            value={preferredName}
                        />
                        <label htmlFor="preferredNameInput">
                            Preferred Name
                        </label>
                    </div>
                    {/* phone */}
                    <div className="form-floating mb-2">
                        <input
                            type="text"
                            className="form-control"
                            id="phoneInput"
                            placeholder=""
                            required
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                        />
                        <label htmlFor="phoneInput">Phone</label>
                    </div>
                    {/* email */}
                    <div className="form-floating mb-2">
                        <input
                            type="email"
                            className="form-control"
                            id="emailInput"
                            placeholder=""
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <label htmlFor="emailInput">Email</label>
                    </div>
                    {/* regular */}
                    <div className="form-check my-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="regularCheckbox"
                            checked={regular}
                            onClick={() => setRegular(!regular)}
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
                                setStallSize(Number(e.target.value))
                            }
                            value={stallSize}
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
                            onChange={(e) => setCharacteristics(e.target.value)}
                            value={characteristics}
                        />
                        <label htmlFor="characteristicsInput">
                            Characteristics
                        </label>
                    </div>
                    {/* Bottom buttons */}
                    <div className="row mt-3">
                        <div className="col"></div>
                        <div className="col-auto">
                            <button type="button" className="btn btn-primary">
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
                </form>
            </div>
        </div>
    );
};
