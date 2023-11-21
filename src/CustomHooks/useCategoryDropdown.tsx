/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * useCategoryDropdown
 * Custom hook to handle logic relating to stallholder search category dropdown
 */

import { useEffect, useRef, useState } from "react";

function useCategoryDropdown(
    search: string,
    setSearch: any,
    fetchStallholders: any,
    selectedCategory: string
) {
    const isInitialMount = useRef(true);
    const [doDelayedFetch, setDoDelayedFetch] = useState(false);

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
    useEffect(() => {
        if (doDelayedFetch) {
            fetchStallholders();
            setDoDelayedFetch(false);
        }
    }, [search]);
}

export default useCategoryDropdown;
