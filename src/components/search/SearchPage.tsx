import { Button, ListGroup } from "react-bootstrap";
import { Divider, Heading, HeadingContainer, PageContainer, QueryContainer, QueryItem, QueryResultHeader, QueryResultItem, ResultContainer } from "./SearchPage.styled";
import { useState } from "react";
import { AddCriteriaModal, CriteriaModal } from "./modals/Modals";
import { result } from "lodash";

const DEFAULT_CRITERIA = [
    {
        name: "Time",
        field: "time"
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
    const [searchCriteria, setSearchCriteria] = useState([]);
    const [criteriaModalDetails, setCriteriaModalDetails] = useState<any>(undefined);
    const [showAddCriteriaModal, setShowAddCriteriaModal] = useState(false);
    const generateResults = () => {
        const resultsToAdd = [];
        for (var i = 0; i < 5; i++) {
            resultsToAdd.push({result: i});
        }
        setResults(resultsToAdd);
    }
    const getValue = (field: string) => {
        return results.find((result: any) => result.field === field)?.value;
    }

    const replaceQueryParam = (field: string, value: any) => {
        console.log("replacing query params");
        const result = results.find((result: any) => result.field === field)
        if (result) {
            result.value = value.value;
        } else {
            results.push({field, value: value.value});
        }
            setResults(results);
    }

    return <>
        <CriteriaModal show={!!criteriaModalDetails} onHide={() => setCriteriaModalDetails(undefined)} details={criteriaModalDetails} onSubmit={replaceQueryParam} />
        <AddCriteriaModal show={showAddCriteriaModal} onHide={() => setShowAddCriteriaModal(false)} />
        <HeadingContainer fluid>
            <Heading>Search</Heading>
        </HeadingContainer>
        <PageContainer>
            <QueryContainer direction="horizontal" gap={3}>
                {DEFAULT_CRITERIA.map((props) => <SearchCriteria {...props} value={getValue(props.field) as any} action={() => setCriteriaModalDetails({ name: props.name, field: props.field })} />)}
                <Divider />
                <AddCriteria action={() => setShowAddCriteriaModal(true)} />
                <Divider />
                <Button onClick={generateResults}>Search</Button>
            </QueryContainer>
            {results.length > 0 ? <ResultContainer fluid>
                <QueryResultHeader> 1-{results.length} of {results.length} </QueryResultHeader>
                <ListGroup as="ul">
                    {results.map((_: any, index: number) => {
                        return <ListGroup.Item as="li">
                            Result {index+1}
                        </ListGroup.Item>
                    })}
                </ListGroup>
            </ResultContainer> : <></>}
        </PageContainer>
    </>;
}


interface SearchCriteriaProps {
    name: string;
    field: string;
    value?: string;
    action: () => void
}

const SearchCriteria = ({ name, value, action }: SearchCriteriaProps) => {
    return <QueryItem><Button variant="secondary" onClick={action}>{name}: {value || '-'}</Button></QueryItem>;
}

const AddCriteria = ({ action }: any) => <QueryItem><Button variant="secondary" onClick={action}>More: +</Button></QueryItem>
