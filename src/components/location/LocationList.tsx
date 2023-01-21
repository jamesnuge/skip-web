import { useState, useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Location } from './Location'
import { locationApi } from './locationApi'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

export const LocationList = () => {
    const [data, setData] = useState<Location[]>([])
    const handleFetchData = async () => {
        const response = await locationApi.getAll()
        setData(response)
    }
    const history = useHistory();

    useEffect(() => {
        handleFetchData();
    }, []);

    return <div>
        <Row>
            <Col xs={1}/>
            <Col><h2>Locations</h2></Col>
            <Col className='text-right' xs={2}>
                <Button className='btn-primary' onClick={() => history.push('/location/create')}>Add Location +</Button>
            </Col>
        </Row>
        <br/>   
        <Row>
            <Col xs={1}/>
            <Col>
        <table className="table table-striped table-bordered tableFixHead thead-light">
            <thead className='thead-dark'>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Altitude</th>
                </tr>
            </thead>
            <tbody>
                {data.map(({ name, altitude }: Location) => <tr>
                    <td scope="col">{name}</td>
                    <td scope="col">{altitude}ft</td>
                </tr>)
                }
            </tbody>
        </table>
        </Col>
            <Col xs={1}/>
        </Row>
    </div>
}