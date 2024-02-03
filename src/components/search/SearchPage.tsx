import { Badge, Button, ButtonGroup, Col, Container, Dropdown, Form, FormControl, FormGroup } from "react-bootstrap";
import { Divider, FilterContainer, Heading, HeadingContainer, PageContainer, QueryContainer, QueryItem, QueryResultHeader, ResultContainer } from "./SearchPage.styled";
import { useEffect, useState } from "react";
import { AddCriteriaModal, CriteriaModal } from "./modals/Modals";
import { RaceResultListDisplay } from "../results/RaceResultListDisplay";
import { CustomQueryField, CustomQueryFieldRequest, CustomQueryRequestDto, EMPTY_REQUEST, resultApi } from "../results/resultApi";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { vehicleApi } from "../vehicle/vehicleApi";
import { locationApi } from "../location/locationApi";
import { VehicleSummary } from "../vehicle/Vehicle";
import { Location as LocationEntity } from '../location/Location'

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
    const [searchCriteria, setSearchCriteria] = useState<CustomQueryRequestDto>(EMPTY_REQUEST);
    const [vehicleFilter, setVehicleFilter] = useState<VehicleSummary | undefined>(undefined)
    const [locationFitler, setLocationFilter] = useState<LocationEntity | undefined>(undefined)
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [locations, setLocations] = useState<any[]>([]);
    const [criteriaModalDetails, setCriteriaModalDetails] = useState<any>(undefined);
    const [showAddCriteriaModal, setShowAddCriteriaModal] = useState(false);
    const [extraFields, setExtraFields] = useState<CustomQueryField[]>([])

    const updateLocationFilter = (location: LocationEntity) => {
        setLocationFilter(location)
        setSearchCriteria({
            ...searchCriteria,
            locationId: location.id
        })
    }
    const clearLocationfilter = () => {
        setLocationFilter(undefined);
        setSearchCriteria({
            ...searchCriteria,
            locationId: undefined
        })
    }

    const updateVehicleFilter = (vehicle: VehicleSummary) => {
        setVehicleFilter(vehicle)
        setSearchCriteria({
            ...searchCriteria,
            vehicleId: vehicle.id
        })
    }
    const clearVehicleFilter = () => {
        setVehicleFilter(undefined);
        setSearchCriteria(
            {...searchCriteria, vehicleId: undefined}
        )
    }
    const fetchQueryFields = async () => {
        const queryFields = await resultApi.customQueryFields()
        setExtraFields(queryFields)
    }
    const fetchResults = async () => {
        console.log(searchCriteria)
        const fetchedResults = await resultApi.customQuery(searchCriteria)
        setResults(fetchedResults)
    }

    const fetchVehicles = async () => {
        const vehicles = await vehicleApi.getAllSummaries()
        setVehicles(vehicles || [])
    }

    const fetchLocations = async () => {
        const locations = await locationApi.getAll()
        setLocations(locations || [])
    }

    const getValue = (field: string) => {
        return results.find((result: any) => result.field === field)?.value;
    }

    const withNewQuery = ({vehicleId, locationId}: CustomQueryRequestDto, list: CustomQueryFieldRequest[]) => {
        return {
            vehicleId,
            locationId, 
            query: list
        }
    }

    const replaceQueryParam = (details: any, value: any) => {
        const detailsIndex = searchCriteria.query.findIndex((item) => item.field === details.field);
        if (detailsIndex === -1) {
            const newQueryCriteria = [...searchCriteria.query, {...details, ...value}]
            setSearchCriteria(withNewQuery(searchCriteria, newQueryCriteria))
        } else {
            const newSearchDetails = searchCriteria.query
            newSearchDetails[detailsIndex] = { ...details, ...value };
            setSearchCriteria(withNewQuery(searchCriteria, newSearchDetails));
        }
    }

    useEffect(() => {
        if (searchCriteria.query.length !== 0) {
            fetchResults();
        } else {
            console.log("Setting empty results")
            setResults([])
        }
    }, [searchCriteria])

    useEffect(() => {
        fetchVehicles()
    }, [])

    useEffect(() => {
        fetchLocations()
    }, [])

    useEffect(() => {
        fetchQueryFields()
    }, [])

    const addQueryField = ({field, name}: CustomQueryField & {name: string}) => {
        setShowAddCriteriaModal(false);
        setCriteriaModalDetails({field, name});
    }


    const clearQueryParams = (field: string) => {
        const detailsIndex = searchCriteria.query.findIndex((item) => item.field === field);
        if (detailsIndex !== -1) {
            const newDetails = searchCriteria.query.filter((item) => item.field !== field);
            setSearchCriteria(withNewQuery(searchCriteria, newDetails));
        }
    }

    return <>
        <CriteriaModal show={!!criteriaModalDetails} onHide={() => setCriteriaModalDetails(undefined)} details={criteriaModalDetails} onSubmit={replaceQueryParam} />
        <AddCriteriaModal show={showAddCriteriaModal} onHide={() => setShowAddCriteriaModal(false)} onSubmit={(thing) => addQueryField(thing as any)} extraFields={extraFields}/>
        <PageContainer>
            <HeadingContainer fluid>
                <Heading>Search</Heading>
            </HeadingContainer>
            <QueryContainer direction="horizontal" gap={3}>
                Query
                <Divider/>
                {searchCriteria.query.length != 0 ? <>{searchCriteria.query.map((props) => <SearchCriteria {...props as any} active action={() => setCriteriaModalDetails({ ...props })} clear={() => clearQueryParams(props.field)} />)} <Divider/> </> : <></>}
                {DEFAULT_CRITERIA.filter((item) => searchCriteria.query.findIndex((currentItem) => currentItem.field === item.field) === -1).map((props: any) => <SearchCriteria {...props} value={getValue(props.field) as any} action={() => addQueryField({ name: props.name, field: props.field } as any)}/>)}
                {extraFields.length !== 0 ? <AddCriteria action={() => setShowAddCriteriaModal(true)} /> : <></> }
                <Divider />
                <Button disabled={searchCriteria.query.length === 0} onClick={fetchResults} variant="success">Search</Button>
            </QueryContainer>
            <FilterContainer direction="horizontal" gap={3}>
                Filters
                <Divider/>
                {getVehicleFilterDisplay(updateVehicleFilter, clearVehicleFilter, vehicles, vehicleFilter)}
                {getLocationFilterDisplay(updateLocationFilter, clearLocationfilter, locations, locationFitler)}
            </FilterContainer>

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

const getVehicleFilterDisplay = (updateVehicleFilter: (vehicle: VehicleSummary) => void, clearVehicleFilter: () => void, vehicles?: VehicleSummary[], selectedVehicle?: VehicleSummary) => {
    if (!vehicles) {
        return <></>
    } else if (!selectedVehicle) {
        return <Dropdown as={ButtonGroup} xl={2}>
                    <Dropdown.Toggle id="dropdown-custom-1">Vehicles</Dropdown.Toggle>
                    <Dropdown.Menu className="super-colors">
                        {vehicles.map((vehicle, i) => {
                            return <Dropdown.Item id={i + ""} eventKey={i} onClick={() => updateVehicleFilter(vehicle)}>{vehicle.name}</Dropdown.Item> 
                        })}
                    </Dropdown.Menu>
                </Dropdown>;
    } else {
        return <Button onClick={clearVehicleFilter}>{selectedVehicle.name} <FontAwesomeIcon icon={faX}/></Button>
    }
}

const getLocationFilterDisplay = (updateLocationFilter: (location: LocationEntity) => void, clearLocationFilter: () => void, locations?: LocationEntity[], selectedLocation?: LocationEntity) => {
    if (!locations) {
        return <></>
    } else if (!selectedLocation) {
        return <Dropdown as={ButtonGroup} xl={2}>
                    <Dropdown.Toggle id="dropdown-custom-1">Locations</Dropdown.Toggle>
                    <Dropdown.Menu className="super-colors">
                        {locations.map((location, i) => {
                            return <Dropdown.Item id={i as any} eventKey={i} onClick={() => updateLocationFilter(location)}>{location.name}</Dropdown.Item> 
                        })}
                    </Dropdown.Menu>
                </Dropdown>;
    } else {
        return <Button onClick={clearLocationFilter}>{selectedLocation.name} <FontAwesomeIcon icon={faX}/></Button>
    }
}