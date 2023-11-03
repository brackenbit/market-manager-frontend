/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * Component to render search bar for StallholdersPage.
 * (Separated out for readability.)
 */

import { useState } from "react";
import StallholderCategoryModel from "../../../models/StallholderCategoryModel";

export const SearchBar: React.FC<{
    search: string;
    setSearch: any;
    searchClicked: any;
    stallholderCategories: StallholderCategoryModel[];
    selectedCategory: string;
    setSelectedCategory: any;
}> = (props) => {
    return (
        <div className="container my-2">
            <div className="row">
                <div className="col-6">
                    <div className="d-flex">
                        <input
                            type="search"
                            className="form-control me-2"
                            placeholder="Search"
                            aria-label="Search"
                            value={props.search}
                            onChange={(e) => props.setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-auto">
                    <div className="dropdown">
                        <button
                            type="button"
                            className="btn btn-secondary dropdown-toggle"
                            id="dropdownSearchCategory"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {props.selectedCategory}
                        </button>
                        <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownSearchCategory"
                        >
                            <li key="All">
                                <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() =>
                                        props.setSelectedCategory("Category")
                                    }
                                >
                                    All
                                </a>
                            </li>
                            {props.stallholderCategories.map(
                                (
                                    stallholderCategory: StallholderCategoryModel
                                ) => (
                                    <li key={stallholderCategory.id}>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() =>
                                                props.setSelectedCategory(
                                                    stallholderCategory.name
                                                )
                                            }
                                        >
                                            {stallholderCategory.name}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
                <div className="col-auto">
                    <button className="btn " onClick={props.searchClicked}>
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};
