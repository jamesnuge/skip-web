import { useState } from 'react'
import { Button, Card, Col, Form, Row, Toast, ToastContainer } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { Vehicle } from '../Vehicle'
import { vehicleApi } from '../vehicleApi'


export const NewVehicle = () => {
    const { register, handleSubmit } = useForm();
    const [errorMessage, setErrorMessage] = useState<String | undefined>(undefined)
    const [successMessage, setSuccessMessage] = useState<String | undefined>(undefined)
    const history = useHistory();
    const createVehicle = (value: object) => {
        console.log(value);
        // vehicleApi.create(value as Vehicle).then(() => {
        //     setErrorMessage(undefined);
        //     setSuccessMessage(`Successfully saved chassis`);
        //     history.push("/chassis/all")
        // }, (err) => {
        //     setSuccessMessage(undefined);
        //     setErrorMessage("Unable to save location, ensure all fields are present and correct");
        //     console.error(err);
        // })
    }

    return <>
        <ToastContainer className="p-3" position='top-end'>
            <Toast bg="success" show={successMessage !== undefined} onClose={() => setSuccessMessage(undefined)}>
                <Toast.Header>
                    <strong className="me-auto">Chassis setup added</strong>
                </Toast.Header>
                <Toast.Body>Successfully saved chassis setup</Toast.Body>
            </Toast>
            <Toast bg="error" show={errorMessage !== undefined} onClose={() => setErrorMessage(undefined)}>
                <Toast.Header>
                    <strong className="me-auto">Failed to add chassis setup</strong>
                </Toast.Header>
                <Toast.Body>Unable to save result. Please check all values are present and correct</Toast.Body>
            </Toast>
        </ToastContainer>
        <h2>New Vehicle</h2>
        <form onSubmit={handleSubmit(createVehicle)}>
            <div><h3>Chassis</h3></div>
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <label htmlFor="name" className='text-start'>Name:</label>
                            <Form.Control type="string" {...register("chassis.name", { required: true })} />
                        </Col>
                        <Col>
                            <label htmlFor="preload" className='text-start'>Preload:</label>
                            <Form.Control type="number" {...register("chassis.preload", { required: true })} />
                        </Col>
                        <Col>
                            <label htmlFor="rearSteer" className='text-start'>Rear Steer:</label>
                            <Form.Control type="number" {...register("chassis.rearSteer", { required: true })} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1} />
                        <Col>
                            <label htmlFor="frontCrossmemberHeight" className='text-start'>Front Crossmember Height (cm):</label>
                            <Form.Control type="number" {...register("chassis.frontCrossmemberHeight", { required: true })} />
                        </Col>
                        <Col>
                            <label htmlFor="rearCrossmemberHeight" className='text-start'>Rear Crossmember Height (cm);</label>
                            <Form.Control type="number" {...register("chassis.rearCrossmemberHeight", { required: true })} />
                        </Col>
                        <Col xs={1} />
                    </Row>
                    <Row>
                        <Col xs={1} />
                        <Col>
                            <label htmlFor="frontSpread" className='text-start'>Front Spread:</label>
                            <Form.Control type="number" {...register("chassis.frontSpread", { required: true })} />
                        </Col>
                        <Col>
                            <label htmlFor="rearSpread" className='text-start'>Rear Spread:</label>
                            <Form.Control type="number" {...register("chassis.rearSpread", { required: true })} />
                        </Col>
                        <Col xs={1} />
                    </Row>
                    <br />
                    <Button className="btn-primary" type="submit">Save</Button>
                </Card.Body>
            </Card>
        </form>
    </>
}