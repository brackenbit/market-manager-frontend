/*
 * Market Manager
 * (C) Brackenbit 2024
 *
 * AlertTimed
 * Bootstrap alert which will close automatically after a certain time has passed.
 * Props:
 * message - alert text
 * time - time in seconds for alert to display
 * type - select Bootstrap alert type
 *      Defaults to "primary" alert if type is not given or invalid.
 *      Only "success" alert currently supported, others will be added if/when needed.
 */

import { useEffect, useState } from "react";

interface AlertTimedProps {
    message: string;
    time: number;
    type: string;
}

export const AlertTimed = (props: AlertTimedProps) => {
    const [show, setShow] = useState(true);

    // On mount, create a Timeout to close alert
    useEffect(() => {
        const timeId = setTimeout(() => {
            // set show to false after time has elapsed
            setShow(false);
        }, props.time * 1000);

        // useEffect clean-up function clears Timeout
        return () => {
            clearTimeout(timeId);
        };
    });

    if (!show) {
        // If component shouldn't show, return null
        // (Null is simply ignored, rendering nothing.)
        return null;
    } else {
        // Else return alert JSX depending on type
        if (props.type === "success") {
            return (
                <div className="alert alert-success" role="alert">
                    {props.message}
                </div>
            );
        } else {
            return (
                <div className="alert alert-primary" role="alert">
                    {props.message}
                </div>
            );
        }
    }
};
