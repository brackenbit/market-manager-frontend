/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * StallholdersPage
 * Renders a list of stallholders using StallholderList.
 * Clicking on a stallholder visits their details page.
 */

import { StallholderList } from "../Utils/StallholderList";

export const StallholdersPage = () => {
    function onStallholderClick(stallholderId: number) {
        window.location.href = `/stallholders/${stallholderId}`;
    }

    return (
        <div>
            <StallholderList onClickFunction={onStallholderClick} />
        </div>
    );
};
