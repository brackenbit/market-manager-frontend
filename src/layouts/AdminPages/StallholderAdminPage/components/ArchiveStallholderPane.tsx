/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * TODO - placeholder
 */

import { useState } from "react";
import { Pagination } from "../../../Utils/Pagination";
import { StallholderList } from "../../../Utils/StallholderList";
import { StallholderListSearchBar } from "../../../Utils/StallholderListSearchBar";
import useStallholders from "../../../../CustomHooks/useStallholders";
import useStallholderCategories from "../../../../CustomHooks/useStallholderCategories";
import { SpinnerLoading } from "../../../Utils/SpinnerLoading";

export const ArchiveStallholderPane = () => {
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

    // useStallholderCategories hook
    const {
        stallholderCategories,
        isLoadingStallholderCategories,
        httpErrorStallholderCategories,
    } = useStallholderCategories();

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

    // handleSearch
    // update searchSubmitted to reflect searchEditing
    function handleSearch() {
        setSearchSubmitted(searchEditing);
        setCurrentPage(1);
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    function noop() {}

    if (isLoadingStallholders || isLoadingStallholderCategories) {
        return <SpinnerLoading />;
    }

    if (httpErrorStallholders || httpErrorStallholderCategories) {
        return (
            <div className="container m-5">
                <div className="alert alert-danger">
                    {httpErrorStallholders ? httpErrorStallholders : ""}
                    {httpErrorStallholderCategories
                        ? httpErrorStallholderCategories
                        : ""}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="alert alert-warning my-3">
                Currently under construction.
            </div>
            <div>
                <StallholderListSearchBar
                    search={searchEditing}
                    setSearch={setSearchEditing}
                    searchClicked={handleSearch}
                    stallholderCategories={stallholderCategories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={onCategoryChange}
                />
                <StallholderList
                    stallholders={stallholders}
                    onClickFunction={noop}
                />
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        paginate={paginate}
                    />
                )}
            </div>
        </div>
    );
};
