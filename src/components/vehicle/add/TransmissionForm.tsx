import { useFormContext } from "react-hook-form";
import { Card, Col, Form, Row, } from "react-bootstrap"

export const TransmissionForm = () => {
    const {register} = useFormContext();
    const registerTransmissionInput = (name: string, props: any) => register(`transmission.${name}`, props)
   return <>
    <h4>Transmission:</h4>
    <Card>
        <Card.Body>
            <Row>
                <Col xs={1} />
                <Col>
                    <label htmlFor="first" className='text-start'>First Gear:</label>
                    <Form.Control type="number" {...registerTransmissionInput("first", { required: true })} />
                </Col>
                <Col>
                    <label htmlFor="second" className='text-start'>Second Gear:</label>
                    <Form.Control type="number" {...registerTransmissionInput("second", { required: true })} />
                </Col>
                <Col xs={1} />
            </Row>
            <Row>
                <Col xs={1} />
                <Col>
                    <label htmlFor="third" className='text-start'>Third Gear:</label>
                    <Form.Control type="number" {...registerTransmissionInput("third", { required: true })} />
                </Col>
                <Col>
                    <label htmlFor="fourth" className='text-start'>Fourth Gear:</label>
                    <Form.Control type="number" {...registerTransmissionInput("fourth", { required: true })} />
                </Col>
                <Col xs={1} />
            </Row>
            <Row>
                <Col xs={1} />
                <Col>
                    <label htmlFor="fifth" className='text-start'>Fifth Gear:</label>
                    <Form.Control type="number" {...registerTransmissionInput("fifth", { required: true })} />
                </Col>
                <Col>
                    <label htmlFor="sixth" className='text-start'>Sixth Gear:</label>
                    <Form.Control type="number" {...registerTransmissionInput("sixth", { required: true })} />
                </Col>
                <Col xs={1} />
            </Row>
            <Row>
                <Col xs={1} />
                <Col>
                    <label htmlFor="seventh" className='text-start'>Seventh Gear:</label>
                    <Form.Control type="number" {...registerTransmissionInput("seventh", { required: true })} />
                </Col>
                <Col>
                    <label htmlFor="rear" className='text-start'>Rear Gear:</label>
                    <Form.Control type="number" {...registerTransmissionInput("rear", { required: true })} />
                </Col>
                <Col xs={1} />
            </Row>
            <br />
        </Card.Body>
    </Card>
</>
}
