import { useState } from "react"
import { Button, Card, Col, Form, Row, Toast, ToastContainer } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { fetchTokenFromStorage } from "../../App"
import { isLocation } from "./Location"

export const NewLocation = () => {

    const { register, handleSubmit } = useForm();
    const [errorMessage, setErrorMessage] = useState<String | undefined>(undefined)
    const [successMessage, setSuccessMessage] = useState<String | undefined>(undefined)
    const createLocation = (value: object) => {
        if (isLocation(value)) {
            fetch(`/api/location/create`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + fetchTokenFromStorage()
                },
                // TODO: Fix typing here
                body: JSON.stringify(value)
            }).then(() => {
                setErrorMessage(undefined);
                setSuccessMessage(`Successfully saved location`);
            }, (err) => {
                setSuccessMessage(undefined);
                setErrorMessage("Unable to save location, ensure all fields are present and correct");
                console.error(err);
            })

        } else {
            setSuccessMessage(undefined);
            setErrorMessage("Unable to save location, ensure all fields are present and correct");
        }
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
        <h2>New location</h2>
        <form onSubmit={handleSubmit(createLocation)}>
            <Card>
                <Card.Header>Location</Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={1}/>
                        <Col>
                            <label htmlFor="name" className='text-start'>Name:</label>
                            <Form.Control type="string" {...register("name", { required: true })} />
                        </Col>
                        <Col>
                            <label htmlFor="altitude" className='text-start'>Altitude (ft):</label>
                            <Form.Control type="number" {...register("altitude", { required: true })} />
                        </Col>
                        <Col xs={1}/>
                    </Row>
                    <br/>
                            <Button className="btn-primary" type="submit">Save</Button>
                </Card.Body>
            </Card>
        </form>
    </>
}