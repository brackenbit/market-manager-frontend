/*
 * Market Manager
 * (C) Brackenbit 2024
 *
 * React Testing Library tests for EditStallholderForm component.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditStallholderForm } from "../EditStallholderForm";
import StallholderAttributeModel from "../../../../../models/StallholderAttributeModel";

describe("EditStallholderForm", () => {
    // Arrange - once for all tests
    function noop() {}
    const user = userEvent.setup();
    const testStallholder: StallholderAttributeModel = {
        stallName: "someStallName",
        category: "someCategory",
        contactName: "someContactName",
        preferredName: "somePreferredName",
        phone: "123456",
        email: "test@email.com",
        regular: false,
        stallSize: 123,
        characteristics: "someCharacteristic",
    };

    test("renders inputs with expected labels and values", () => {
        // Arrange
        render(
            <EditStallholderForm
                stallholderAttributes={testStallholder}
                setStallholderAttributes={noop}
            />
        );

        // Act
        const stallNameInputElement = screen.getByLabelText("Stall Name *");
        const categoryInputElement = screen.getByLabelText("someCategory");
        const contactNameInputElement = screen.getByLabelText("Contact Name *");
        const preferredNameInputElement =
            screen.getByLabelText("Preferred Name");
        const phoneInputElement = screen.getByLabelText("Phone *");
        const emailInputElement = screen.getByLabelText("Email *");
        const regularInputElement = screen.getByLabelText(
            "Regular Attendee"
        ) as HTMLInputElement;
        const stallSizeInputElement = screen.getByLabelText("Stall Size");
        const characteristicsInputElement =
            screen.getByLabelText("Characteristics");

        // Assert
        expect(stallNameInputElement).toHaveValue(testStallholder.stallName);
        expect(categoryInputElement).toBeInTheDocument();
        expect(contactNameInputElement).toHaveValue(
            testStallholder.contactName
        );
        expect(preferredNameInputElement).toHaveValue(
            testStallholder.preferredName
        );
        expect(phoneInputElement).toHaveValue(testStallholder.phone);
        expect(emailInputElement).toHaveValue(testStallholder.email);
        expect(regularInputElement.checked).toBe(testStallholder.regular);
        expect(stallSizeInputElement).toHaveValue(testStallholder.stallSize);
        expect(characteristicsInputElement).toHaveValue(
            testStallholder.characteristics
        );
    });

    describe("calls onChange with new value when input is edited", () => {
        // Arrange - common for all tests in block
        const handleChangeMock = jest.fn();

        test("for stallName input", async () => {
            // Arrange
            const targetLabel = "Stall Name *";
            const expectedResponseContains = { stallName: "" };

            render(
                <EditStallholderForm
                    stallholderAttributes={testStallholder}
                    setStallholderAttributes={handleChangeMock}
                />
            );

            // Act
            const inputElement = screen.getByLabelText(targetLabel);
            await user.clear(inputElement);

            // Assert
            expect(handleChangeMock).toHaveBeenCalledWith(
                expect.objectContaining(expectedResponseContains)
            );
        });

        test("for contactName input", async () => {
            // Arrange
            const targetLabel = "Contact Name *";
            const expectedResponseContains = { contactName: "" };

            render(
                <EditStallholderForm
                    stallholderAttributes={testStallholder}
                    setStallholderAttributes={handleChangeMock}
                />
            );

            // Act
            const inputElement = screen.getByLabelText(targetLabel);
            await user.clear(inputElement);

            // Assert
            expect(handleChangeMock).toHaveBeenCalledWith(
                expect.objectContaining(expectedResponseContains)
            );
        });

        test("for preferredName input", async () => {
            // Arrange
            const targetLabel = "Preferred Name";
            const expectedResponseContains = { preferredName: "" };

            render(
                <EditStallholderForm
                    stallholderAttributes={testStallholder}
                    setStallholderAttributes={handleChangeMock}
                />
            );

            // Act
            const inputElement = screen.getByLabelText(targetLabel);
            await user.clear(inputElement);

            // Assert
            expect(handleChangeMock).toHaveBeenCalledWith(
                expect.objectContaining(expectedResponseContains)
            );
        });

        test("for phone input", async () => {
            // Arrange
            const targetLabel = "Phone *";
            const expectedResponseContains = { phone: "" };

            render(
                <EditStallholderForm
                    stallholderAttributes={testStallholder}
                    setStallholderAttributes={handleChangeMock}
                />
            );

            // Act
            const inputElement = screen.getByLabelText(targetLabel);
            await user.clear(inputElement);

            // Assert
            expect(handleChangeMock).toHaveBeenCalledWith(
                expect.objectContaining(expectedResponseContains)
            );
        });

        test("for email input", async () => {
            // Arrange
            const targetLabel = "Email *";
            const expectedResponseContains = { email: "" };

            render(
                <EditStallholderForm
                    stallholderAttributes={testStallholder}
                    setStallholderAttributes={handleChangeMock}
                />
            );

            // Act
            const inputElement = screen.getByLabelText(targetLabel);
            await user.clear(inputElement);

            // Assert
            expect(handleChangeMock).toHaveBeenCalledWith(
                expect.objectContaining(expectedResponseContains)
            );
        });

        test("for stallSize input", async () => {
            // Arrange
            const targetLabel = "Stall Size";
            const expectedResponseContains = { stallSize: "" };

            render(
                <EditStallholderForm
                    stallholderAttributes={testStallholder}
                    setStallholderAttributes={handleChangeMock}
                />
            );

            // Act
            const inputElement = screen.getByLabelText(targetLabel);
            await user.clear(inputElement);

            // Assert
            expect(handleChangeMock).toHaveBeenCalledWith(
                expect.objectContaining(expectedResponseContains)
            );
        });

        test("for characteristics input", async () => {
            // Arrange
            const targetLabel = "Characteristics";
            const expectedResponseContains = { characteristics: "" };

            render(
                <EditStallholderForm
                    stallholderAttributes={testStallholder}
                    setStallholderAttributes={handleChangeMock}
                />
            );

            // Act
            const inputElement = screen.getByLabelText(targetLabel);
            await user.clear(inputElement);

            // Assert
            expect(handleChangeMock).toHaveBeenCalledWith(
                expect.objectContaining(expectedResponseContains)
            );
        });
    });
});
