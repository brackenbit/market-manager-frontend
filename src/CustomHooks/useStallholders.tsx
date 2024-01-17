/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * useStallholders
 * Custom hook for components which rely on a list of stallholders.
 * Inputs are used to return a searched list.
 */

import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import StallholderModel from "../models/StallholderModel";

function useStallholders(
    search: string,
    selectedCategory: string,
    currentPage: number,
    stallholdersPerPage: number
) {
    const { authState } = useOktaAuth();
    const [stallholders, setStallholders] = useState<StallholderModel[]>([]);
    const [isLoadingStallholders, setIsLoadingStallholders] = useState(true);
    const [httpErrorStallholders, setHttpErrorStallholders] = useState();
    const [totalNumberOfStallholders, setTotalNumberOfStallholders] =
        useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchStallholders = async () => {
        if (authState && authState.isAuthenticated) {
            const baseUrl: string = "http://localhost:8080/api/stallholders";
            let searchPath: string = "";

            if (selectedCategory === "Category") {
                if (search === "") {
                    // No category or search term
                    searchPath = `/search/findAllByOrderByStallNameAsc?page=${
                        currentPage - 1
                    }&size=${stallholdersPerPage}`;
                } else {
                    // No category, search term given
                    searchPath = `/search/findByStallNameContaining?stallName=${search}&page=${
                        currentPage - 1
                    }&size=${stallholdersPerPage}`;
                }
            } else {
                const encodedCategory = encodeURIComponent(selectedCategory);
                if (search === "") {
                    // Category chosen, no search term
                    searchPath = `/search/findByCategory?category=${encodedCategory}&page=${
                        currentPage - 1
                    }&size=${stallholdersPerPage}`;
                } else {
                    // Both category and search term given
                    searchPath = `/search/findByStallNameContainingAndCategory?stallName=${search}&category=${encodedCategory}&page=${
                        currentPage - 1
                    }&size=${stallholdersPerPage}`;
                }
            }

            const url = baseUrl + searchPath;

            const requestOptions = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    "Content-Type": "application/json",
                },
            };

            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error("Failed to fetch stallholders");
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.stallholders;

            setTotalNumberOfStallholders(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            // Load retrieved stallholder data into an array of StallholderModel
            const loadedStallholders: StallholderModel[] = [];
            for (const key in responseData) {
                loadedStallholders.push({
                    id: responseData[key].id,
                    stallName: responseData[key].stallName,
                    category: responseData[key].category,
                    contactName: responseData[key].contactName,
                    preferredName: responseData[key].preferredName,
                    phone: responseData[key].phone,
                    email: responseData[key].email,

                    regular: responseData[key].regular,
                    stallSize: responseData[key].stallSize,
                    characteristics: responseData[key].characteristics,
                });
            }
            setStallholders(loadedStallholders);
            setIsLoadingStallholders(false);
        }
    };

    useEffect(() => {
        fetchStallholders().catch((error: any) => {
            // Error encountered - stop loading and set HTTP error
            setIsLoadingStallholders(false);
            setHttpErrorStallholders(error.message);
        });
        window.scrollTo(0, 0);
    }, [currentPage, selectedCategory, search]);

    return {
        stallholders,
        isLoadingStallholders,
        httpErrorStallholders,
        totalNumberOfStallholders,
        totalPages,
    };
}

export default useStallholders;
