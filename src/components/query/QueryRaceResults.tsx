import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { resultApi } from '../results/resultApi'
import './queryRaceResults.css'
import { Container, Row, Col } from 'react-bootstrap'

export const QueryRaceResults = () => {
    const [data, setData] = useState([]);
    const [request, setRequest] = useState<RaceRequest | undefined>(undefined);
    console.log(data)
    const { handleSubmit, register } = useForm();
    const tryQuery = async (value: unknown) => {
        if (isRaceRequet(value)) {
            const response = await resultApi.queryRaceResult(value);
            setRequest(value);
            setData(response);
        }
    };
    let formRef: any;
    const clearQuery = () => {
        window.location.reload()
    }
    return <div>
        <h2>Race Results Search</h2>
        <Container>
            <Row>
                <Col>
                    <form onSubmit={handleSubmit(tryQuery)} ref={(ref) => formRef = ref}>
                            <div className='row'>
                                <div className='col-5'>
                                <label htmlFor="temperature" className='text-left'>Temperature:</label>
                                <input id="temperature" className='form-control' type="number" {...register("temperature", { required: false })} placeholder="Temperature" />
                            </div>
                            <div className='col-5'>
                                <label htmlFor="humidity">Humidity:</label>
                                <input className='form-control' id="humidity" type="number" {...register("humidity", { required: false })} placeholder="Humidity" />
                            </div>
                            <div className='col-2'>
                                <br/> 
                                <button type="submit" className='btn btn-primary'>Search</button>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-5'>
                                <label htmlFor="trackTemperature">Track Temperature:</label>
                                <input id="trackTemperature" className='form-control' type="number" {...register("trackTemperature", { required: false })} placeholder="Track Temperature" />
                            </div>
                            <div className='col-5'>
                                <label htmlFor="trackmeter">Trackmeter:</label>
                                <input id="trackmeter" className='form-control' type="number" {...register("trackmeter", { required: false })} placeholder="Trackmeter" />
                            </div>
                            <div className='col-2' >
                                <br/> 
                                <button onClick={clearQuery} className='btn btn-secondary'>Clear search</button>
                                </div>
                        </div>
                    </form>
                </Col>
            </Row>
            {data.length !== 0 && request != undefined && <Row>
                <table className="table table-striped tableFixHead thead-light">
                    <thead className='thead-dark'>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Location</th>
                            <th scope="col">Altitude</th>
                            <th scope="col">Time<br /> (60", 330", 660", 1320")</th>
                            <th scope="col">Speed<br /> (660", 1320")</th>
                            <th scope="col">Trackmeter</th>
                            <th scope="col">Track Temp</th>
                            <th scope="col">Temperature</th>
                            <th scope="col">Humidity</th>
                            <th scope="col">Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(({ datetime, altitude, sixSixtyFeetSpeed, quarterMileSpeed, sixtyFeetTime, threeThirtyFeetTime, sixSixtyFeetTime, quarterMileTime, location, trackTemperature, trackmeter, temperature, humidity, rank }) => <tr>
                            <td scope="col" className='text-start'>{datetime}</td>
                            <td scope="col" className='text-start'>{location}</td>
                            <td scope="col" className='text-start'>{altitude}ft</td>
                            <td scope="col" className='text-start'>{sixtyFeetTime}s, {threeThirtyFeetTime}s,  {sixSixtyFeetTime}s,  {quarterMileTime}s</td>
                            <td scope="col" className='text-start'>{sixSixtyFeetSpeed}mph {quarterMileSpeed}mph</td>
                            <td scope="col" className='text-start'>{trackmeter} {getDiffElement(trackmeter, request.trackmeter)}</td>
                            <td scope="col" className='text-start'>{trackTemperature}°C {getDiffElement(trackTemperature, request.trackTemperature)}</td>
                            <td scope="col" className='text-start'>{temperature}°C {getDiffElement(temperature, request.temperature)}</td>
                            <td scope="col" className='text-start'>{humidity}% <span className='text-danger'>(±{Math.abs(humidity - request.humidity)})</span></td>
                            <td scope="col" className='text-start'>{rank}</td>
                        </tr>)
                        }
                    </tbody>
                </table>
            </Row>}
        </Container>
    </div>
}

const getDiffElement = (a: number, b: number) => {
    return a && <span className='text-danger'>(±{Math.abs(a - b)})</span>;
}

export interface RaceRequest {
    temperature: number,
    humidity: number,
    trackmeter: number,
    trackTemperature: number
}

function isRaceRequet(value: unknown): value is RaceRequest {
    return typeof value === 'object' &&
        value !== null &&
        "temperature" in value &&
        "humidity" in value;
}