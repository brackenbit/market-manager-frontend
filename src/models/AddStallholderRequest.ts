/*
 * Market Manager
 * (C) Brackenbit 2023
 */

class AddStallholderRequest {
    // Using TS constructor shorthand:
    constructor(
        public name: string,
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

export default AddStallholderRequest;
