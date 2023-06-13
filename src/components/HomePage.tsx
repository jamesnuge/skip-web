import { useEffect, useState } from "react"
import { VehicleSummary } from "./vehicle/Vehicle"
import { Button, ButtonGroup, Container, Dropdown, ListGroup, Modal } from "react-bootstrap";
import { vehicleApi } from "./vehicle/vehicleApi";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

export const Homepage = () => {
    const [vehicles, setVehicles] = useState<VehicleSummary[]>([]);
    const [vehicleId, setVehicleId] = useState<{id: number, name: string} | undefined>(undefined)
    const { push } = useHistory();

    const handleFetchData = async () => {
        const response = await vehicleApi.getAllSummaries()
        setVehicles(response)
    }

    useEffect(() => {
        handleFetchData();
    }, [])

    return <Container>
        <ArchiveModal show={vehicleId !== undefined} onHide={() => setVehicleId(undefined)} details={vehicleId!!}/>
        <h3>Welcome!</h3>
        <p>Select a vehicle or select an action from the dropdown menu to get started</p>
        <ListGroup as="ol" >
            {vehicles.map((summary) => generateVehicleListItem(summary, push, setVehicleId))}
        </ListGroup>
        <br/>
            <ListGroup.Item as="li" onClick={() => push('/vehicle/create')} className="d-flex justify-content-between align-items-start"><div></div><ButtonGroup><Button>Add Vehicle <FontAwesomeIcon icon={faPlus} /></Button></ButtonGroup></ListGroup.Item>
    </Container>
}

const generateVehicleListItem = ({ id, name }: VehicleSummary, push: any, setVehicleId: (details: {id: number, name: string}) => void) => {
    return <ListGroup.Item
        as="li"
        key={id}
        className="d-flex justify-content-between align-items-start"
    >
        <div className="ms-2 me-auto">
            <div className="fw-bold" onClick={() => push(`/vehicle/${id}`)}>{name}</div>
        </div>
        {generateDropdownMenu(id, name, push, setVehicleId)}
    </ListGroup.Item>
}

const generateDropdownMenu = (vehicleId: number, vehicleName: string, push: any, setVehicleId: (details: {id: number, name: string}) => void) => {
    const navigateToVehicleConfig = () => push(`/vehicle/${vehicleId}`)
    const navigateToVehicleResults = () => push(`/results/vehicle/${vehicleId}`)
    const navigateToAddVehicleResults = () => push(`/add/${vehicleId}`)
    const archiveVehicle = () => {}
    return <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle id="dropdown-custom-1"><FontAwesomeIcon icon={faBars} /></Dropdown.Toggle>
        <Dropdown.Menu className="super-colors">
            <Dropdown.Item eventKey="1" onClick={navigateToVehicleResults}>View results</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={navigateToAddVehicleResults}>Add results</Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={navigateToVehicleConfig}>View current configuration</Dropdown.Item>
            <Dropdown.Item className="text-danger" eventKey="4" onClick={() => setVehicleId({id: vehicleId, name: vehicleName})}>Archive Vehicle</Dropdown.Item>
            {/* <div><Button variant="danger" onClick={() => setVehicleId({id: vehicleId, name: vehicleName})}>Archive Vehicle</Button></div> */}

        </Dropdown.Menu>
    </Dropdown>
}

type ArchiveModalProps = {
    show: boolean,
    onHide: () => void,
    details: {
    id: number,
    name: string
    } | undefined
}

const ArchiveModal = ({show, onHide, details}: ArchiveModalProps) => {
    const completeArchive = async () => {
        await vehicleApi.archiveVehicle(details!.id)
        onHide()
        window.location.reload();
    }
    return <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>
         Warning
      </Modal.Title>
    </Modal.Header>
        <Modal.Body>
            Are you sure you want to archive {details?.name}?<br/>
            Archiving this vehicle will remove it from display and exclude all results from searches
        </Modal.Body>
    <Modal.Footer>
        <Button onClick={completeArchive}>
            Archive
        </Button>
      <Button variant="secondary" onClick={onHide}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
}