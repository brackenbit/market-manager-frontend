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
import useCategoryDropdown from "../../CustomHooks/useCategoryDropdown";

export const StallholdersPage = () => {
    // useStallholders state/hook
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [currentPage, setCurrentPage] = useState(1);
    const [stallholdersPerPage] = useState(12);
    const {
        stallholders,
        isLoadingStallholders,
        httpErrorStallholders,
        totalNumberOfStallholders,
        totalPages,
        fetchStallholders,
    } = useStallholders(
        search,
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
    useCategoryDropdown(search, setSearch, fetchStallholders, selectedCategory);

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
                search={search}
                setSearch={setSearch}
                searchClicked={fetchStallholders}
                stallholderCategories={stallholderCategories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
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
