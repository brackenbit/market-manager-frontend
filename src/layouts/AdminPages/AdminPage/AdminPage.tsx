/*
 * Market Manager
 * (C) Brackenbit 2023
 */

import { Link } from "react-router-dom";

export const AdminPage = () => {
    return (
        <div className="container-md mt-3">
            <h3>Administration</h3>
            <hr />
            <div className="row mt-2">
                <div className="col-12 col-md-4">
                    <h5 className="">Market Administration</h5>
                </div>
                <div className="col-12 col-md-auto">
                    <Link
                        type="button"
                        className="btn btn-primary"
                        to="/admin/market"
                    >
                        Market Admin
                    </Link>
                </div>
                <div className="col"></div>
            </div>
            <hr />
            <div className="row mt-2">
                <div className="col-12 col-md-4">
                    <h5 className="">Stallholder Administration</h5>
                </div>
                <div className="col-12 col-md-auto">
                    <Link
                        type="button"
                        className="btn btn-primary"
                        to="/admin/stallholder"
                    >
                        Stallholder Admin
                    </Link>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
};
