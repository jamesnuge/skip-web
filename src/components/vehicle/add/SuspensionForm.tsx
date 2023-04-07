import { useFormContext } from "react-hook-form";
import { Card, Col, Form, Row, } from "react-bootstrap"

export const SuspensionForm = () => {
    const { register } = useFormContext();
    const registerChassisInput = (name: string, props: any) => register(`suspension.${name}`, props)
    return <>
        <h4>Chassis:</h4>
        <Card>
            <Card.Body>
                <Row>
                    <Col xs={1} />
                    <Col>
                        <label htmlFor="extensionFromTight" className='text-start'>Extension From Tight:</label>
                        <Form.Control type="number" {...registerChassisInput("extensionFromTight", { required: true })} />
                    </Col>
                    <Col>
                        <label htmlFor="compressionFromTight" className='text-start'>Compression From Tight:</label>
                        <Form.Control type="number" {...registerChassisInput("compressionFromTight", { required: true })} />
                    </Col>
                    <Col xs={1} />
                </Row>
                <Row>
                    <Col xs={1} />
                    <Col>
                        <label htmlFor="extensionHighSpeed" className='text-start'>Extension High Speed:</label>
                        <Form.Control type="number" {...registerChassisInput("extensionHighSpeed", { required: true })} />
                    </Col>
                    <Col>
                        <label htmlFor="extensionLowSpeed" className='text-start'>Extension Low Speed:</label>
                        <Form.Control type="number" {...registerChassisInput("extensionLowSpeed", { required: true })} />
                    </Col>
                    <Col xs={1} />
                </Row>
                <Row>
                    <Col xs={1} />
                    <Col>
                        <label htmlFor="compressionHighSpeed" className='text-start'>Compression High Speed:</label>
                        <Form.Control type="number" {...registerChassisInput("compressionHighSpeed", { required: true })} />
                    </Col>
                    <Col>
                        <label htmlFor="compressionLowSpeed" className='text-start'>Compression Low Speed:</label>
                        <Form.Control type="number" {...registerChassisInput("compressionLowSpeed", { required: true })} />
                    </Col>
                    <Col xs={1} />
                </Row>
                <Row>
                    <Col xs={1} />
                    <Col>
                        <label htmlFor="frontCannisterPressure" className='text-start'>Front Cannister Pressure:</label>
                        <Form.Control type="number" {...registerChassisInput("frontCannisterPressure", { required: true })} />
                    </Col>
                    <Col>
                        <label htmlFor="rearCannisterPressure" className='text-start'>Rear Cannister Pressure:</label>
                        <Form.Control type="number" {...registerChassisInput("rearCannisterPressure", { required: true })} />
                    </Col>
                    <Col xs={1} />
                </Row>
                <br />
            </Card.Body>
        </Card>
    </>
}