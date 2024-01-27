/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * TEMP - GUI mock-up to get user feedback.
 * Code works, but non-functional and e.g. accessibility not tested.
 */

import { useState } from "react";
import { Modal } from "react-bootstrap";
import { TextInput } from "../../../Utils/TextInput";

export const AddMarketModal: React.FC<{
    show: boolean;
    onHide: () => void;
    dateClicked: string;
}> = (props) => {
    const [isOneOff, setIsOneOff] = useState(true);
    const [isAllDay, setIsAllDay] = useState(true);
    const [isEveryMonth, setIsEveryMonth] = useState(true);

    // TEMP - to mock up UI
    const recurrenceTypes = ["day of week", "date"];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    function noop() {}

    return (
        // Using react-bootstrap <Modal> for easier programmatic showing/hiding of modal
        <Modal show={props.show} onHide={props.onHide} tabIndex={-1}>
            <div className="modal-header">
                <h4 className="modal-title" id="addMarketModalLabel">
                    Add Market Event
                </h4>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={props.onHide}
                ></button>
            </div>
            <div className="modal-body">
                {/* TEMP */}
                <h3>{props.dateClicked}</h3>
                <form>
                    {/* One-off / recurring selection */}
                    <div
                        className="btn-group my-2"
                        role="group"
                        aria-label="One-off or recurring event selection buttons"
                    >
                        <input
                            type="radio"
                            className="btn-check"
                            name="oneOffOrRecurring"
                            id="oneOff"
                            defaultChecked
                            onClick={() => setIsOneOff(true)}
                        />
                        <label
                            className="btn btn-outline-primary"
                            htmlFor="oneOff"
                        >
                            One-off
                        </label>
                        <input
                            type="radio"
                            className="btn-check"
                            name="oneOffOrRecurring"
                            id="recurring"
                            onClick={() => setIsOneOff(false)}
                        />
                        <label
                            className="btn btn-outline-primary"
                            htmlFor="recurring"
                        >
                            Recurring
                        </label>
                    </div>
                    {/* title */}
                    <TextInput
                        label="Title"
                        id="title"
                        required={true}
                        onChange={noop}
                        value=""
                    />
                    {!isOneOff && <h6>First event:</h6>}
                    {/* startDate */}
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-2">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="startDateInput"
                                    name="startDate"
                                    placeholder=""
                                    required
                                />
                                <label htmlFor="startDateInput">
                                    Start date
                                </label>
                            </div>
                        </div>
                        {!isAllDay && (
                            <div className="col">
                                <div className="form-floating mb-2">
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="startTimeInput"
                                        name="startTime"
                                        placeholder=""
                                        required
                                    />
                                    <label htmlFor="startTimeInput">
                                        Start time
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* endDate */}
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-2">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="endDateInput"
                                    name="endDate"
                                    placeholder=""
                                    required
                                />
                                <label htmlFor="endDateInput">End date</label>
                            </div>
                        </div>
                        {!isAllDay && (
                            <div className="col">
                                <div className="form-floating mb-2">
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="endTimeInput"
                                        name="endTime"
                                        placeholder=""
                                        required
                                    />
                                    <label htmlFor="endTimeInput">
                                        End time
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* all day */}
                    <div className="form-check ms-1 mb-2">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="allDayCheckbox"
                            name="allDay"
                            checked={isAllDay}
                            onClick={() => {
                                setIsAllDay(!isAllDay);
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="allDayCheckbox"
                        >
                            All day
                        </label>
                    </div>
                    {/* Location */}
                    <TextInput
                        label="Location"
                        id="location"
                        onChange={noop}
                        value=""
                    />
                    {/* Tags */}
                    <TextInput
                        label="Tags"
                        id="tags"
                        onChange={noop}
                        value=""
                    />
                    {/* Recurrence pattern */}
                    {!isOneOff && (
                        <div className="">
                            <div className="row align-items-center">
                                <div className="col-auto">Recurs on</div>
                                <div className="col">
                                    <div className="dropdown">
                                        <button
                                            type="button"
                                            className="btn btn-secondary dropdown-toggle"
                                            id="dropdownRecurrenceType"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            day of week
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownRecurrenceType"
                                        >
                                            {/* TEMP - to mock up UI */}
                                            {recurrenceTypes.map(
                                                (recurrenceType: string) => (
                                                    <li key={recurrenceType}>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            {recurrenceType}
                                                        </a>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* recurrence within a month */}
                            <label className="mt-2">
                                On these occurrences within a month:
                            </label>
                            <div className="row ms-2">
                                <div className="form-check col">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="1stXOfMonthCheckbox"
                                        name="1stXOfMonth"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="1stXOfMonthCheckbox"
                                    >
                                        1st
                                    </label>
                                </div>
                                <div className="form-check col">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="2ndXOfMonthCheckbox"
                                        name="2ndXOfMonth"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="2ndXOfMonthCheckbox"
                                    >
                                        2nd
                                    </label>
                                </div>
                                <div className="form-check col">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="3rdXOfMonthCheckbox"
                                        name="3rdXOfMonth"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="3rdXOfMonthCheckbox"
                                    >
                                        3rd
                                    </label>
                                </div>
                                <div className="form-check col">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="4thXOfMonthCheckbox"
                                        name="4thXOfMonth"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="4thXOfMonthCheckbox"
                                    >
                                        4th
                                    </label>
                                </div>
                                <div className="form-check col">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="5thXOfMonthCheckbox"
                                        name="5thXOfMonth"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="5thXOfMonthCheckbox"
                                    >
                                        5th
                                    </label>
                                </div>
                            </div>
                            {/* recurrence over which months */}
                            <label className="mt-2 me-3">
                                On these months:
                            </label>
                            {isEveryMonth ? (
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setIsEveryMonth(false)}
                                >
                                    All
                                </button>
                            ) : (
                                <>
                                    {/* TEMP - to mock up UI */}
                                    {months.map((month: string) => (
                                        <div className="form-check ms-1 mb-2">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id={`${month}Checkbox`}
                                                name={`${month}`}
                                                defaultChecked
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={`${month}Checkbox`}
                                            >
                                                {month}
                                            </label>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    )}
                </form>
            </div>
        </Modal>
    );
};
