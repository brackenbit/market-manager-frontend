/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * MarketsPage
 * Provides calendar view of all markets
 */

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import { getEvents } from "../Utils/marketFunctions";

export const MarketsPage = () => {
    const { authState } = useOktaAuth();

    return (
        <div>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <h1>Markets</h1>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="container">
                            <div className="row">
                                <div className="col-auto">
                                    <Link
                                        className="btn btn-warning"
                                        to="/markets/marketday"
                                    >
                                        Market Day
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />

                <FullCalendar
                    plugins={[
                        dayGridPlugin,
                        interactionPlugin,
                        bootstrap5Plugin,
                    ]}
                    initialView="dayGridMonth"
                    firstDay={1}
                    themeSystem="bootstrap5"
                    buttonIcons={{
                        prev: "arrow-left",
                        next: "arrow-right",
                    }}
                    events={(info, successCallback, failureCallback) =>
                        getEvents(
                            info,
                            successCallback,
                            failureCallback,
                            authState
                        )
                    }
                    eventClick={function (info) {
                        // TODO - placeholder
                        alert("Event id: " + info.event.id);
                    }}
                />
            </div>
        </div>
    );
};
