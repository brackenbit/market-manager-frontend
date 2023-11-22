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
    const [toggleOnDateClick, setToggleOnDateClick] = useState(false);
    // ^ toggles with each calendar click - needed to support e.g.
    // clicking on the same date twice to add 2 x separate events
    // (as dateClicked state would not change to trigger useEffect)
    const [eventClicked, setEventClicked] = useState("");
    const [toggleOnEventClick, setToggleOnEventClick] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    function handleDateClick(date: string) {
        setDateClicked(date);
        setToggleOnDateClick(!toggleOnDateClick);
    }

    function handleEventClick(id: string) {
        setEventClicked(id);
        setToggleOnEventClick(!toggleOnEventClick);
    }

    // useEffect to trigger add modal when toggleOnDateClick changes
    useEffect(() => {
        // Ignore on initialMount
        if (dateClicked === "") {
            return;
        } else {
            setShowAddModal(true);
        }
    }, [toggleOnDateClick]);

    // useEffect to trigger edit modal when toggleOnEventClick changes
    useEffect(() => {
        // Ignore on initialMount
        if (eventClicked === "") {
            return;
        } else {
            setShowEditModal(true);
        }
    }, [toggleOnEventClick]);

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
