import { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Location } from './Location'
import { locationApi } from './locationApi'

export const LocationList = () => {
    const [data, setData] = useState<Location[]>([])
    const handleFetchData = async () => {
        const response = await locationApi.getAll()
        console.log(response) 
        setData(response)
    }
    useEffect(() => {
        handleFetchData()
    }, [])
    return <div>
        <h2>Locations</h2>
        <Row>
            <Col xs={1}/>
            <Col>
        <table className="table table-striped tableFixHead thead-light">
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