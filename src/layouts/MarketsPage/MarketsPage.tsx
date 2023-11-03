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

export const MarketsPage = () => {
    const { authState } = useOktaAuth();

    const getEvents = async (
        info: any,
        successCallback: any,
        failureCallback: any
    ) => {
        if (authState && authState.isAuthenticated) {
            // Split out date component from ISO8601 string given by fullcalendar
            const startDate = info.startStr.split("T")[0];
            const endDate = info.endStr.split("T")[0];

            const url: string = `http://localhost:8080/api/markets/feed?start=${startDate}&end=${endDate}`;

            const requestOptions = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    "Content-Type": "application/json",
                },
            };

            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                failureCallback("Failed to load event data");
            }

            const responseJson = await response.json();
            successCallback(responseJson);
        }
    };

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
                                {authState?.isAuthenticated &&
                                    authState.accessToken?.claims?.userType ===
                                        "admin" && (
                                        <div className="col-auto">
                                            <button className="btn btn-primary">
                                                Add Market
                                            </button>
                                        </div>
                                    )}
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
                        getEvents(info, successCallback, failureCallback)
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
