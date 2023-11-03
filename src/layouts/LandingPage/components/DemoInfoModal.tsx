/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * Modal providing demo user credentials
 */

export const DemoInfoModal = () => {
    return (
        <div
            className="modal fade"
            id="demoInfoModal"
            aria-labelledby="demoInfoModalLabel"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="demoInfoModalLabel">
                            Demo information
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
                            You can log into the application for demo purposes
                            using the following credentials:
                        </p>
                        <ul>
                            <li>Username: testuser@email.com</li>
                            <li>Password: test1234!</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
