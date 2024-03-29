/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * StallholderList
 * Component to render a list of stallholders.
 * On stallholder click, calls props.onClickFunction with the stallholder id as argument.
 */

import { useState } from "react";
import useStallholders from "../../CustomHooks/useStallholders";
import { Pagination } from "./Pagination";
import { SpinnerLoading } from "./SpinnerLoading";
import { CategoryDropdown } from "./InputComponents/CategoryDropdown";

export const StallholderList: React.FC<{
    onClickFunction: any;
}> = (props) => {
    // useStallholders state/hook
    // searchEditing is dynamically changed by user
    const [searchEditing, setSearchEditing] = useState("");
    // searchSubmitted is updated (to equal searchEditing) only on explicit user action
    // the useStallholders hook re-runs on change to searchSubmitted
    const [searchSubmitted, setSearchSubmitted] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [currentPage, setCurrentPage] = useState(1);
    const [stallholdersPerPage] = useState(12);
    const {
        stallholders,
        isLoadingStallholders,
        httpErrorStallholders,
        totalNumberOfStallholders,
        totalPages,
    } = useStallholders(
        searchSubmitted,
        selectedCategory,
        currentPage,
        stallholdersPerPage
    );

    // handleEnter
    // call handleSearch if Enter pressed in search field
    function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            handleSearch();
        }
    }

    // handleSearch
    // update searchSubmitted to reflect searchEditing,
    // and reset pagination
    function handleSearch() {
        setSearchSubmitted(searchEditing);
        setCurrentPage(1);
    }

    // onCategoryChange
    // clear search fields and set category
    // (Change of category most often indicates start of new search, so
    //  clearing search fields improves usability.)
    function onCategoryChange(newCategory: string) {
        setSearchEditing("");
        setSearchSubmitted("");
        setSelectedCategory(newCategory);
        setCurrentPage(1);
    }

    // paginate
    // set current page number
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (isLoadingStallholders) {
        return <SpinnerLoading />;
    }

    if (httpErrorStallholders) {
        return (
            <div className="container m-5">
                <div className="alert alert-danger">
                    {httpErrorStallholders ? httpErrorStallholders : ""}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="my-2">
                <div className="row">
                    <div className="col-md col-sm-12">
                        <div className="d-flex">
                            <input
                                type="search"
                                className="form-control me-2"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchEditing}
                                onChange={(e) =>
                                    setSearchEditing(e.target.value)
                                }
                                onKeyDown={handleEnter}
                            />
                        </div>
                    </div>
                    <div className="col-md-auto col-6">
                        <CategoryDropdown
                            id="categoryDropdown"
                            value={selectedCategory}
                            allowAll={true}
                            handleChange={onCategoryChange}
                        />
                    </div>
                    <div className="col-md-auto col-6">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <div className="">
                    {stallholders.length > 0 ? (
                        <div className="list-group">
                            {stallholders.map((stallholder) => (
                                <button
                                    type="button"
                                    className="list-group-item list-group-item-action"
                                    key={stallholder.id}
                                    onClick={() =>
                                        props.onClickFunction(stallholder.id)
                                    }
                                >
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col">
                                                {
                                                    stallholder.attributes
                                                        .stallName
                                                }
                                            </div>
                                            <div className="col">
                                                {
                                                    stallholder.attributes
                                                        .category
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="m-5">
                            <h3>No stallholder data found</h3>
                        </div>
                    )}
                </div>
            </div>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                />
            )}
        </div>
    );
};
