/*
 * Market Manager
 * (C) Brackenbit 2024
 *
 * React Testing Library tests for CategoryDropdown component.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CategoryDropdown } from "../CategoryDropdown";
import { StallholderCategoryContext } from "../../../../context/StallholderCategoryContext";
import StallholderCategoryModel from "../../../../models/StallholderCategoryModel";

describe("CategoryDropdown", () => {
    // Arrange - once for all tests
    function noop() {}
    const user = userEvent.setup();

    test("renders a button", () => {
        // Arrange
        render(
            <CategoryDropdown
                id="someId"
                value="someValue"
                allowAll={false}
                handleChange={noop}
            />
        );

        // Act
        const inputElement = screen.getByRole("button");

        // Assert
        expect(inputElement).toBeInTheDocument();
    });

    test("renders a button with value given in props", () => {
        // Arrange
        render(
            <>
                <CategoryDropdown
                    id="someId"
                    value="someValue"
                    allowAll={false}
                    handleChange={noop}
                />
                <CategoryDropdown
                    id="someOtherId"
                    value="someOtherValue"
                    allowAll={false}
                    handleChange={noop}
                />
            </>
        );

        // Act
        const inputElement1 = screen.getByLabelText("someValue");
        const inputElement2 = screen.getByLabelText("someOtherValue");

        // Assert
        expect(inputElement1).toBeInTheDocument();
        expect(inputElement2).toBeInTheDocument();
    });

    describe("renders a dropdown with categories given in context", () => {
        // Arrange - once for this block
        // Define value for the stallholderCategoryContext
        const testCategoryContext = [
            { id: 1, name: "Category1" },
            { id: 2, name: "Category2" },
        ] as StallholderCategoryModel[];

        test("and All when allowAll=true", async () => {
            // Arrange
            render(
                <StallholderCategoryContext.Provider
                    value={testCategoryContext}
                >
                    <CategoryDropdown
                        id="someId"
                        value="someValue"
                        allowAll={true}
                        handleChange={noop}
                    />
                </StallholderCategoryContext.Provider>
            );

            // Act
            const inputElement = screen.getByLabelText("someValue");
            await user.click(inputElement);
            // Click should display list of dropdown options

            const allButtons = screen.getAllByRole("button");

            const allButton = screen.getByRole("button", { name: "All" });
            const category1Button = screen.getByRole("button", {
                name: "Category1",
            });
            const category2Button = screen.getByRole("button", {
                name: "Category2",
            });

            // Assert
            expect(inputElement).toBeInTheDocument();
            expect(allButtons.length).toBe(4);
            // ^ 1 from initial value, 1 for All, 2 from testCategoryContext
            expect(allButton).toBeInTheDocument();
            expect(category1Button).toBeInTheDocument();
            expect(category2Button).toBeInTheDocument();
        });

        test("and not All when allowAll=false", async () => {
            // Arrange
            render(
                <StallholderCategoryContext.Provider
                    value={testCategoryContext}
                >
                    <CategoryDropdown
                        id="someId"
                        value="someValue"
                        allowAll={false}
                        handleChange={noop}
                    />
                </StallholderCategoryContext.Provider>
            );

            // Act
            const inputElement = screen.getByLabelText("someValue");
            await user.click(inputElement);
            // Click should display list of dropdown options

            const allButtons = screen.getAllByRole("button");

            const allButton = screen.queryByRole("button", { name: "All" });
            const category1Button = screen.getByRole("button", {
                name: "Category1",
            });
            const category2Button = screen.getByRole("button", {
                name: "Category2",
            });

            // Assert
            expect(inputElement).toBeInTheDocument();
            expect(allButtons.length).toBe(3);
            // ^ 1 from initial value, 2 from testCategoryContext
            expect(allButton).not.toBeInTheDocument();
            expect(category1Button).toBeInTheDocument();
            expect(category2Button).toBeInTheDocument();
        });
    });
});
