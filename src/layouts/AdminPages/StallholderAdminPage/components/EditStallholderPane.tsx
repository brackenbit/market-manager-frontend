/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * TODO - placeholder
 */

import { StallholderList } from "../../../Utils/StallholderList";

export const EditStallholderPane = () => {
    function noop() {}

    return (
        <div>
            <div className="alert alert-warning my-3">
                Currently under construction.
            </div>
            <StallholderList onClickFunction={noop} />
        </div>
    );
};
