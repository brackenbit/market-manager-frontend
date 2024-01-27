/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * MarketAdminPage
 * Provides calendar view to perform market-event-related admin functions.
 */

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import { getEvents } from "../../Utils/marketFunctions";
import { useOktaAuth } from "@okta/okta-react";
import { EditMarketModal } from "./components/EditMarketModal";
import { useEffect, useState } from "react";
import { AddMarketModal } from "./components/AddMarketModal";

export const MarketAdminPage = () => {
    const { authState } = useOktaAuth();

    const [dateClicked, setDateClicked] = useState("");
    const [eventClicked, setEventClicked] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    function handleDateClick(date: string) {
        setDateClicked(date);
        setShowAddModal(true);
    }

    function handleEventClick(id: string) {
        setEventClicked(id);
        setShowEditModal(true);
    }

    return (
        <div>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <h1>Markets</h1>
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
                        handleEventClick(info.event.id);
                    }}
                    dateClick={function (info) {
                        handleDateClick(info.dateStr);
                    }}
                />
            </div>
            <AddMarketModal
                show={showAddModal}
                onHide={() => {
                    setShowAddModal(false);
                }}
                dateClicked={dateClicked}
            />
            <EditMarketModal
                show={showEditModal}
                onHide={() => {
                    setShowEditModal(false);
                }}
                eventClicked={eventClicked}
            />
        </div>
    );
};
