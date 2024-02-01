/*
 * Market Manager
 * (C) Brackenbit 2024
 *
 * AppContextProvider
 * Wrapper component to provide application-level context throughout the entire app.
 * Relies on authentication, so must be placed within <Security>.
 *
 * Provides:
 * StallholderCategoryContext
 */

import { PropsWithChildren } from "react";
import useStallholderCategories from "../CustomHooks/useStallholderCategories";
import { StallholderCategoryContext } from "./StallholderCategoryContext";

export const AppContextProvider = (props: PropsWithChildren) => {
    const {
        stallholderCategories,
        isLoadingStallholderCategories,
        httpErrorStallholderCategories,
    } = useStallholderCategories();

    // Return alert if stallholderCategories couldn't be loaded.
    // This indicates something very wrong, so no additional harm in blocking the full app.
    // (NB: alert triggered by HTTP error on load attempt, which can only occur for authenticated users.
    //  Therefore safely ignored when first rendered prior to log on.)
    if (httpErrorStallholderCategories) {
        return (
            <div className="container m-5">
                <div className="alert alert-danger">
                    {httpErrorStallholderCategories
                        ? httpErrorStallholderCategories
                        : ""}
                </div>
            </div>
        );
    }

    return (
        <StallholderCategoryContext.Provider value={stallholderCategories}>
            {props.children}
        </StallholderCategoryContext.Provider>
    );
};
