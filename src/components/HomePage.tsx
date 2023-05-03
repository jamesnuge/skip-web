import { useEffect, useState } from "react"
import { VehicleSummary } from "./vehicle/Vehicle"
import { Button, ButtonGroup, Col, Container, Dropdown, ListGroup } from "react-bootstrap";
import { vehicleApi } from "./vehicle/vehicleApi";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

export const Homepage = () => {
    const [vehicles, setVehicles] = useState<VehicleSummary[]>([]);
    const { push } = useHistory();

    const handleFetchData = async () => {
        const response = await vehicleApi.getAllSummaries()
        setVehicles(response)
    }

    useEffect(() => {
        handleFetchData();
    }, [])

    return <Container>
        <h3>Welcome!</h3>
        <p>Select a vehicle or select an action from the dropdown menu to get started</p>
        <ListGroup as="ol" >
            {vehicles.map((summary) => generateVehicleListItem(summary, push))}
        </ListGroup>
        <br/>
            <ListGroup.Item as="li" onClick={() => push('/vehicle/create')} className="d-flex justify-content-between align-items-start"><div></div><ButtonGroup><Button>Add Vehicle <FontAwesomeIcon icon={faPlus} /></Button></ButtonGroup></ListGroup.Item>
    </Container>
}

const generateVehicleListItem = ({ id, name }: VehicleSummary, push: any) => {
    return <ListGroup.Item
        as="li"
        key={id}
        className="d-flex justify-content-between align-items-start"
    >
        <div className="ms-2 me-auto">
            <div className="fw-bold" onClick={() => push(`/vehicle/${id}`)}>{name}</div>
        </div>
        {generateDropdownMenu(id, push)}
    </ListGroup.Item>
}

const generateDropdownMenu = (vehicleId: number, push: any) => {
    const navigateToVehicleConfig = () => push(`/vehicle/${vehicleId}`)
    const navigateToVehicleResults = () => push(`/results/vehicle/${vehicleId}`)
    const navigateToAddVehicleResults = () => push(`/add/${vehicleId}`)
    return <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle id="dropdown-custom-1"><FontAwesomeIcon icon={faBars} /></Dropdown.Toggle>
        <Dropdown.Menu className="super-colors">
            <Dropdown.Item eventKey="1" onClick={navigateToVehicleResults}>View results</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={navigateToAddVehicleResults}>Add results</Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={navigateToVehicleConfig}>View current configuration</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
}