import { useFormContext } from "react-hook-form"
import { Card, Col, Form, Row, } from "react-bootstrap"

export const WeightForm = () => {
    const {register} = useFormContext();
    const registerWeightInput = (name: string, props: any) => register(`weight.${name}`, props)

    return <>
        <h4>Weight:</h4>
        <Card>
            <Card.Body>
                <Row>
                    <Col xs={1} />
                    <Col>
                        <label htmlFor="frontLeft" className='text-start'>Front Left:</label>
                        <Form.Control type="number" {...registerWeightInput("frontLeft", { required: true })} />
                    </Col>
                    <Col>
                        <label htmlFor="frontRight" className='text-start'>Front Right:</label>
                        <Form.Control type="number" {...registerWeightInput("frontRight", { required: true })} />
                    </Col>
                    <Col xs={1} />
                </Row>
                <Row>
                    <Col xs={1} />
                    <Col>
                        <label htmlFor="rearLeft" className='text-start'>Rear Left:</label>
                        <Form.Control type="number" {...registerWeightInput("rearLeft", { required: true })} />
                    </Col>
                    <Col>
                        <label htmlFor="rearRight" className='text-start'>Rear Right</label>
                        <Form.Control type="number" {...registerWeightInput("rearRight", { required: true })} />
                    </Col>
                    <Col>
                        <label htmlFor="frontSpread" className='text-start'>Additional Weight:</label>
                        <Form.Control type="number" {...registerWeightInput("additional", { required: true })} />
                    </Col>
                    <Col xs={1} />
                </Row>
                <br />
            </Card.Body>
        </Card>
    </>
}