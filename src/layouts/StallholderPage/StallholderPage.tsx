/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * StallholderPage
 * Detail page for a specific stallholder.
 * Shows stallholder info.
 * TODO - In future, will show e.g. financial summary, attendance pattern.
 */

import { useEffect } from "react";
import StallholderModel from "../../models/StallholderModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import useStallholderDetail from "../../CustomHooks/useStallholderDetail";

export const StallholderPage = () => {
    // Extract stallholder id from path
    const stallholderId = Number(window.location.pathname.split("/")[2]);

    // Use custom hook for stallholder detail
    const { stallholder, isLoadingStallholder, httpErrorStallholder } =
        useStallholderDetail(stallholderId);

    if (isLoadingStallholder) {
        return <SpinnerLoading />;
    }

    if (httpErrorStallholder) {
        return (
            <div className="container m-5">
                <div className="alert alert-danger">{httpErrorStallholder}</div>
            </div>
        );
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-12 col-md-6">
                    <h1>{stallholder?.stallName}</h1>
                </div>
                <div className="col-12 col-md-6">
                    <h2>Category: {stallholder?.category}</h2>
                </div>
            </div>
            <div className="card">
                <h5 className="card-header">Stallholder info</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-auto">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-person-circle me-3"
                                    viewBox="0 0 16 16"
                                    aria-label="Contact name"
                                >
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                    />
                                </svg>
                            </div>
                            <div className="col">
                                Full name: {stallholder?.contactName}
                                <br />
                                Preferred:{" "}
                                {stallholder?.preferredName ? (
                                    stallholder?.preferredName
                                ) : (
                                    <em>None</em>
                                )}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-telephone-fill me-3"
                            viewBox="0 0 16 16"
                            aria-label="Phone"
                        >
                            <path
                                fillRule="evenodd"
                                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                            />
                        </svg>
                        {stallholder?.phone}
                    </li>
                    <li className="list-group-item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-envelope-at me-3"
                            viewBox="0 0 16 16"
                            aria-label="Email"
                        >
                            <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                            <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                        </svg>
                        {stallholder?.email}
                    </li>
                    <li className="list-group-item">
                        Regular{" "}
                        {stallholder?.regular ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-check-circle-fill ms-2"
                                viewBox="0 0 16 16"
                                aria-label="Yes"
                            >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-x-circle-fill ms-2"
                                viewBox="0 0 16 16"
                                aria-label="No"
                            >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                            </svg>
                        )}
                    </li>
                    <li className="list-group-item">
                        Stall Size: {stallholder?.stallSize}
                    </li>
                    <li className="list-group-item">
                        Characteristics:{" "}
                        {stallholder?.characteristics
                            ? stallholder.characteristics
                            : "None"}
                    </li>
                </ul>
            </div>
        </div>
    );
};
