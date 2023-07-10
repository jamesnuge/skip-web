import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form'
import { ToastContainer, Toast, Card, Row, Col, Form, Modal, Button } from 'react-bootstrap'
import { locationApi } from "../../location/locationApi";
import { Location } from "../../location/Location";
import {Vehicle, VehicleSummary} from "../../vehicle/Vehicle";
import {vehicleApi} from "../../vehicle/vehicleApi";
import { resultApi } from "../resultApi";
import { useHistory, useParams } from "react-router-dom";
import { startLineApi } from "../startLine/startLineApi";
import { VehicleModalForm } from "../../vehicle/display/VehicleDisplay";
import _ from "lodash";
import { SplitColumn, SplitContainer, TimeColumn, TimeRow } from "./AddResults.styled";

export const AddResult = () => {
    const preselectedVehicleId = useParams<any>().vehicleId;
    const [errorMessage, setErrorMessage] = useState<String | undefined>(undefined);
    const [successMessage, setSuccessMessage] = useState<String | undefined>(undefined);
    const [locations, setLocations] = useState<Location[]>([]);
    const [vehicles, setVehicles] = useState<VehicleSummary[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(undefined)
    const [show, setShow] = useState(false);

    const handleClose = () => {
        updateFormWithVehicleDetails(selectedVehicle);
        setShow(false);
    }
    const handleSave = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    const form = useForm();
    const { handleSubmit, register, watch, setValue } = form;
    const { push } = useHistory()
    const loadLocationsAndVehicles = async () => {
        const locations = await locationApi.getAll();
        setLocations(locations);
        const vehicleSummaries = await vehicleApi.getAllSummaries();
        setVehicles(vehicleSummaries);
        if (preselectedVehicleId !== undefined) {
            const vehicle = await vehicleApi.get(preselectedVehicleId)
            setValue("vehicleId", preselectedVehicleId)
            setSelectedVehicle(vehicle)
            updateFormWithVehicleDetails(vehicle);
        }
    }

    const watchVehicleId = watch("vehicleId")

    const watchTimes = watch(["sixtyFeetTime", "threeThirtyFeetTime", "sixSixtyFeetTime", "quarterMileTime"]).map((value) => Number.parseFloat(value))
    

    const updateFormWithVehicleDetails = (vehicle: Vehicle | undefined) => {
        if (vehicle !== undefined) {
            Object.keys(vehicle).forEach((key: any) => {
                const value: any = (vehicle as any)[key]
                if (_.isObject(value)) {
                    delete (value as any).id
                    setValue(key, value)
                }
            })
        }
    }
    
    const loadLatestStartLine = async () => {
        const vehicleIdAsInt = parseInt(watchVehicleId)
        if (!_.isNaN(vehicleIdAsInt)) {
            const vehicle: any = await vehicleApi.get(watchVehicleId);
            setSelectedVehicle(vehicle);
            const {launchRpm, boost} = await startLineApi.getVehiclesPreviousStartLine(watchVehicleId as number)
            setValue("startLine.launchRpm", launchRpm);
            setValue("startLine.boost", boost);
            updateFormWithVehicleDetails(vehicle);
        }
    }

    useEffect(() => {
        loadLocationsAndVehicles();
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
        <Modal show={show} onHide={handleSave} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Change Vehicle Configuration</Modal.Title>
        </Modal.Header>
            <Modal.Body>
                <FormProvider {...form}>
                    <VehicleModalForm id={watchVehicleId} />
                </FormProvider>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
                                    <Col>
                                        <label htmlFor="location" className='text-start'>Location:</label>
                                        <Form.Select id="location" aria-label="Default select example" {...register("location", { required: true })}>
                                            <option>Open this select menu</option>
                                            {locations.map((key: Location) => {
                                                return <option key={key.name} value={JSON.stringify(key)}>{key.name}</option>
                                            })}
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label htmlFor="tuneupFile" className='text-start'>Tuneup File:</label>
                                        <input id="tuneupFile" className='form-control' type="string" {...register("tuneupFile", { required: true })} placeholder="Tuneup File" />
                                    </Col>
                                    <Col>
                                        <label htmlFor="vehicle" className='text-start'>Vehicle:</label>
                                        {preselectedVehicleId !== undefined ? <Form.Select disabled id="vehicle" aria-label="Default select example"><option>{selectedVehicle?.name || ""}</option></Form.Select> :
                                        <Form.Select id="vehicle" aria-label="Default select example" {...register("vehicleId", { required: true })}>
                                            <option>Select Vehicle</option>
                                            {vehicles.map((key: VehicleSummary) => {
                                                return <option key={key.id} value={key.id}>{key.name}</option>
                                            })}
                                        </Form.Select>
                                        }
                                    </Col>
                                </Row>
                                <br></br>
                                <Row>
                                    <Col xs={10}/>
                                    <Col xs={2}>
                                        <Button disabled={!selectedVehicle} onClick={handleShow}>Change vehicle config</Button>
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
                            {/* <Card.Body> */}

                                <Form.Group >
                                    <TimeRow>
                                        <TimeColumn xs={9}>
                                            <label htmlFor="sixtyFeetTime" className='text-start'>Time to 60ft (s):</label>
                                            <input id="sixtyFeetTime" className='form-control' step='0.0001' type="number" {...register("sixtyFeetTime", { required: true })} placeholder="Time to 60ft" />
                                        </TimeColumn>
                                        <SplitColumn>
                                            Split<br/>
                                            <SplitContainer>
                                                N/A
                                            </SplitContainer>
                                        </SplitColumn>
                                    </TimeRow>
                                    <TimeRow>
                                        <TimeColumn xs={9}>
                                            <label htmlFor="threeThirtyFeetTime" className='text-start'>Time to 330ft (s):</label>
                                            <input id="threeThirtyFeetTime" className='form-control' step='0.0001' type="number" {...register("threeThirtyFeetTime", { required: true })} placeholder="Time to 330ft" />
                                        </TimeColumn>
                                        <SplitColumn>
                                            <br/> 
                                            <SplitContainer>
                                                {generateSplitValue(1, watchTimes)}
                                            </SplitContainer>
                                        </SplitColumn>
                                    </TimeRow>
                                    <TimeRow>
                                        <TimeColumn xs={9}>
                                            <label htmlFor="sixSixtyFeetTime" className='text-start'>Time to 660ft (s):</label>
                                            <input id="sixSixtyFeetTime" className='form-control' step='0.0001' type="number" {...register("sixSixtyFeetTime", { required: true })} placeholder="Time to 660ft" />
                                        </TimeColumn>
                                        <SplitColumn> 
                                            <br />
                                            <SplitContainer>
                                                {generateSplitValue(2, watchTimes)}
                                            </SplitContainer>
                                        </SplitColumn>
                                    </TimeRow>
                                    <TimeRow>
                                        <TimeColumn xs={9}>
                                            <label htmlFor="quarterMileTime" className='text-start'>Time to 1320ft (s):</label>
                                            <input id="quarterMileTime" className='form-control' step='0.0001' type="number" {...register("quarterMileTime", { required: true })} placeholder="Time to 1320ft" />
                                        </TimeColumn>
                                        <SplitColumn>
                                            <br />
                                            <SplitContainer>
                                                {generateSplitValue(3, watchTimes)}
                                            </SplitContainer>
                                        </SplitColumn>
                                    </TimeRow>
                                </Form.Group>
                            {/* </Card.Body> */}
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

const generateSplitValue = (index: number, values: number[]) => {
    if (index <= 0 || index >= values.length) {
        return <>N/A</>;
    }
    const currentTime = values[index];
    const previousTime = values[index - 1];
    if (isNaN(currentTime) || isNaN(previousTime)) {
        return <>--</>;
    }
    return <code>{currentTime - previousTime}s</code>;
}