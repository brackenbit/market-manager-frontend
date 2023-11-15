/*
 * Market Manager
 * (C) Brackenbit 2023
 *
 * StallholderList
 * Component to render a list of stallholders.
 * On stallholder click, calls props.onClickFunction with the stallholder id as argument.
 */

import StallholderModel from "../../models/StallholderModel";

export const StallholderList: React.FC<{
    stallholders: StallholderModel[];
    onClickFunction: any;
}> = (props) => {
    return (
        <div className="mt-2">
            <div className="">
                {props.stallholders.length > 0 ? (
                    <div className="list-group">
                        {props.stallholders.map((stallholder) => (
                            <button
                                type="button"
                                className="list-group-item list-group-item-action"
                                key={stallholder.id}
                                onClick={() =>
                                    props.onClickFunction(stallholder.id)
                                }
                            >
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col">
                                            {stallholder.name}
                                        </div>
                                        <div className="col">
                                            {stallholder.category}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="m-5">
                        <h3>No stallholder data found</h3>
                    </div>
                )}
            </div>
        </div>
    );
};
