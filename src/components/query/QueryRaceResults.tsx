import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { resultApi } from '../results/resultApi'
import './queryRaceResults.css'
import { Container, Row, Col } from 'react-bootstrap'
import { Result } from '../results/Results'
import { RaceResultListDisplay } from '../results/RaceResultListDisplay'

export const QueryRaceResults = () => {
    const [data, setData] = useState<Result[]>([]);
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
    const clearQuery = () => {
        window.location.reload()
    }
    return <div>
        <h2>Race Results Search</h2>
        <Container>
            <Row>
                <Col>
                    <form onSubmit={handleSubmit(tryQuery)}> 
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
                                <br />
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
                                <br />
                                <button onClick={clearQuery} className='btn btn-secondary'>Clear search</button>
                            </div>
                        </div>
                    </form>
                </Col>
            </Row>
            {data && request && <RaceResultListDisplay results={data} request={request} refresh={() => handleSubmit(tryQuery)()}/>}
        </Container>
    </div>
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
