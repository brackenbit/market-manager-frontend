/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * useStallholderCategories
 * Custom hook for components which rely on a list of valid stallholder categories.
 * This list of stallholder categories is authoritative.
 * As it is customisable, it is not enforced at the database level or on existing stallholders.
 * (Trade off to give flexibility/reliability at cost of (fixable) inconsistency.)
 */

import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import StallholderCategoryModel from "../models/StallholderCategoryModel";

function useStallholderCategories() {
    const { authState } = useOktaAuth();
    const [stallholderCategories, setStallholderCategories] = useState<
        StallholderCategoryModel[]
    >([]);
    const [isLoadingStallholderCategories, setIsLoadingStallholderCategories] =
        useState(true);
    const [httpErrorStallholderCategories, setHttpErrorStallholderCategories] =
        useState();

    useEffect(() => {
        const fetchStallholderCategories = async () => {
            if (authState && authState.isAuthenticated) {
                // Set up and make HTTP request
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
            setHttpErrorStallholderCategories(error.message);
        });
        window.scrollTo(0, 0);
    }, []);

    return {
        stallholderCategories,
        isLoadingStallholderCategories,
        httpErrorStallholderCategories,
    };
}

export default useStallholderCategories;
