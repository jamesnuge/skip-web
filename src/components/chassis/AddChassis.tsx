
import { useState } from "react"
import { Button, Card, Col, Form, Row, Toast, ToastContainer } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { ChassisSetup } from "./Chassis"
import { chassisApi } from "./chassisApi"

export const NewChassis = () => {

    const { register, handleSubmit } = useForm();
    const [errorMessage, setErrorMessage] = useState<String | undefined>(undefined)
    const [successMessage, setSuccessMessage] = useState<String | undefined>(undefined)
    const createLocation = (value: object) => {
        chassisApi.create(value as ChassisSetup).then(() => {
            setErrorMessage(undefined);
            setSuccessMessage(`Successfully saved location`);
        }, (err) => {
            setSuccessMessage(undefined);
            setErrorMessage("Unable to save location, ensure all fields are present and correct");
            console.error(err);
        })
    }

    return <>
        <ToastContainer className="p-3" position='top-end'>
            <Toast bg="success" show={successMessage != undefined} onClose={() => setSuccessMessage(undefined)}>
                <Toast.Header>
                    <strong className="me-auto">Chassis setup added</strong>
                </Toast.Header>
                <Toast.Body>Successfully saved chassis setup</Toast.Body>
            </Toast>
            <Toast bg="error" show={errorMessage != undefined} onClose={() => setErrorMessage(undefined)}>
                <Toast.Header>
                    <strong className="me-auto">Failed to add chassis setup</strong>
                </Toast.Header>
                <Toast.Body>Unable to save result. Please check all values are present and correct</Toast.Body>
            </Toast>
        </ToastContainer>
        <h2>New Chassis</h2>
        <form onSubmit={handleSubmit(createLocation)}>
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <label htmlFor="name" className='text-start'>Name:</label>
                            <Form.Control type="string" {...register("name", { required: true })} />
                        </Col>
                        <Col>
                            <label htmlFor="preload" className='text-start'>Preload:</label>
                            <Form.Control type="number" {...register("preload", { required: true })} />
                        </Col>
                        <Col>
                        <label htmlFor="rearSteer" className='text-start'>Rear Steer:</label>
                        <Form.Control type="number" {...register("rearSteer", { required: true })} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1} />
                        <Col>
                            <label htmlFor="frontCrossmemberHeight" className='text-start'>Front Crossmember Height (cm):</label>
                            <Form.Control type="number" {...register("frontCrossmemberHeight", { required: true })} />
                        </Col>
                        <Col>
                            <label htmlFor="rearCrossmemberHeight" className='text-start'>Rear Crossmember Height (cm);</label>
                            <Form.Control type="number" {...register("rearCrossmemberHeight", { required: true })} />
                        </Col>
                        <Col xs={1} />
                    </Row>
                    <Row>
                        <Col xs={1} />
                        <Col>
                            <label htmlFor="frontSpread" className='text-start'>Front Spread:</label>
                            <Form.Control type="number" {...register("frontSpread", { required: true })} />
                        </Col>
                        <Col>
                            <label htmlFor="rearSpread" className='text-start'>Rear Spread:</label>
                            <Form.Control type="number" {...register("rearSpread", { required: true })} />
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