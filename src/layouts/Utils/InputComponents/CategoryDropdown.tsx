/*
 * Market Manager
 * (C) Brackenbit 2024
 *
 * CategoryDropdown
 * Reusable dropdown component used to select stallholder categories.
 * id is passed as prop, as some pages will use multiple category dropdowns.
 * allowAll sets whether "All" option is available, e.g. for search vs. edit
 * On change, passes new category as string to handleChange passed in props.
 */

import { useContext } from "react";
import StallholderCategoryModel from "../../../models/StallholderCategoryModel";
import { StallholderCategoryContext } from "../../../context/StallholderCategoryContext";

type HandleChangeFunction = (category: string) => void;

export const CategoryDropdown: React.FC<{
    id: string;
    value: string;
    allowAll: boolean;
    handleChange: HandleChangeFunction;
}> = (props) => {
    // Use StallholderCategoriesContext
    const stallholderCategories = useContext(StallholderCategoryContext);

    return (
        <div className="dropdown">
            <button
                type="button"
                className="btn btn-secondary dropdown-toggle"
                id={props.id}
                data-bs-toggle="dropdown"
                aria-haspopup="menu"
                aria-expanded="false"
            >
                {props.value}
            </button>
            <div className="dropdown-menu" aria-labelledby={props.id}>
                {props.allowAll && (
                    <button
                        key="All"
                        className="dropdown-item"
                        type="button"
                        onClick={() => props.handleChange("Category")}
                    >
                        All
                    </button>
                )}
                {stallholderCategories.map(
                    (stallholderCategory: StallholderCategoryModel) => (
                        <button
                            key={stallholderCategory.id}
                            className="dropdown-item"
                            type="button"
                            onClick={() =>
                                props.handleChange(stallholderCategory.name)
                            }
                        >
                            {stallholderCategory.name}
                        </button>
                    )
                )}
            </div>
        </div>
    );
};
