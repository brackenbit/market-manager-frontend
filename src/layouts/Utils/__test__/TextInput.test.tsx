/*
 * Market Manager
 * (C) Brackenbit 2024
 *
 * React Testing Library tests for TextInput component.
 */

import { render, screen } from "@testing-library/react";
import { TextInput } from "../InputComponents/TextInput";
import userEvent from "@testing-library/user-event";

function noop() {}

test('renders input with role "textbox"', () => {
    // Arrange
    render(
        <TextInput
            id="myTextInput"
            label="myLabel"
            handleChange={noop}
            value=""
        />
    );

    // Act
    const inputElement = screen.getByRole("textbox");

    // Assert
    expect(inputElement).toBeInTheDocument();
});

test("renders input with label given in props", () => {
    // Arrange
    render(
        <TextInput
            id="myTextInput"
            label="myLabel"
            handleChange={noop}
            value=""
        />
    );

    // Act
    const inputElement = screen.getByLabelText("myLabel");

    // Assert
    expect(inputElement).toBeInTheDocument();
});

test("renders input with content matching value in props", () => {
    // Arrange
    const value = "Hello world";

    render(
        <TextInput
            id="myTextInput"
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
        <TextInput
            id="someId"
            name={name}
            label="myLabel"
            handleChange={handleChangeMock}
            value="Foo"
        />
    );

    // Act
    const inputElement = screen.getByLabelText("myLabel");
    await userEvent.clear(inputElement);

    // Assert
    expect(handleChangeMock).toHaveBeenCalledWith(name, "");
});

test("correctly sets name if omitted", async () => {
    // Arrange
    const user = userEvent.setup();
    const handleChangeMock = jest.fn();
    const id = "someId";

    render(
        <TextInput
            id={id}
            label="myLabel"
            handleChange={handleChangeMock}
            value="Foo"
        />
    );

    // Act
    const inputElement = screen.getByLabelText("myLabel");
    await userEvent.clear(inputElement);

    // Assert
    expect(handleChangeMock).toHaveBeenCalledWith(id, "");
    // ^ will fail unless name has defaulted to the same as id
});
