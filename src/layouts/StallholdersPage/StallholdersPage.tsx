/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * StallholdersPage
 * Renders a list of stallholders using StallholderList.
 * Clicking on a stallholder visits their details page.
 */

import { useEffect, useRef, useState } from "react";
import { StallholderList } from "../Utils/StallholderList";
import useStallholders from "../../CustomHooks/useStallholders";
import { StallholderListSearchBar } from "../Utils/StallholderListSearchBar";
import useStallholderCategories from "../../CustomHooks/useStallholderCategories";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { Pagination } from "../Utils/Pagination";

export const StallholdersPage = () => {
    const isInitialMount = useRef(true);

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

    // useEffect to handle category changes
    useEffect(() => {
        // Ignore on initialMount
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else if (search !== "") {
            // If search is not blank, clear it,
            // (change of category most often implies new search)
            // and triggered _delayed_ fetchStallholders (see below)
            setSearch("");
            setDoDelayedFetch(true);
        } else {
            // If search is already blank, simply fetchStallholders.
            fetchStallholders();
        }
    }, [selectedCategory]);

    // useEffect to trigger delayed reload of stallholders
    // Required when search has just been cleared, to prevent fetchStallholders
    // being called with stale search state.
    const [doDelayedFetch, setDoDelayedFetch] = useState(false);
    useEffect(() => {
        if (doDelayedFetch) {
            fetchStallholders();
            setDoDelayedFetch(false);
        }
    }, [search]);

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
