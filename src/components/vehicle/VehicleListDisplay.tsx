import { Button, Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { VehicleSummary } from './Vehicle';
import { vehicleApi } from './vehicleApi';
import { useHistory } from 'react-router-dom';


export const VehicleListDisplay = () => {
    const [vehicles, setVehicles] = useState([] as VehicleSummary[]);
    const history = useHistory();
    const handleFetchData = async () => {
        const response = await vehicleApi.getAllSummaries()
        setVehicles(response)
    }
    const {push} = useHistory()

    useEffect(() => {
        handleFetchData();
    }, []);

    const openVehicle = (id: Number) => () => push(`/vehicle/${id}`)

    return <div>
        <Row>
            <Col xs={1}/>
            <Col><h2>Vehicles</h2></Col>
            <Col className='text-right' xs={2}>
                <Button className='btn-primary' onClick={() => history.push('/vehicle/create')}>Add Vehicle +</Button>
            </Col>
        </Row>
        <br/>   
        <Row>
            <Container>
        <table className="table table-striped tableFixHead thead-light">
            <thead className='thead-dark'>
                <tr>
                    <th scope="col">Name</th>
                </tr>
            </thead>
            <tbody>
                {vehicles.length !== 0 &&
                    vehicles.map(({ id, name}) => <tr key={id} onClick={openVehicle(id)}>
                        <td className='text-start'>{name}</td>
                    </tr>)
                }
            </tbody>
        </table>
        </Container>
    </Row>
    </div>
}