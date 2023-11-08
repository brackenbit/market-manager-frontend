/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * StallholderList
 * Component to render a list of stallholders,
 * along with search bar which can be used for filtering.
 */

import { useOktaAuth } from "@okta/okta-react";
import StallholderModel from "../../models/StallholderModel";
import { useEffect, useState } from "react";
import StallholderCategoryModel from "../../models/StallholderCategoryModel";
import { SpinnerLoading } from "./SpinnerLoading";
import { StallholderListSearchBar } from "./StallholderListSearchBar";
import { Pagination } from "./Pagination";

export const StallholderList: React.FC<{ onClickFunction: any }> = (props) => {
    const { authState } = useOktaAuth();
    const [stallholders, setStallholders] = useState<StallholderModel[]>([]);
    const [stallholderCategories, setStallholderCategories] = useState<
        StallholderCategoryModel[]
    >([]);
    const [isLoadingStallholders, setIsLoadingStallholders] = useState(true);
    const [isLoadingStallholderCategories, setIsLoadingStallholderCategories] =
        useState(true);
    const [httpError, setHttpError] = useState(null);
    const [totalNumberOfStallholders, setTotalNumberOfStallholders] =
        useState(0);
    // Pagination
    const [stallholdersPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    // Search
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [searchHandleChange, setSearchHandleChange] = useState(false);

    // useEffect - fetchStallholders
    // Load stallholder data, based on selected search term / category
    useEffect(() => {
        const fetchStallholders = async () => {
            if (authState && authState.isAuthenticated) {
                const baseUrl: string =
                    "http://localhost:8080/api/stallholders";
                let searchPath: string = "";

                if (selectedCategory === "Category") {
                    if (search === "") {
                        // No category or search term
                        searchPath = `/search/findAllByOrderByNameAsc?page=${
                            currentPage - 1
                        }&size=${stallholdersPerPage}`;
                    } else {
                        // No category, search term given
                        searchPath = `/search/findByNameContaining?name=${search}&page=${
                            currentPage - 1
                        }&size=${stallholdersPerPage}`;
                    }
                } else {
                    const encodedCategory =
                        encodeURIComponent(selectedCategory);
                    if (search === "") {
                        // Category chosen, no search term
                        searchPath = `/search/findByCategory?category=${encodedCategory}&page=${
                            currentPage - 1
                        }&size=${stallholdersPerPage}`;
                    } else {
                        // Both category and search term given
                        searchPath = `/search/findByNameContainingAndCategory?name=${search}&category=${encodedCategory}&page=${
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
                        name: responseData[key].name,
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

        fetchStallholders().catch((error: any) => {
            // Error encountered - stop loading and set HTTP error
            setIsLoadingStallholders(false);
            setHttpError(error.message);
        });
        window.scrollTo(0, 0);
    }, [searchHandleChange, currentPage]);

    // useEffect - fetchStallholderCategories
    // Load list of (authoritative) stallholder categories
    // Used e.g. to populate category selection, and enforced on new stallholder creation.
    // NOT enforced at DB level, or on existing stallholders.
    // (Trade off to give flexibility/reliability at cost of (fixable) inconsistency.)
    useEffect(() => {
        const fetchStallholderCategories = async () => {
            if (authState && authState.isAuthenticated) {
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
            setHttpError(error.message);
        });
        window.scrollTo(0, 0);
    }, []);

    // useEffect - handleCategoryChange
    // On a change to selected category:
    // - clear the search input (change of category most often implies starting new search)
    // - trigger reloading stallholders
    useEffect(() => {
        const handleCategoryChange = async () => {
            setSearch("");
            searchClicked();
        };
        handleCategoryChange();
    }, [selectedCategory]);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Toggle searchHandleChange to trigger reloading of stallholders
    const searchClicked = () => setSearchHandleChange(!searchHandleChange);

    if (isLoadingStallholders || isLoadingStallholderCategories) {
        return <SpinnerLoading />;
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <div className="alert alert-danger">{httpError}</div>
            </div>
        );
    }

    return (
        <div className="mt-2">
            <StallholderListSearchBar
                search={search}
                setSearch={setSearch}
                searchClicked={searchClicked}
                stallholderCategories={stallholderCategories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <div className="">
                {totalNumberOfStallholders > 0 ? (
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
                                        <div className="col-4">
                                            {stallholder.name}
                                        </div>
                                        <div className="col-4">
                                            {stallholder.category}
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
