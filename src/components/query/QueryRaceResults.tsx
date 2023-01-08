import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { resultApi } from '../results/resultApi'
import { Button, Container, Row, Col } from 'react-bootstrap'

export const QueryRaceResults = () => {
    const [data, setData] = useState([]);
    const [request, setRequest] = useState<RaceRequest>();
    const { handleSubmit, register } = useForm();
    const tryQuery = async (value: unknown) => {
        if (isRaceRequet(value)) {
            setRequest(value);
            const response = await resultApi.queryRaceResult(value);
            console.log(response)
            setData(response);
        }
    };
    return <div>
        <h2>Race Results Search</h2>
        <Container>
            <Row>
                <Col xs={3}>
                <form onSubmit={handleSubmit(tryQuery)}>
                    <div className='form-group'>
                        <label htmlFor="temperature">Temperature:</label>
                        <input id="temperature" className='form-control' type="number" {...register("temperature", { required: true })} placeholder="Temperature"/>
                    </div>
                    <br/>
                    <div className='form-group'>
                        <label htmlFor='humidity'>Humidity:</label>
                        <input className='form-control' id="humidity" type="number" {...register("humidity", { required: true })} placeholder="Humidity"/>
                    </div>
                        <button type="submit" className='btn btn-primary'>Submit</button>
                </form>
                </Col>
            </Row>
        {data.length !== 0 && request != undefined && <Row><table className="table">
            <thead className='thead-dark'>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Location</th>
                    <th scope="col">Temperature</th>
                    <th scope="col">Humidity</th>
                    <th scope="col">Rank</th>
                </tr>
            </thead>
            <tbody>
                {data.map(({ datetime, result, location, temperature, humidity, rank }) => <tr>
                    <th scope="col">{datetime}</th>
                    <th scope="col">{result}s</th>
                    <th scope="col">{location}</th>
                    <th scope="col">{temperature}°C <p className='text-danger'>(±{Math.abs(temperature - request.temperature)})</p></th>
                    <th scope="col">{humidity}% <p className='text-danger'>(±{Math.abs(humidity - request.humidity)})</p></th>
                    <th scope="col">{rank}</th>
                </tr>)
                }
            </tbody>
        </table></Row>}
        </Container>
    </div>
}

export interface RaceRequest {
    temperature: number,
    humidity: number
}

function isRaceRequet(value: unknown): value is RaceRequest {
    return typeof value === 'object' &&
        value !== null &&
        "temperature" in value &&
        "humidity" in value;
}