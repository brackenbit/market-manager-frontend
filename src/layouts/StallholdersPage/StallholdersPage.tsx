/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * StallholdersPage
 * Renders a list of stallholders using StallholderList.
 * Clicking on a stallholder visits their details page.
 */

import { useState } from "react";
import { StallholderList } from "../Utils/StallholderList";
import useStallholders from "../../CustomHooks/useStallholders";
import { StallholderListSearchBar } from "../Utils/StallholderListSearchBar";
import useStallholderCategories from "../../CustomHooks/useStallholderCategories";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { Pagination } from "../Utils/Pagination";

export const StallholdersPage = () => {
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

    function onStallholderClick(stallholderId: number) {
        window.location.href = `/stallholders/${stallholderId}`;
    }

    // useCategoryDropdown hook
    // (Implements logic to clear search and trigger fetch when category dropdown changes.)
    // useCategoryDropdown(search, setSearch, fetchStallholders, selectedCategory);

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
                onClickFunction={onStallholderClick}
            />
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
