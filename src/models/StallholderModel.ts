/*
 * Market Manager
 * (C) Brackenbit 2023
 */

class StallholderModel {
    // Using TS constructor shorthand:
    constructor(
        public id: number,
        public name: string,
        public contactName: string,
        public contactPhone: string,
        public email: string,
        public category: string,
        public regular: boolean,
        public stallSize: number,
        public characteristics: string
    ) {}
}

export default StallholderModel;
