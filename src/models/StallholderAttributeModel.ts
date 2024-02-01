/*
 * Market Manager
 * (C) Brackenbit 2024
 *
 * StallholderAttributeModel
 * Model for attributes of a stallholder.
 * Separate to StallholderModel as attributes are commonly used separate from an id,
 * e.g. for add stallholder request.
 */

class StallholderAttributeModel {
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

export default StallholderAttributeModel;
