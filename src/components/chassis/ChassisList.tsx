import { useState, useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { ChassisSetup } from './Chassis'
import { chassisApi } from './chassisApi'

export const ChassisSetupList = () => {
    const [data, setData] = useState<ChassisSetup[]>([])
    const handleFetchData = async () => {
        const response = await chassisApi.getAll()
        setData(response)
    }
    const history = useHistory();

    useEffect(() => {
        handleFetchData()
    }, []);

    return <div>
        <Row>
            <Col xs={1}/>
            <Col><h2>Chassis Setup</h2></Col>
            <Col className='text-right' xs={2}>
                <Button className='btn-primary' onClick={() => history.push('/chassis/create')}>Add Chassis Setup +</Button>
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
                    <th scope="col">Front Spread</th>
                    <th scope="col">Rear Spread</th>
                    <th scope="col">Front Crossmember Height</th>
                    <th scope="col">Rear Crossmember Height</th>
                    <th scope="col">Rear Steer</th>
                    <th scope="col">Preload</th>
                </tr>
            </thead>
            <tbody>
                {data.map(({ id, name, frontSpread, rearSpread, frontCrossmemberHeight, rearCrossmemberHeight, rearSteer, preload }: ChassisSetup) => <tr key={id}>
                    <td>{name}</td>
                    <td>{frontSpread}</td>
                    <td>{rearSpread}</td>
                    <td>{frontCrossmemberHeight}</td>
                    <td>{rearCrossmemberHeight}</td>
                    <td>{rearSteer}</td>
                    <td>{preload}</td>
                </tr>)
                }
            </tbody>
        </table>
        </Col>
            <Col xs={1}/>
        </Row>
    </div>
}