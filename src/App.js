import React, {useState} from "react";

import "@patternfly/react-core/dist/styles/base.css";
import "./App.css";

import {
    Page,
    Masthead,
    MastheadMain,
    MastheadBrand,
    MastheadContent,
    PageSection,
    Toolbar,
    ToolbarContent,
    ToolbarItem, EmptyState, EmptyStateIcon, Title, EmptyStateBody, FlexItem, Flex,
} from "@patternfly/react-core";
import CubesIcon from "@patternfly/react-icons/dist/esm/icons/cubes-icon";
import StationSelector from "./StationSelector";
import RunningTimes from "./RunningTimes";



const App = () => {
    const header = <Masthead>
        <MastheadMain>
            <MastheadBrand href="/" target="_blank">
                Last Three Trains
            </MastheadBrand>
        </MastheadMain>
        <MastheadContent>
            <Toolbar id="fill-toolbar">
                <ToolbarContent>
                </ToolbarContent>
            </Toolbar>
        </MastheadContent>
    </Masthead>;

    const [selectedEntry, setSelectedEntry] = useState();
    const [selectedExit, setSelectedExit] = useState();

    return <Page header={header}>
        <PageSection>
            <Flex direction={{ default: 'column', lg: 'row' }} grow={{ default: 'grow' }}>
                <FlexItem>
                    <StationSelector selected={selectedEntry} setSelected={setSelectedEntry}
                                     placeholderText={"Select entry station"}/>
                </FlexItem>
                <FlexItem>
                    <StationSelector selected={selectedExit} setSelected={setSelectedExit}
                                     placeholderText={"Select exit station"}/>
                </FlexItem>
            </Flex>
        </PageSection>
        <PageSection>
            {
                (!!selectedEntry && !!selectedExit) ? (
                    <RunningTimes entryStation={selectedEntry} exitStation={selectedExit} />

                ) : (
                    <EmptyState>
                        <EmptyStateIcon icon={CubesIcon}/>
                        <Title headingLevel="h4" size="lg">
                            Select stations
                        </Title>
                        <EmptyStateBody>
                            Select an entry and exit station to view running times.
                        </EmptyStateBody>
                    </EmptyState>
                )
            }
        </PageSection>
    </Page>;
};

export default App;
