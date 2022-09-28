import React, { useState } from "react";
import { Select, SelectOption, SelectVariant } from "@patternfly/react-core";

// eslint-disable-next-line import/no-webpack-loader-syntax
import stations from "./stations.csv.webpack[javascript/auto]!=!!!csv-loader?header=true!./stations.csv";

function StationSelector({ selected, setSelected, placeholderText }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Select
            menuAppendTo={"parent"}
            maxHeight={"300px"}
            //width={"45%"}
            variant={SelectVariant.typeahead}
            onToggle={setIsOpen}
            onSelect={(event, selection) => {
                setSelected(selection);
                setIsOpen(false);
            }}
            onClear={() => {
                setSelected(null);
                setIsOpen(false);
            }}
            selections={selected}
            isOpen={isOpen}
            placeholderText={placeholderText}>
            {stations.map((station, index) => (
                <SelectOption
                    key={index}
                    value={station["GTFS Stop ID"]}
                    description={station["Daytime Routes"]}>
                    <b>{station["Stop Name"]}</b> ({station["Line"]})
                </SelectOption>
            ))}
        </Select>
    );
}

export default StationSelector;
