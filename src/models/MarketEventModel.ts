/*
 * Market Manager
 * (C) Brackenbit 2023
 */

class MarketEventModel {
    // Using TS constructor shorthand:
    constructor(
        public id: number,
        public title: string,
        public startStr: string
    ) {}
}

export default MarketEventModel;
