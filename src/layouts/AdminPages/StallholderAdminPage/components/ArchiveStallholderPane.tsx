/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * TODO - placeholder
 */

import { StallholderList } from "../../../Utils/StallholderList";

export const ArchiveStallholderPane = () => {
    function noop() {}

    return (
        <div>
            <StallholderList onClickFunction={noop} />
        </div>
    );
};
