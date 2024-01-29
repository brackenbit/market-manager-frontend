/*
 * Market Manager
 * (C) Brackenbit 2024
 *
 * TextInput
 * Reusable text input component.
 * Uses Bootstrap floating labels, and a label must be provided in props.
 * On change, passes name: string, value: string to the handleChange passed in props.
 */

// Define type for handleChange function (to avoid using "any")
type HandleChangeFunction = (name: string, value: string) => void;

interface TextInputProps {
    id: string;
    name?: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    handleChange: HandleChangeFunction;
    value: string;
}

export const TextInput: React.FC<TextInputProps> = (props) => {
    // If name is not provided, make it the same as id
    let name;
    if (typeof props.name !== `undefined`) {
        name = props.name;
    } else {
        name = props.id;
    }

    // If placeholder is not provided, make it a blank string
    // (Required for Bootstrap floating labels.)
    let placeholder;
    if (typeof props.placeholder !== `undefined`) {
        placeholder = props.placeholder;
    } else {
        placeholder = "";
    }

    // If required is not provided, set it to false
    let required;
    if (typeof props.required !== `undefined`) {
        required = props.required;
    } else {
        required = false;
    }

    return (
        <div className="form-floating mb-2">
            <input
                type="text"
                className="form-control"
                id={props.id}
                name={name}
                placeholder={placeholder}
                required={required}
                onChange={(e) =>
                    props.handleChange(e.target.name, e.target.value)
                }
                value={props.value}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
};
