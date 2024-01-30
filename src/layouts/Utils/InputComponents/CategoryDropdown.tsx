/*
 * Market Manager
 * (C) Brackenbit 2024
 *
 * CategoryDropdown
 * Reusable dropdown component used to select stallholder categories.
 * id is passed as prop, as some pages will use multiple category dropdowns.
 * Initial value is set by prop
 * allowAll sets whether "All" option is available, e.g. for search vs. edit
 * On change, passes new category as string to handleChange passed in props.
 */

import useStallholderCategories from "../../../CustomHooks/useStallholderCategories";
import StallholderCategoryModel from "../../../models/StallholderCategoryModel";

type HandleChangeFunction = (category: string) => void;

export const CategoryDropdown: React.FC<{
    id: string;
    initialValue: string;
    allowAll: boolean;
    handleChange: HandleChangeFunction;
}> = (props) => {
    // useStallholderCategories hook
    const {
        stallholderCategories,
        isLoadingStallholderCategories,
        httpErrorStallholderCategories,
    } = useStallholderCategories();

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
                {props.initialValue}
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
