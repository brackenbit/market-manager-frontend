/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * EditStallholderForm
 * Reusable form for editing stallholder attributes.
 */

import StallholderAttributeModel from "../../../../models/StallholderAttributeModel";
import { CategoryDropdown } from "../../../Utils/InputComponents/CategoryDropdown";
import { CheckInput } from "../../../Utils/InputComponents/CheckInput";
import { NumberInput } from "../../../Utils/InputComponents/NumberInput";
import { TextInput } from "../../../Utils/InputComponents/TextInput";

export const EditStallholderForm: React.FC<{
    stallholderAttributes: StallholderAttributeModel;
    setStallholderAttributes: any;
}> = (props) => {
    // Handle change in input fields
    function handleChange(name: string, value: string | boolean) {
        props.setStallholderAttributes({
            ...props.stallholderAttributes,
            [name]: value,
        });
    }
    // (Category dropdown is handled separately below.)

    return (
        <div className="">
            <form method="POST">
                <TextInput
                    label="Stall Name *"
                    id="stallName"
                    required={true}
                    handleChange={handleChange}
                    value={props.stallholderAttributes.stallName}
                />
                <div className="my-3">
                    <CategoryDropdown
                        id="editCategoryDropdown"
                        value={props.stallholderAttributes.category}
                        allowAll={false}
                        handleChange={(newCategory) =>
                            props.setStallholderAttributes({
                                ...props.stallholderAttributes,
                                category: newCategory,
                            })
                        }
                    />
                </div>
                <TextInput
                    label="Contact Name *"
                    id="contactName"
                    required={true}
                    handleChange={handleChange}
                    value={props.stallholderAttributes.contactName}
                />
                <TextInput
                    label="Preferred Name"
                    id="preferredName"
                    handleChange={handleChange}
                    value={props.stallholderAttributes.preferredName}
                />
                <TextInput
                    label="Phone *"
                    id="phone"
                    required={true}
                    handleChange={handleChange}
                    value={props.stallholderAttributes.phone}
                />
                <TextInput
                    label="Email *"
                    id="email"
                    required={true}
                    handleChange={handleChange}
                    value={props.stallholderAttributes.email}
                />
                <CheckInput
                    label="Regular Attendee"
                    id="regular"
                    checked={props.stallholderAttributes.regular}
                    handleChange={handleChange}
                />
                <NumberInput
                    label="Stall Size"
                    id="stallSize"
                    required={true}
                    handleChange={handleChange}
                    value={props.stallholderAttributes.stallSize}
                />
                {/* TEMP - inelegant way of setting characteristics as placeholder */}
                <TextInput
                    label="Characteristics"
                    id="characteristics"
                    handleChange={handleChange}
                    value={props.stallholderAttributes.characteristics}
                />
            </form>
        </div>
    );
};
