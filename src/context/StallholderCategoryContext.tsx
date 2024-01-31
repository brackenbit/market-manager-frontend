/*
 * Market Manager
 * (C) Brackenbit 2024
 *
 * StallholderCategoryContext
 * Context providing a list of valid stallholder categories.
 */

import { createContext } from "react";
import StallholderCategoryModel from "../models/StallholderCategoryModel";

export const StallholderCategoryContext = createContext<
    StallholderCategoryModel[]
>([]);
