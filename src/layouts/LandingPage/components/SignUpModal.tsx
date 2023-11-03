/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * TEMP - Modal informing user that sign up is not currently supported
 */

export const SignUpModal = () => {
    return (
        <div
            className="modal fade"
            id="signUpModal"
            aria-labelledby="signUpModalLabel"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="signUpModalLabel">
                            Sign Up Not Supported
                        </h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>
                            Creation of new user accounts is not currently
                            supported.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
