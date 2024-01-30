/*
 * Market Manager
 * (C) Brackenbit 2024
 *
 * React Testing Library tests for CheckInput component.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckInput } from "../CheckInput";

function noop() {}

describe("CheckInput", () => {
    test('renders input with role "checkbox"', () => {
        // Arrange
        render(
            <CheckInput
                id="myCheckInput"
                label="myLabel"
                handleChange={noop}
                checked={true}
            />
        );

        // Act
        const inputElement = screen.getByRole("checkbox");

        // Assert
        expect(inputElement).toBeInTheDocument();
    });

    test("renders input with label given in props", () => {
        // Arrange
        const label = "someLabel";

        render(
            <CheckInput
                id="myCheckInput"
                label={label}
                handleChange={noop}
                checked={true}
            />
        );

        // Act
        const inputElement = screen.getByLabelText(label);

        // Assert
        expect(inputElement).toBeInTheDocument();
    });

    test("renders input with checked attribute matching props", () => {
        // Arrange
        render(
            <>
                <CheckInput
                    id="checked"
                    label="checked"
                    handleChange={noop}
                    checked={true}
                />
                <CheckInput
                    id="unchecked"
                    label="unchecked"
                    handleChange={noop}
                    checked={false}
                />
            </>
        );

        // Act
        const checkedInputElement = screen.getByLabelText(
            "checked"
        ) as HTMLInputElement;
        const uncheckedInputElement = screen.getByLabelText(
            "unchecked"
        ) as HTMLInputElement;

        // Assert
        expect(checkedInputElement.checked).toBe(true);
        expect(uncheckedInputElement.checked).toBe(false);
    });

    test("calls onChange with new value when input is clicked", async () => {
        // Arrange
        const user = userEvent.setup();
        const handleChangeMock1 = jest.fn();
        const handleChangeMock2 = jest.fn();

        render(
            <>
                <CheckInput
                    id="initiallyChecked"
                    name="initiallyChecked"
                    label="initiallyChecked"
                    handleChange={handleChangeMock1}
                    checked={true}
                />
                <CheckInput
                    id="initiallyUnchecked"
                    name="initiallyUnchecked"
                    label="initiallyUnchecked"
                    handleChange={handleChangeMock2}
                    checked={false}
                />
            </>
        );

        // Act
        const initiallyCheckedElement =
            screen.getByLabelText("initiallyChecked");
        await user.click(initiallyCheckedElement);
        const initiallyUncheckedElement =
            screen.getByLabelText("initiallyUnchecked");
        await user.click(initiallyUncheckedElement);

        // Assert
        expect(handleChangeMock1).toHaveBeenCalledWith(
            "initiallyChecked",
            false
        );
        expect(handleChangeMock2).toHaveBeenCalledWith(
            "initiallyUnchecked",
            true
        );
    });

    test("correctly sets name if omitted", async () => {
        // Arrange
        const user = userEvent.setup();
        const handleChangeMock = jest.fn();
        const id = "someId";
        const label = "someLabel";

        render(
            <CheckInput
                id={id}
                label={label}
                handleChange={handleChangeMock}
                checked={false}
            />
        );

        // Act
        const inputElement = screen.getByLabelText(label);
        await user.click(inputElement);

        // Assert
        expect(handleChangeMock).toHaveBeenCalledWith(id, true);
        // ^ will fail unless name has defaulted to the same as id
    });
});
