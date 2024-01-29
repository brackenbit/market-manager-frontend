/*
 * Market Manager
 * (C) Brackenbit 2024
 *
 * React Testing Library tests for NumberInput component.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NumberInput } from "../NumberInput";

function noop() {}

test('renders input with role "spinbutton"', () => {
    // Arrange
    render(
        <NumberInput
            id="myNumberInput"
            label="myLabel"
            handleChange={noop}
            value={0}
        />
    );

    // Act
    const inputElement = screen.getByRole("spinbutton");

    // Assert
    expect(inputElement).toBeInTheDocument();
});

test("renders input with label given in props", () => {
    // Arrange
    const label = "someLabel";

    render(
        <NumberInput
            id="myNumberInput"
            label={label}
            handleChange={noop}
            value={0}
        />
    );

    // Act
    const inputElement = screen.getByLabelText(label);

    // Assert
    expect(inputElement).toBeInTheDocument();
});

test("renders input with content matching value in props", () => {
    // Arrange
    const value = 123456;

    render(
        <NumberInput
            id="myNumberInput"
            label="myLabel"
            handleChange={noop}
            value={value}
        />
    );

    // Act
    const inputElement = screen.getByDisplayValue(value);

    // Assert
    expect(inputElement).toBeInTheDocument;
});

test("calls onChange with new value when input is edited", async () => {
    // Arrange
    const user = userEvent.setup();
    const handleChangeMock = jest.fn();
    const name = "someName";

    render(
        <NumberInput
            id="myNumberInput"
            name={name}
            label="myLabel"
            handleChange={handleChangeMock}
            value={123}
        />
    );

    // Act
    const inputElement = screen.getByLabelText("myLabel");
    await user.clear(inputElement);

    // Assert
    expect(handleChangeMock).toHaveBeenCalledWith(name, "");
});

test("correctly sets name if omitted", async () => {
    // Arrange
    const user = userEvent.setup();
    const handleChangeMock = jest.fn();
    const id = "someId";
    const label = "someLabel";

    render(
        <NumberInput
            id={id}
            label={label}
            handleChange={handleChangeMock}
            value={123}
        />
    );

    // Act
    const inputElement = screen.getByLabelText(label);
    await user.clear(inputElement);

    // Assert
    expect(handleChangeMock).toHaveBeenCalledWith(id, "");
    // ^ will fail unless name has defaulted to the same as id
});
