import React, {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {TableComposable, Caption, Thead, Tr, Th, Tbody, Td} from "@patternfly/react-table";
import {DateTime} from "luxon";
import {EmptyState, EmptyStateIcon, Spinner, Title} from "@patternfly/react-core";

import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";


function RunningTimes({entryStation, exitStation}) {
    const {isLoading, error, data} = useQuery(["runningTimes", entryStation, exitStation],
        ({signal}) =>
            axios.get("/rpc/running_times",
                {
                    params: {
                        "entry_station": entryStation,
                        "exit_station": exitStation,
                        "order": "exit_time.desc"
                    },
                    signal,
                })
                .then((res) => res.data),
    )

    if (isLoading) return <EmptyState>
        <EmptyStateIcon variant="container" component={Spinner} />
        <Title size="lg" headingLevel="h4">
            Loading
        </Title>
    </EmptyState>;

    if (error) return <EmptyState>
        <EmptyStateIcon variant="container" component={ExclamationCircleIcon} />
        <Title size="lg" headingLevel="h4">
            Error: {error.message}
        </Title>
    </EmptyState>;

    return <TableComposable>
        <Thead>
            <Tr>
                <Th>Train</Th>
                <Th>Entry</Th>
                <Th>Exit</Th>
                <Th>Running Time</Th>
            </Tr>
        </Thead>
        <Tbody>
            {data.map((train, index) => {
                const entryTime = DateTime.fromISO(train['entry_time']);
                const exitTime = DateTime.fromISO(train['exit_time']);


                return <Tr key={index}>
                    <Td dataLabel={"Train"}>{train["train_id"]}</Td>
                    <Td dataLabel={"Entry"}>{entryTime.setZone("US/Eastern").toLocaleString(DateTime.TIME_WITH_SECONDS)}</Td>
                    <Td dataLabel={"Exit"}>{exitTime.setZone("US/Eastern").toLocaleString(DateTime.TIME_WITH_SECONDS)}</Td>
                    <Td dataLabel={"Running Time"}>{exitTime.diff(entryTime, ['hours', 'minutes', 'seconds']).toHuman({ unitDisplay: "short" })}</Td>
                </Tr>
            })}
        </Tbody>
    </TableComposable>
}

export default RunningTimes