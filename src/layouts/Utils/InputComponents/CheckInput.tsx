/*
 * Market Manager
 * (C) Brackenbit 2024
 *
 * CheckInput
 * Reusable checkbox input component.
 * On change, passes name: string, checked: boolean to the handleChange passed in props.
 * (Currently only need this to support name and checked, i.e. no use of value.)
 */

// Define type for handleChange function (to avoid using "any")
type HandleChangeFunction = (name: string, value: boolean) => void;

interface CheckInputProps {
    id: string;
    name?: string;
    label: string;
    handleChange: HandleChangeFunction;
    value?: string;
    checked: boolean;
}

export const CheckInput: React.FC<CheckInputProps> = (props) => {
    // If name is not provided, make it the same as id
    let name;
    if (typeof props.name !== `undefined`) {
        name = props.name;
    } else {
        name = props.id;
    }

    return (
        <div className="form-check my-3">
            <input
                className="form-check-input"
                type="checkbox"
                // Omit value if not given
                {...(props.value ? { value: props.value } : {})}
                id={props.id}
                name={name}
                checked={props.checked}
                onChange={(e) =>
                    props.handleChange(e.target.name, e.target.checked)
                }
            />
            <label className="form-check-label" htmlFor={props.id}>
                {props.label}
            </label>
        </div>
    );
};
