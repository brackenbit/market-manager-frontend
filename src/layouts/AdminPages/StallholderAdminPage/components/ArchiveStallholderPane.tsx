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
import useCategoryDropdown from "../../../../CustomHooks/useCategoryDropdown";

export const ArchiveStallholderPane = () => {
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

    // useCategoryDropdown hook
    // (Implements logic to clear search and trigger fetch when category dropdown changes.)
    useCategoryDropdown(search, setSearch, fetchStallholders, selectedCategory);

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
                    search={search}
                    setSearch={setSearch}
                    searchClicked={fetchStallholders}
                    stallholderCategories={stallholderCategories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
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
