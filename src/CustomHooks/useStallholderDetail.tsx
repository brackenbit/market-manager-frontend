/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * useStallholderDetail
 * Custom hook for components which rely on the detail related to a specific stallholder.
 */

import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import StallholderModel from "../models/StallholderModel";

function useStallholderDetail(stallholderId: number | null) {
    const { authState } = useOktaAuth();
    const [stallholder, setStallholder] = useState<StallholderModel>();
    const [isLoadingStallholder, setIsLoadingStallholder] = useState(true);
    const [httpErrorStallholder, setHttpErrorStallholder] = useState();

    useEffect(() => {
        const fetchStallholder = async () => {
            setIsLoadingStallholder(true);

            // Only proceed with fetch if stallholderId has actually been set:
            if (
                authState &&
                authState.isAuthenticated &&
                stallholderId !== null
            ) {
                // Set up and make HTTP request
                const url: string = `http://localhost:8080/api/stallholders/${stallholderId}`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                        "Content-Type": `application/json`,
                    },
                };

                const response = await fetch(url, requestOptions);
                if (!response.ok) {
                    throw new Error("Failed to fetch stallholder data");
                }

                const responseJson = await response.json();

                // Load retrieved data into a StallholderModel object
                const loadedStallholder: StallholderModel = {
                    id: responseJson.id,
                    attributes: {
                        stallName: responseJson.stallName,
                        category: responseJson.category,
                        contactName: responseJson.contactName,
                        preferredName: responseJson.preferredName,
                        phone: responseJson.phone,
                        email: responseJson.email,
                        regular: responseJson.regular,
                        stallSize: responseJson.stallSize,
                        characteristics: responseJson.characteristics,
                    },
                };

                setStallholder(loadedStallholder);
            }
            setIsLoadingStallholder(false);
        };

        fetchStallholder().catch((error: any) => {
            // Error encountered - stop loading and set HTTP error
            setIsLoadingStallholder(false);
            setHttpErrorStallholder(error.message);
        });
    }, [stallholderId]);

    return { stallholder, isLoadingStallholder, httpErrorStallholder };
}

export default useStallholderDetail;
