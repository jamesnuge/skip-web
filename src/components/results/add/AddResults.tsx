import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { ToastContainer, Toast, Card, Row, Col, Form } from 'react-bootstrap'
import { fetchTokenFromStorage } from "../../../App";
import { locationApi } from "../../location/locationApi";
import { Location } from "../../location/Location";
import {VehicleSummary} from "../../vehicle/Vehicle";
import {vehicleApi} from "../../vehicle/vehicleApi";
import { resultApi } from "../resultApi";
import { useHistory } from "react-router-dom";
import { startLineApi } from "../startLine/startLineApi";

export const AddResult = () => {
    const [errorMessage, setErrorMessage] = useState<String | undefined>(undefined);
    const [successMessage, setSuccessMessage] = useState<String | undefined>(undefined);
    const [locations, setLocations] = useState<Location[]>([]);
    const [vehicles, setVehicles] = useState<VehicleSummary[]>([]);
    const { handleSubmit, register, watch, setValue } = useForm();
    const { push } = useHistory()
    const loadLocationsAndChassisSetups = async () => {
        const locations = await locationApi.getAll();
        setLocations(locations);
        const vehicleSummaries = await vehicleApi.getAllSummaries();
        setVehicles(vehicleSummaries);
    }
    const loadLatestStartLine = async () => {
        if (watchVehicleId) {
            const {launchRpm, boost} = await startLineApi.getVehiclesPreviousStartLine(watchVehicleId as number)
            setValue("startLine.launchRpm", launchRpm)
            setValue("startLine.boost", boost)
        }
    }
    const watchVehicleId = watch("vehicleId")
    useEffect(() => {
        loadLocationsAndChassisSetups();
    }, []);
    useEffect(() => {
        loadLatestStartLine()
    }, [watchVehicleId])
    const printResult = (value: any) => {
        const valueWithAltitude = {
            ...value,
            location: JSON.parse(value.location),
        }
        console.log(valueWithAltitude)
        resultApi.save(valueWithAltitude).then(() => {
            setErrorMessage(undefined);
            setSuccessMessage(`Successfully saved result`);
            push('/results')
        }, (err) => {
            console.error(err);
            setSuccessMessage(undefined);
            setErrorMessage("Unable to save result, ensure all fields are present and correct");
        })
    }
    return <>
            <ToastContainer className="p-3" position='top-end'>
                <Toast bg="success" show={successMessage !== undefined} onClose={() => setSuccessMessage(undefined)}>
                    <Toast.Header>
                        <strong className="me-auto">Result added</strong>
                    </Toast.Header>
                    <Toast.Body>Successfully saved result</Toast.Body>
                </Toast>
                <Toast bg="error" show={errorMessage !== undefined} onClose={() => setErrorMessage(undefined)}>
                    <Toast.Header>
                        <strong className="me-auto">Failed to add result</strong>
                    </Toast.Header>
                    <Toast.Body>Unable to save result. Please check all values are present and correct</Toast.Body>
                </Toast>
            </ToastContainer>
        <h2>Add Result</h2>
        {locations.length === 0 ? <p>Loading...</p> :
            <form onSubmit={handleSubmit(printResult)}>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>Date and Location</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <label htmlFor="date" className='text-start'>Date:</label>
                                        <Form.Control type="datetime-local" {...register("datetime", { required: true })} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label htmlFor="location" className='text-start'>Location:</label>
                                        <Form.Select id="location" aria-label="Default select example" {...register("location", { required: true })}>
                                            <option>Open this select menu</option>
                                            {locations.map((key: Location) => {
                                                return <option key={key.name} value={JSON.stringify(key)}>{key.name}</option>
                                            })}
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <label htmlFor="vehicle" className='text-start'>Vehicle:</label>
                                        <Form.Select id="vehicle" aria-label="Default select example" {...register("vehicleId", { required: true })}>
                                            <option>Select Vehicle</option>
                                            {vehicles.map((key: VehicleSummary) => {
                                                return <option key={key.id} value={key.id}>{key.name}</option>
                                            })}
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label htmlFor="launchRpm" className='text-start'>Launch RPM:</label>
                                        <input id="" className='form-control' type="number" {...register("startLine.launchRpm", { required: true })} placeholder="Launch RPM" />
                                    </Col>
                                    <Col>
                                        <label htmlFor="boost" className='text-start'>Boost:</label>
                                        <input id="" className='form-control' type="number" {...register("startLine.boost", { required: true })} placeholder="Launch RPM" />
                                    </Col>
                                </Row>
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