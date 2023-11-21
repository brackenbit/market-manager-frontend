/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * marketFunctions - reusable utils related to markets / market events
 */

// getEvents - get market events from feed, for fullCalendar
export const getEvents = async (
    info: any,
    successCallback: any,
    failureCallback: any,
    authState: any
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
