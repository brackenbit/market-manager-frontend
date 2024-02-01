/*
 * Market Manager
 * (C) Brackenbit 2024
 *
 * StallholderModel
 * Model for a specific stallholder, composed of:
 * id, and
 * StallholderAttributeModel object.
 */

import StallholderAttributeModel from "./StallholderAttributeModel";

class StallholderModel {
    // Using TS constructor shorthand:
    constructor(
        public id: number,
        public attributes: StallholderAttributeModel
    ) {}
}

export default StallholderModel;
