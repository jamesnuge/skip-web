import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { ToastContainer, Toast, Card, Row, Col, Form } from 'react-bootstrap'
import { fetchTokenFromStorage } from "../../../App";
import { locationApi } from "../../location/locationApi";
import { Location } from "../../location/Location";

export const AddResult = () => {
    const [errorMessage, setErrorMessage] = useState<String | undefined>(undefined)
    const [successMessage, setSuccessMessage] = useState<String | undefined>(undefined)
    const [locations, setLocations] = useState<Location[]>([])
    const { handleSubmit, register } = useForm();
    const handleFetchLocations = async () => {
        const locations = await locationApi.getAll();
        setLocations(locations);
    }
    useEffect(() => {
        handleFetchLocations();
    }, []);
    const printResult = (value: object) => {
        const valueWithAltitude = {
            ...value,
            altitude: locations[(value as any).location]
        }
        fetch(`/api/results/save`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
            // TODO: Fix typing here
            body: JSON.stringify(valueWithAltitude)
        }).then(() => {
            setErrorMessage(undefined)
            setSuccessMessage(`Successfully saved result`)
        }, (err) => {
            setSuccessMessage(undefined)
            setErrorMessage("Unable to save result, ensure all fields are present and correct")
        })
    }
    return <>
            <ToastContainer className="p-3" position='top-end'>
                <Toast bg="success" show={successMessage != undefined} onClose={() => setSuccessMessage(undefined)}>
                    <Toast.Header>
                        <strong className="me-auto">Result added</strong>
                    </Toast.Header>
                    <Toast.Body>Successfully saved result</Toast.Body>
                </Toast>
                <Toast bg="error" show={errorMessage != undefined} onClose={() => setErrorMessage(undefined)}>
                    <Toast.Header>
                        <strong className="me-auto">Failed to add result</strong>
                    </Toast.Header>
                    <Toast.Body>Unable to save result. Please check all values are present and correct</Toast.Body>
                </Toast>
            </ToastContainer>
        <h2>Add Result</h2>
        {locations.length == 0 ? <p>Loading...</p> :
            <form onSubmit={handleSubmit(printResult)}>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>Date and Location</Card.Header>
                            <Card.Body>
                                <label htmlFor="date" className='text-start'>Date:</label>
                                <Form.Control type="date" {...register("datetime", { required: true })} />
                                <label htmlFor="location" className='text-start'>Location:</label>
                                <Form.Select id="location" aria-label="Default select example" {...register("location", { required: true })}>
                                    <option>Open this select menu</option>
                                    {locations.map((key: Location) => {
                                        return <option key={key.name} value={key as any}>{key.name}</option>
                                    })}
                                </Form.Select>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br />
                {/* Weather */}
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>Weather</Card.Header>
                            <Card.Body>
                                <Form.Group>
                                    <label htmlFor="temperature" className='text-start'>Temperature:</label>
                                    <input id="temperature" className='form-control' type="number" {...register("temperature", { required: true })} placeholder="Temperature" />
                                    <label htmlFor="humidity" className='text-start'>Humidity:</label>
                                    <input id="humidity" className='form-control' type="number" {...register("humidity", { required: true })} placeholder="Humidity" />
                                    <label htmlFor="trackTemperature" className='text-start'>Track Temperature:</label>
                                    <input id="trackTemperature" className='form-control' type="number" {...register("trackTemperature", { required: true })} placeholder="Track Temperature" />
                                    <label htmlFor="trackmeter" className='text-start'>Trackmeter:</label>
                                    <input id="trackmeter" className='form-control' type="number" {...register("trackmeter", { required: true })} placeholder="Trackmeter" />
                                </Form.Group>

                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Times */}
                    <Col>
                        <Card>
                            <Card.Header>Times</Card.Header>
                            <Card.Body>
                                <Form.Group >
                                    <label htmlFor="sixtyFeetTime" className='text-start'>Time to 60ft (s):</label>
                                    <input id="sixtyFeetTime" className='form-control' step='0.0001' type="number" {...register("sixtyFeetTime", { required: true })} placeholder="Time to 60ft" />
                                    <label htmlFor="threeThirtyFeetTime" className='text-start'>Time to 330ft (s):</label>
                                    <input id="threeThirtyFeetTime" className='form-control' step='0.0001' type="number" {...register("threeThirtyFeetTime", { required: true })} placeholder="Time to 330ft" />
                                    <label htmlFor="sixSixtyFeetTime" className='text-start'>Time to 660ft (s):</label>
                                    <input id="sixSixtyFeetTime" className='form-control' step='0.0001' type="number" {...register("sixSixtyFeetTime", { required: true })} placeholder="Time to 660ft" />
                                    <label htmlFor="quarterMileTime" className='text-start'>Time to 1320ft (s):</label>
                                    <input id="quarterMileTime" className='form-control' step='0.0001' type="number" {...register("quarterMileTime", { required: true })} placeholder="Time to 1320ft" />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br />
                {/* Speeds */}
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>Speeds</Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <label htmlFor="sixSixtyFeetSpeed" className='text-start'>Speed at 660ft (mph):</label>
                                    <input id="sixSixtyFeetSpeed" className='form-control' type="number" {...register("sixSixtyFeetSpeed", { required: true })} placeholder="Speed at 660ft (mph)" />
                                    <label htmlFor="quarterMileSpeed" className='text-start'>Speed at 1320ft (mph):</label>
                                    <input id="quarterMileSpeed" className='form-control' type="number" {...register("quarterMileSpeed", { required: true })} placeholder="Speed to 1320ft (mph)" />
                                </Form.Group>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
                <br />
                <button className='btn btn-primary' type='submit'>Add result</button>
            </form>
        }
        </>;
}