import { Badge, Button, Col, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import { Divider, Heading, HeadingContainer, PageContainer, QueryContainer, QueryItem, QueryResultHeader, ResultContainer } from "./SearchPage.styled";
import { useEffect, useState } from "react";
import { AddCriteriaModal, CriteriaModal } from "./modals/Modals";
import { RaceResultListDisplay } from "../results/RaceResultListDisplay";
import { resultApi } from "../results/resultApi";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DEFAULT_CRITERIA = [
    {
        name: "Track Temp",
        field: "trackTemperature"
    },
    {
        name: "Trackmeter",
        field: "trackmeter"
    },
    {
        name: "Humidity",
        field: "humidity"
    },
    {
        name: "Temperature",
        field: "temperature"
    }
];

export const SearchPage = () => {
    const [results, setResults] = useState<any>([]);
    const [searchCriteria, setSearchCriteria] = useState<any[]>([]);
    const [criteriaModalDetails, setCriteriaModalDetails] = useState<any>(undefined);
    const [showAddCriteriaModal, setShowAddCriteriaModal] = useState(false);
    const fetchResults = async () => {
        const fetchedResults = await resultApi.customQuery(searchCriteria)
        const resultsToAdd = [];
        for (var i = 0; i < 5; i++) {
            resultsToAdd.push(fetchedResults[i])
        }
        setResults(resultsToAdd);
    }
    const getValue = (field: string) => {
        return results.find((result: any) => result.field === field)?.value;
    }

    const replaceQueryParam = (details: any, value: any) => {
        const detailsIndex = searchCriteria.findIndex((item) => item.field === details.field);
        if (detailsIndex === -1) {
            setSearchCriteria([...searchCriteria, { ...details, ...value }])
        } else {
            const newSearchDetails = searchCriteria
            newSearchDetails[detailsIndex] = { ...details, ...value };
            setSearchCriteria(newSearchDetails);
        }
        fetchResults()
    }

    useEffect(() => {
        if (searchCriteria.length !== 0) {
            fetchResults();
        }
    }, [])

    const clearQueryParams = (field: string) => {
        const detailsIndex = searchCriteria.findIndex((item) => item.field === field);
        if (detailsIndex !== -1) {
            setSearchCriteria(searchCriteria.filter((item) => item.field !== field));
            fetchResults();
        }
    }

    return <>
        <CriteriaModal show={!!criteriaModalDetails} onHide={() => setCriteriaModalDetails(undefined)} details={criteriaModalDetails} onSubmit={replaceQueryParam} />
        <AddCriteriaModal show={showAddCriteriaModal} onHide={() => setShowAddCriteriaModal(false)} />
        <PageContainer>
            <HeadingContainer fluid>
                <Heading>Search</Heading>
            </HeadingContainer>
            <QueryContainer direction="horizontal" gap={3}>
                {searchCriteria.map((props) => <SearchCriteria {...props} active action={() => setCriteriaModalDetails({ name: props.name, field: props.field })} clear={() => clearQueryParams(props.field)} />)}
                <Divider />
                {DEFAULT_CRITERIA.filter((item) => searchCriteria.findIndex((currentItem) => currentItem.field === item.field) === -1).map((props) => <SearchCriteria {...props} value={getValue(props.field) as any} action={() => setCriteriaModalDetails({ name: props.name, field: props.field })}/>)}
                <AddCriteria action={() => setShowAddCriteriaModal(true)} />
                <Divider />
                <Button disabled={searchCriteria.length === 0} onClick={fetchResults} variant="success">Search</Button>
            </QueryContainer>
            {results.length > 0 ? <ResultContainer fluid>
                <QueryResultHeader> 1-{results.length} of {results.length} </QueryResultHeader>
                <RaceResultListDisplay results={results} refresh={() => console.log("refresh")}></RaceResultListDisplay>
            </ResultContainer> : <></>}
        </PageContainer>
    </>;
}


interface SearchCriteriaProps {
    active?: boolean;
    name: string;
    field: string;
    value?: string;
    action: () => void;
    clear?: () => void;
}

const SearchCriteria = ({ active, name, value, action, clear }: SearchCriteriaProps) => {
    return <QueryItem>
        <Button as={'div'} variant={active ? "primary" : "secondary"}>
            <span onClick={action}>{name}: {value || '-'}</span>
            &nbsp;&nbsp;
            {!!clear ? <span onClick={clear}><FontAwesomeIcon icon={faX} /></span> : <></>}
        </Button>
    </QueryItem>;
}

const AddCriteria = ({ action }: any) => <QueryItem><Button variant="secondary" onClick={action}>More: +</Button></QueryItem>

