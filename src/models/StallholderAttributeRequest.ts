/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * StallholderAttributeRequest
 * Has corresponding attributes for all StallholderModel attributes except for id.
 * Used to pass stallholder attributes for add/edit requests.
 */

class StallholderAttributeRequest {
    // Using TS constructor shorthand:
    constructor(
        public stallName: string,
        public category: string,
        public contactName: string,
        public preferredName: string,
        public phone: string,
        public email: string,
        public regular: boolean,
        public stallSize: number,
        public characteristics: string
    ) {}
}

export default StallholderAttributeRequest;
