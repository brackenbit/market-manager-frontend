/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * TEMP - Placeholder
 */

import { Modal } from "react-bootstrap";

export const EditMarketModal: React.FC<{
    show: boolean;
    onHide: () => void;
    eventClicked: string;
}> = (props) => {
    return (
        // Using react-bootstrap <Modal> for easier programmatic showing/hiding of modal
        <Modal show={props.show} onHide={props.onHide} tabIndex={-1}>
            <div className="modal-header">
                <h4 className="modal-title" id="editMarketModalLabel">
                    Edit Market Event
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
                <h3>Event ID: {props.eventClicked}</h3>
                <p>
                    This will become a modal for editing existing market events.
                    (Not yet implemented)
                </p>
            </div>
        </Modal>
    );
};
